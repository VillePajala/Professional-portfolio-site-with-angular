import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  z: number; // depth: 0.35 (far) → 1 (near); scales parallax, size, brightness
  phase: number; // twinkle offset
  cyan: boolean;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') heroCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('eyeIris') eyeIris?: ElementRef<SVGGElement>;
  @ViewChild('miniPitch') miniPitch?: ElementRef<HTMLElement>;
  @ViewChild('meridianFill') meridianFill?: ElementRef<HTMLElement>;

  /* ---------- Hero: the life-arc rotator ---------- */
  heroRoles = [
    'Fifteen years of ink.',
    'A healer’s decade.',
    'Enterprise automation.',
    'Now: my own software.',
  ];
  roleIndex = 0;
  private roleTimer: ReturnType<typeof setInterval> | null = null;

  /* ---------- Playable MatchOps mini-pitch (futsal = 5 players) ---------- */
  pitchPlayers: Point[] = [
    { x: 50, y: 84 }, // keeper
    { x: 26, y: 62 },
    { x: 74, y: 62 },
    { x: 50, y: 44 },
    { x: 50, y: 22 },
  ];
  dragIndex = -1;

  /* ---------- Meridian rail sections ---------- */
  meridianSections = [
    { id: 'hero', label: 'Start' },
    { id: 'about', label: 'The Path' },
    { id: 'featured', label: 'MatchOps' },
    { id: 'otherhalf', label: 'Art & Music' },
    { id: 'projects', label: 'Learning Years' },
    { id: 'skills', label: 'Toolkit' },
    { id: 'contact', label: 'Contact' },
  ];

  private rafId = 0;
  private nodes: Node[] = [];
  private shoots: ShootingStar[] = [];
  private nextShootAt = 3500;
  private shootRand = this.makeRand(777);
  private formationTargets: Point[] = [];
  private elapsed = 0;
  private lastTs = 0;
  private ctx: CanvasRenderingContext2D | null = null;
  private dpr = 1;
  private width = 0;
  private height = 0;
  private pointer = { x: 0.5, y: 0.5 };
  private eyeOffset = { x: 0, y: 0 };

  private observer?: IntersectionObserver;
  private cleanups: Array<() => void> = [];

  private get reducedMotion(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.setupReveal();
    this.setupCounters();
    this.setupMeridian();

    if (this.reducedMotion) {
      // Static final line; no canvas / magnetic / tilt / eye effects
      this.roleIndex = this.heroRoles.length - 1;
      return;
    }

    this.roleTimer = setInterval(() => {
      this.roleIndex = (this.roleIndex + 1) % this.heroRoles.length;
    }, 2600);
    this.cleanups.push(() => {
      if (this.roleTimer) clearInterval(this.roleTimer);
    });

    this.setupCanvas();
    this.setupMagnetic();
    this.setupTilt();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.rafId);
    this.observer?.disconnect();
    this.cleanups.forEach((fn) => fn());
    this.cleanups = [];
  }

  /* ---------- Mini-pitch dragging ---------- */
  onPlayerDown(e: PointerEvent, i: number) {
    e.preventDefault();
    this.dragIndex = i;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  onPlayerMove(e: PointerEvent) {
    if (this.dragIndex < 0) return;
    const pitch = this.miniPitch?.nativeElement;
    if (!pitch) return;
    const rect = pitch.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    this.pitchPlayers[this.dragIndex] = {
      x: Math.min(91, Math.max(9, x)),
      y: Math.min(92, Math.max(8, y)),
    };
  }

  onPlayerUp(_e: PointerEvent) {
    this.dragIndex = -1;
  }

  /* ---------- Meridian rail: scroll progress + active acupoint ---------- */
  private setupMeridian() {
    const fill = this.meridianFill?.nativeElement;
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('.meridian-node')
    );
    if (!fill || !nodes.length) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const p = max > 0 ? (window.scrollY / max) * 100 : 0;
        fill.style.height = `${Math.min(100, Math.max(0, p))}%`;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    this.cleanups.push(() => window.removeEventListener('scroll', onScroll));

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            nodes.forEach((n) =>
              n.classList.toggle('active', n.dataset['section'] === id)
            );
          });
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      this.meridianSections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el) io.observe(el);
      });
      this.cleanups.push(() => io.disconnect());
    }
  }

  /* ---------- Scroll reveal ---------- */
  private setupReveal() {
    const selectors = [
      '.section-header',
      '.about-card',
      '.featured-card',
      '.project-card-inner',
      '.skill-category',
      '.category-title',
      '.contact-item',
    ];
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(selectors.join(','))
    );
    if (!els.length) return;

    if (this.reducedMotion || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    els.forEach((el) => el.classList.add('reveal'));
    this.observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => this.observer!.observe(el));
  }

  /* ---------- Magnetic buttons ---------- */
  private setupMagnetic() {
    const buttons = Array.from(
      document.querySelectorAll<HTMLElement>('.magnetic')
    );
    buttons.forEach((btn) => {
      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const mx = e.clientX - rect.left - rect.width / 2;
        const my = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${mx * 0.25}px, ${my * 0.35}px)`;
      };
      const onLeave = () => {
        btn.style.transform = 'translate(0, 0)';
      };
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
      this.cleanups.push(() => {
        btn.removeEventListener('mousemove', onMove);
        btn.removeEventListener('mouseleave', onLeave);
      });
    });
  }

  /* ---------- 3D tilt ---------- */
  private setupTilt() {
    const tilts = Array.from(document.querySelectorAll<HTMLElement>('.tilt'));
    tilts.forEach((el) => {
      const parent = el.parentElement ?? el;
      const onMove = (e: MouseEvent) => {
        const rect = parent.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `rotateY(${px * 16}deg) rotateX(${-py * 16}deg) translateZ(0)`;
      };
      const onLeave = () => {
        el.style.transform = 'rotateY(0) rotateX(0)';
      };
      parent.addEventListener('mousemove', onMove);
      parent.addEventListener('mouseleave', onLeave);
      this.cleanups.push(() => {
        parent.removeEventListener('mousemove', onMove);
        parent.removeEventListener('mouseleave', onLeave);
      });
    });
  }

  /* ---------- Animated stat counters ---------- */
  private setupCounters() {
    const counters = Array.from(
      document.querySelectorAll<HTMLElement>('.stat-num[data-count]')
    );
    if (!counters.length) return;

    const render = (el: HTMLElement, value: number) => {
      const suffix = el.getAttribute('data-suffix') ?? '';
      el.textContent = value.toLocaleString('en-US') + suffix;
    };

    if (this.reducedMotion || !('IntersectionObserver' in window)) {
      counters.forEach((el) =>
        render(el, parseInt(el.getAttribute('data-count') || '0', 10))
      );
      return;
    }

    const animate = (el: HTMLElement) => {
      const target = parseInt(el.getAttribute('data-count') || '0', 10);
      const duration = 1400;
      let startTs = 0;
      const step = (ts: number) => {
        if (!startTs) startTs = ts;
        const p = Math.min((ts - startTs) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        render(el, Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target as HTMLElement);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => io.observe(el));
    this.cleanups.push(() => io.disconnect());
  }

  /* ---------- Hero constellation canvas ---------- */
  private setupCanvas() {
    const canvas = this.heroCanvas?.nativeElement;
    if (!canvas) return;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    const resize = () => this.sizeCanvas(canvas);
    resize();
    window.addEventListener('resize', resize);
    this.cleanups.push(() => window.removeEventListener('resize', resize));

    const onPointer = (e: MouseEvent) => {
      this.pointer.x = e.clientX / window.innerWidth;
      this.pointer.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onPointer);
    this.cleanups.push(() => window.removeEventListener('mousemove', onPointer));

    this.rafId = requestAnimationFrame((ts) => {
      this.lastTs = ts;
      this.draw(ts);
    });
  }

  private sizeCanvas(canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width;
    this.height = rect.height;
    canvas.width = Math.floor(this.width * this.dpr);
    canvas.height = Math.floor(this.height * this.dpr);
    this.ctx!.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    // Density scales with area; capped for performance
    const target = Math.min(90, Math.round((this.width * this.height) / 16000));
    this.seedNodes(target);
    this.buildFormation();
  }

  private seedNodes(count: number) {
    const rand = this.makeRand(20240610);
    this.nodes = Array.from({ length: count }, () => ({
      x: rand() * this.width,
      y: rand() * this.height,
      vx: (rand() - 0.5) * 0.25,
      vy: (rand() - 0.5) * 0.25,
      r: rand() * 1.6 + 0.6,
      z: 0.35 + rand() * 0.65,
      phase: rand() * Math.PI * 2,
      cyan: rand() > 0.45,
    }));
  }

  // Seed of Life: 7 circles of equal radius, 6 centers on the central circle.
  // Every node gets a slot on one of the rings; during formation they drift into it.
  private buildFormation() {
    const cx = this.width * 0.5;
    const cy = this.height * 0.5;
    const r = Math.min(this.width, this.height) * 0.21;
    const centers: Point[] = [{ x: cx, y: cy }];
    for (let k = 0; k < 6; k++) {
      const a = (k * Math.PI) / 3 - Math.PI / 2;
      centers.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
    }
    const n = this.nodes.length;
    this.formationTargets = Array.from({ length: n }, (_, i) => {
      const c = centers[i % centers.length];
      const a = (Math.floor(i / centers.length) / Math.max(1, Math.floor(n / centers.length))) * Math.PI * 2;
      return { x: c.x + Math.cos(a) * r, y: c.y + Math.sin(a) * r };
    });
  }

  // Deterministic PRNG so the field looks intentional, not random each load
  private makeRand(seed: number) {
    let s = seed >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  // 0 → free drift, 1 → locked into the Seed of Life. 18s cycle:
  // 10s drift, 1.5s converge, 5s hold, 1.5s release.
  private formationStrength(): number {
    const t = this.elapsed % 18000;
    if (t < 10000) return 0;
    if (t < 11500) return (t - 10000) / 1500;
    if (t < 16500) return 1;
    return 1 - (t - 16500) / 1500;
  }

  private draw(ts: number) {
    const ctx = this.ctx;
    if (!ctx) return;

    this.elapsed += Math.min(50, ts - this.lastTs);
    this.lastTs = ts;

    ctx.clearRect(0, 0, this.width, this.height);

    // Parallax offset from pointer; scaled per node by depth
    const ox = (this.pointer.x - 0.5) * 40;
    const oy = (this.pointer.y - 0.5) * 40;

    const strength = this.formationStrength();
    const maxDist = 140;
    const nodes = this.nodes;

    // Move nodes; when forming, pull toward Seed of Life slots
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (strength > 0 && this.formationTargets[i]) {
        const t = this.formationTargets[i];
        n.x += (t.x - n.x) * 0.045 * strength + n.vx * (1 - strength);
        n.y += (t.y - n.y) * 0.045 * strength + n.vy * (1 - strength);
      } else {
        n.x += n.vx * n.z;
        n.y += n.vy * n.z;
      }
      if (n.x < 0 || n.x > this.width) n.vx *= -1;
      if (n.y < 0 || n.y > this.height) n.vy *= -1;
    }

    // Lines between near nodes; geometry glows brighter while formed
    const lineBoost = 1 + strength * 0.6;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < maxDist) {
          const depth = (a.z + b.z) / 2;
          const alpha = (1 - dist / maxDist) * 0.5 * lineBoost * depth;
          ctx.strokeStyle = `rgba(140, 130, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x + ox * a.z, a.y + oy * a.z);
          ctx.lineTo(b.x + ox * b.z, b.y + oy * b.z);
          ctx.stroke();
        }
      }
    }

    // Stars: depth-scaled, twinkling, two-tone, with a soft halo
    for (const n of nodes) {
      const tw = 0.62 + 0.38 * Math.sin(this.elapsed * 0.0014 + n.phase);
      const px = n.x + ox * n.z;
      const py = n.y + oy * n.z;
      const color = n.cyan ? '34, 211, 238' : '167, 139, 250';
      ctx.beginPath();
      ctx.arc(px, py, n.r * n.z * 2.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${0.1 * tw * n.z})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(px, py, n.r * n.z, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${0.9 * tw * n.z})`;
      ctx.fill();
    }

    this.updateShootingStars(ctx);
    this.updateEye();

    this.rafId = requestAnimationFrame((next) => this.draw(next));
  }

  /* ---------- Shooting stars: a streak every ~5–10s ---------- */
  private updateShootingStars(ctx: CanvasRenderingContext2D) {
    if (this.elapsed > this.nextShootAt) {
      const r = this.shootRand;
      const fromLeft = r() > 0.5;
      const speed = 6 + r() * 3.5;
      const angle = (32 + r() * 24) * (Math.PI / 180);
      this.shoots.push({
        x: fromLeft ? r() * this.width * 0.4 : this.width * (0.6 + r() * 0.4),
        y: r() * this.height * 0.35,
        vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
        vy: Math.sin(angle) * speed,
        life: 1,
      });
      this.nextShootAt = this.elapsed + 5000 + r() * 5000;
    }

    for (const s of this.shoots) {
      s.x += s.vx;
      s.y += s.vy;
      s.life -= 0.022;
      if (s.life <= 0) continue;
      const tail = 11;
      const grad = ctx.createLinearGradient(
        s.x, s.y, s.x - s.vx * tail, s.y - s.vy * tail
      );
      grad.addColorStop(0, `rgba(255, 255, 255, ${0.85 * s.life})`);
      grad.addColorStop(0.3, `rgba(34, 211, 238, ${0.45 * s.life})`);
      grad.addColorStop(1, 'rgba(140, 130, 255, 0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.vx * tail, s.y - s.vy * tail);
      ctx.stroke();
    }
    this.shoots = this.shoots.filter(
      (s) => s.life > 0 && s.y < this.height + 40 && s.x > -40 && s.x < this.width + 40
    );
  }

  /* ---------- The Watching Eye: pupil tracks the cursor ---------- */
  private updateEye() {
    const iris = this.eyeIris?.nativeElement;
    if (!iris) return;
    const tx = (this.pointer.x - 0.5) * 110;
    const ty = (this.pointer.y - 0.5) * 64;
    this.eyeOffset.x += (tx - this.eyeOffset.x) * 0.06;
    this.eyeOffset.y += (ty - this.eyeOffset.y) * 0.06;
    iris.setAttribute(
      'transform',
      `translate(${this.eyeOffset.x.toFixed(2)} ${this.eyeOffset.y.toFixed(2)})`
    );
  }
}
