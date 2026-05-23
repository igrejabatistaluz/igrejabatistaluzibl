import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  constructor(public translationService: TranslationService) {}

  // Traduções reativas
  heroTitle = computed(() => this.translationService.translate('hero.title'));
  heroSubtitle = computed(() => this.translationService.translate('hero.subtitle'));
  heroYearTheme = computed(() => this.translationService.translate('hero.yearTheme'));
  buttonVisit = computed(() => this.translationService.translate('hero.button.visit'));
  buttonLearnMore = computed(() => this.translationService.translate('hero.button.learnMore'));

  /**
   * Scroll suave para a seção de contato
   */
  scrollToContact(): void {
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

