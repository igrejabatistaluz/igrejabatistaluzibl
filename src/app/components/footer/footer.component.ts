import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public translationService: TranslationService) {}

  // Traduções reativas
  quickLinksLabel = computed(() => this.translationService.translate('footer.quickLinks'));
  followLabel = computed(() => this.translationService.translate('footer.follow'));
  copyright = computed(() => this.translationService.translate('footer.copyright'));
  madeWith = computed(() => this.translationService.translate('footer.madeWith'));

  // Signal para o versículo (mantendo em português por ser uma citação bíblica)
  verse = signal({
    text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
    reference: 'João 3:16'
  });

  // Signal para links rápidos com traduções
  quickLinksData = signal([
    { labelKey: 'nav.home', section: 'home' },
    { labelKey: 'nav.about', section: 'sobre' },
    { labelKey: 'nav.schedule', section: 'horarios' },
    { labelKey: 'nav.ministries', section: 'ministerios' },
    { labelKey: 'nav.events', section: 'eventos' },
    { labelKey: 'nav.contact', section: 'contato' }
  ]);

  // Computed para quickLinks com traduções aplicadas
  quickLinks = computed(() => {
    return this.quickLinksData().map(link => ({
      label: this.translationService.translate(link.labelKey),
      section: link.section
    }));
  });

  // Signal para redes sociais
  socialMedia = signal([
    {
      name: 'Facebook',
      icon: '📘',
      url: 'https://www.facebook.com/lagoinhaIndustrial/?locale=pt_BR',
      ariaLabel: 'Visite nossa página no Facebook'
    },
    {
      name: 'Instagram',
      icon: '📷',
      url: 'https://instagram.com/igrejabatistadaluzindustrial',
      ariaLabel: 'Siga-nos no Instagram'
    },
    {
      name: 'YouTube',
      icon: '▶️',
      url: 'https://www.youtube.com/@batistadaluzindustrial',
      ariaLabel: 'Inscreva-se em nosso canal no YouTube'
    }
  ]);

  currentYear = new Date().getFullYear();

  /**
   * Scroll suave para uma seção
   */
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

