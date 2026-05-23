import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

interface Ministry {
  icon: string;
  titleKey: string;
  descriptionKey: string;
  color: string;
}

@Component({
  selector: 'app-ministries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ministries.component.html',
  styleUrl: './ministries.component.scss'
})
export class MinistriesComponent {
  constructor(public translationService: TranslationService) {}

  // Traduções reativas
  sectionTitle = computed(() => this.translationService.translate('ministries.title'));
  sectionSubtitle = computed(() => this.translationService.translate('ministries.subtitle'));
  ctaText = computed(() => this.translationService.translate('ministries.cta.text'));
  ctaButton = computed(() => this.translationService.translate('ministries.cta.button'));

  // Signal para os ministérios
  ministriesData = signal<Ministry[]>([
    {
      icon: '👨‍👩‍👧‍👦',
      titleKey: 'ministries.family.title',
      descriptionKey: 'ministries.family.desc',
      color: 'var(--color-primary)'
    },
    {
      icon: '🔥',
      titleKey: 'ministries.youth.title',
      descriptionKey: 'ministries.youth.desc',
      color: 'var(--color-highlight)'
    },
    {
      icon: '👶',
      titleKey: 'ministries.children.title',
      descriptionKey: 'ministries.children.desc',
      color: 'var(--color-background)'
    },
    {
      icon: '🎵',
      titleKey: 'ministries.worship.title',
      descriptionKey: 'ministries.worship.desc',
      color: 'var(--color-primary)'
    },
    {
      icon: '📖',
      titleKey: 'ministries.teaching.title',
      descriptionKey: 'ministries.teaching.desc',
      color: 'var(--color-highlight)'
    },
    {
      icon: '🤝',
      titleKey: 'ministries.social.title',
      descriptionKey: 'ministries.social.desc',
      color: 'var(--color-background)'
    },
    {
      icon: '🙏',
      titleKey: 'ministries.intercession.title',
      descriptionKey: 'ministries.intercession.desc',
      color: 'var(--color-primary)'
    },
    {
      icon: '🌍',
      titleKey: 'ministries.missions.title',
      descriptionKey: 'ministries.missions.desc',
      color: 'var(--color-highlight)'
    }
  ]);

  // Computed para ministries com traduções aplicadas
  ministries = computed(() => {
    return this.ministriesData().map(ministry => ({
      icon: ministry.icon,
      title: this.translationService.translate(ministry.titleKey),
      description: this.translationService.translate(ministry.descriptionKey),
      color: ministry.color
    }));
  });

  /**
   * Retorna um gradiente baseado na cor fornecida
   */
  getGradient(color: string): string {
    if (color.includes('primary')) {
      return 'linear-gradient(135deg, var(--color-primary), var(--color-highlight))';
    } else if (color.includes('highlight')) {
      return 'linear-gradient(135deg, var(--color-highlight), var(--color-background))';
    } else {
      return 'linear-gradient(135deg, var(--color-background), var(--color-highlight))';
    }
  }

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

