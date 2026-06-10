import { Component, HostListener, OnInit } from '@angular/core';

interface Artwork {
  src: string;
  title: string;
  meta: string;
}

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.css'],
})
export class ArtComponent implements OnInit {
  artworks: Artwork[] = [
    { src: 'assets/img/drawings/numenx.jpg', title: 'Numen X', meta: 'Ink drawing · 21 × 30 cm · 2013' },
    { src: 'assets/img/drawings/the_stare_of_infinity.jpg', title: 'The Stare of Infinity', meta: 'Ink drawing · 30 × 42 cm · 2014' },
    { src: 'assets/img/drawings/eyes_make_you_blind.jpg', title: 'Eyes Make You Blind', meta: 'Ink drawing · 21 × 30 cm · 2012' },
    { src: 'assets/img/drawings/sunyata.jpg', title: 'Sunyata', meta: 'Ink drawing · 42 × 59 cm · 2015' },
    { src: 'assets/img/drawings/advocatus_diabolis.jpg', title: 'Advocatus Diabolis', meta: 'Ink drawing · 21 × 30 cm · 2012' },
    { src: 'assets/img/drawings/maaralak.jpg', title: 'Maar-Alak', meta: 'Ink drawing · 42 × 59 cm · 2015' },
    { src: 'assets/img/drawings/reality_tunnel_network.jpg', title: 'Reality Tunnel Network', meta: 'Ink drawing · 30 × 42 cm · 2014' },
    { src: 'assets/img/drawings/phowa.jpg', title: 'Phowa', meta: 'Ink drawing · 21 × 30 cm · 2013' },
    { src: 'assets/img/drawings/portal.jpg', title: 'Portal', meta: 'Ink drawing · 21 × 30 cm · 2013' },
    { src: 'assets/img/drawings/nigredo.jpg', title: 'Nigredo', meta: 'Ink drawing · 21 × 30 cm · 2013' },
    { src: 'assets/img/design/albumdesign.jpg', title: 'Album Design', meta: 'Graphic design' },
    { src: 'assets/img/design/ferokhnumen.jpg', title: 'Ferokh Numen', meta: 'Graphic design' },
    { src: 'assets/img/design/mun_stadi.jpg', title: 'Mun Stadi', meta: 'Graphic design' },
    { src: 'assets/img/design/saisinko_lisaa.jpg', title: 'Saisinko Lisää', meta: 'Graphic design' },
  ];

  lightboxOpen = false;
  currentIndex = 0;

  constructor() {}

  ngOnInit() {}

  open(index: number) {
    this.currentIndex = index;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.lightboxOpen = false;
    document.body.style.overflow = '';
  }

  next(event?: Event) {
    event?.stopPropagation();
    this.currentIndex = (this.currentIndex + 1) % this.artworks.length;
  }

  prev(event?: Event) {
    event?.stopPropagation();
    this.currentIndex =
      (this.currentIndex - 1 + this.artworks.length) % this.artworks.length;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (!this.lightboxOpen) return;
    if (event.key === 'Escape') this.close();
    if (event.key === 'ArrowRight') this.next();
    if (event.key === 'ArrowLeft') this.prev();
  }
}
