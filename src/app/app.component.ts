import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

interface InkPoint {
  x: number;
  y: number;
  life: number; // 1 → 0
  size: number;
}

interface Ripple {
  x: number;
  y: number;
  life: number; // 1 → 0
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('inkCanvas') inkCanvas?: ElementRef<HTMLCanvasElement>;

  currentPage: string = '';

  /* Ink-bleed page transition */
  inkWipe = false;

  /* Easter egg: triple-click the brand → the drawings flood in */
  floodActive = false;
  floodArt: Array<{ src: string; style: { [k: string]: string } }> = [];
  private brandClicks = 0;
  private brandTimer: ReturnType<typeof setTimeout> | null = null;
  private floodTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly drawings = [
    'advocatus_diabolis.jpg',
    'eyes_make_you_blind.jpg',
    'maaralak.jpg',
    'nigredo.jpg',
    'numenx.jpg',
    'phowa.jpg',
    'portal.jpg',
    'reality_tunnel_network.jpg',
    'sunyata.jpg',
    'the_stare_of_infinity.jpg',
  ];

  private ctx: CanvasRenderingContext2D | null = null;
  private points: InkPoint[] = [];
  private ripples: Ripple[] = [];
  private rafId = 0;
  private running = false;
  private cleanups: Array<() => void> = [];
  private routerSub?: Subscription;

  private get reducedMotion(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  private get finePointer(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(pointer: fine)').matches
    );
  }

  constructor(private router: Router, private zone: NgZone) {
    this.routerSub = this.router.events.subscribe((ev) => {
      if (this.reducedMotion) return;
      if (ev instanceof NavigationStart) {
        this.inkWipe = true;
      } else if (ev instanceof NavigationEnd) {
        setTimeout(() => (this.inkWipe = false), 650);
      }
    });
  }

  ngAfterViewInit() {
    if (this.reducedMotion) return;
    this.setupInk();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.rafId);
    this.cleanups.forEach((fn) => fn());
    this.cleanups = [];
    this.routerSub?.unsubscribe();
    if (this.brandTimer) clearTimeout(this.brandTimer);
    if (this.floodTimer) clearTimeout(this.floodTimer);
  }

  setActivePage = (id: string): void => {
    this.currentPage = id;
  };

  /* ---------- Easter egg ---------- */
  onBrandClick() {
    this.brandClicks++;
    if (this.brandTimer) clearTimeout(this.brandTimer);
    this.brandTimer = setTimeout(() => (this.brandClicks = 0), 900);
    if (this.brandClicks >= 3) {
      this.brandClicks = 0;
      this.triggerFlood();
    }
  }

  private triggerFlood() {
    if (this.floodActive) return;
    // Deterministic-ish scatter: golden-angle spiral keeps it composed
    this.floodArt = this.drawings.map((src, i) => {
      const a = i * 2.39996; // golden angle
      const r = 12 + (i / this.drawings.length) * 38;
      const x = 50 + Math.cos(a) * r;
      const y = 50 + Math.sin(a) * r * 0.72;
      const rot = ((i * 47) % 24) - 12;
      return {
        src: `assets/img/drawings/${src}`,
        style: {
          left: `${x}%`,
          top: `${y}%`,
          transform: `translate(-50%, -50%) rotate(${rot}deg)`,
          'animation-delay': `${i * 70}ms`,
        },
      };
    });
    this.floodActive = true;
    this.floodTimer = setTimeout(() => {
      this.floodActive = false;
      this.floodArt = [];
    }, 5200);
  }

  /* ---------- Ink trail + click ripples (site-wide, desktop only) ---------- */
  private setupInk() {
    const canvas = this.inkCanvas?.nativeElement;
    if (!canvas || !this.finePointer) return;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      this.ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Run everything outside Angular: pointer + rAF should not trigger change detection
    this.zone.runOutsideAngular(() => {
      window.addEventListener('resize', resize);
      this.cleanups.push(() => window.removeEventListener('resize', resize));

      let lastX = -1;
      let lastY = -1;
      const onMove = (e: MouseEvent) => {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        if (lastX >= 0 && Math.hypot(dx, dy) < 9) return; // sample sparsely
        lastX = e.clientX;
        lastY = e.clientY;
        this.points.push({
          x: e.clientX,
          y: e.clientY,
          life: 1,
          size: 2.2 + Math.min(6, Math.hypot(dx, dy) * 0.08),
        });
        if (this.points.length > 90) this.points.shift();
        this.ensureLoop();
      };
      const onDown = (e: MouseEvent) => {
        this.ripples.push({ x: e.clientX, y: e.clientY, life: 1 });
        this.ensureLoop();
      };
      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('mousedown', onDown, { passive: true });
      this.cleanups.push(() => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mousedown', onDown);
      });
    });
  }

  private ensureLoop() {
    if (this.running) return;
    this.running = true;
    this.rafId = requestAnimationFrame(() => this.drawInk());
  }

  private drawInk() {
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Trail: fading ink dots connected by a soft stroke
    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i];
      p.life -= 0.022;
      if (p.life <= 0) continue;
      const prev = this.points[i - 1];
      if (prev && prev.life > 0) {
        ctx.strokeStyle = `rgba(167, 139, 250, ${p.life * 0.28})`;
        ctx.lineWidth = p.size * p.life;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(34, 211, 238, ${p.life * 0.35})`;
      ctx.fill();
    }
    this.points = this.points.filter((p) => p.life > 0);

    // Click ripples: expanding ink rings
    for (const r of this.ripples) {
      r.life -= 0.018;
      if (r.life <= 0) continue;
      const radius = (1 - r.life) * 70 + 4;
      ctx.strokeStyle = `rgba(167, 139, 250, ${r.life * 0.5})`;
      ctx.lineWidth = 1.5 + r.life * 1.5;
      ctx.beginPath();
      ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = `rgba(34, 211, 238, ${r.life * 0.3})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(r.x, r.y, radius * 0.65, 0, Math.PI * 2);
      ctx.stroke();
    }
    this.ripples = this.ripples.filter((r) => r.life > 0);

    if (this.points.length || this.ripples.length) {
      this.rafId = requestAnimationFrame(() => this.drawInk());
    } else {
      this.running = false;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }
}
