import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhatsAppFloatComponent } from './components/whatsapp-float/whatsapp-float.component';
import { DonationFloatComponent } from './components/donation-float/donation-float.component';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, WhatsAppFloatComponent, DonationFloatComponent],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
    <app-whatsapp-float></app-whatsapp-float>
    <app-donation-float></app-donation-float>
  `,
  styles: [`
    main {
      min-height: calc(100vh - 200px);
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'Igreja Batista da Luz';

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    // Inicializa o idioma ao carregar a aplicação
    this.translationService.initializeLanguage();
  }
}

