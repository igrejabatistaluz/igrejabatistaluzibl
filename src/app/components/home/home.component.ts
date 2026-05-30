import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { MinistriesComponent } from '../ministries/ministries.component';
import { CellsComponent } from '../cells/cells.component';
import { EventsComponent } from '../events/events.component';
import { InstagramFeedComponent } from '../instagram-feed/instagram-feed.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    ScheduleComponent,
    MinistriesComponent,
    CellsComponent,
    EventsComponent,
    InstagramFeedComponent,
    ContactComponent
  ],
  template: `
    <app-hero></app-hero>
    <app-about></app-about>
    <app-schedule></app-schedule>
    <app-ministries></app-ministries>
    <app-cells></app-cells>
    <!-- <app-events></app-events> -->
    <!-- <app-instagram-feed></app-instagram-feed> -->
    <app-contact></app-contact>
  `
})
export class HomeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Aguarda o carregamento completo da página
    setTimeout(() => {
      this.route.fragment.subscribe(fragment => {
        if (fragment) {
          const element = document.getElementById(fragment);
          if (element) {
            // Aguarda um pouco mais para garantir que tudo está renderizado
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
          }
        }
      });
    }, 100);
  }
}

