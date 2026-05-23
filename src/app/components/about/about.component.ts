import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

interface Value {
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  constructor(public translationService: TranslationService) {}

  // Traduções reativas
  sectionTitle = computed(() => this.translationService.translate('about.title'));
  sectionSubtitle = computed(() => this.translationService.translate('about.subtitle'));
  
  mission = computed(() => ({
    title: this.translationService.translate('about.mission.title'),
    description: this.translationService.translate('about.mission.text')
  }));

  vision = computed(() => ({
    title: this.translationService.translate('about.vision.title'),
    description: this.translationService.translate('about.vision.text')
  }));

  // Tema do ano
  yearTheme = computed(() => this.translationService.translate('hero.yearTheme'));

  values = signal<Value[]>([
    {
      icon: '❤️',
      titleKey: 'Amor',
      descriptionKey: 'about.value.love'
    },
    {
      icon: '🤝',
      titleKey: 'Comunhão',
      descriptionKey: 'about.value.fellowship'
    },
    {
      icon: '📖',
      titleKey: 'Palavra de Deus',
      descriptionKey: 'about.value.word'
    },
    {
      icon: '🙏',
      titleKey: 'Oração',
      descriptionKey: 'about.value.prayer'
    },
    {
      icon: '🎯',
      titleKey: 'Missão',
      descriptionKey: 'about.value.mission'
    },
    {
      icon: '✨',
      titleKey: 'Excelência',
      descriptionKey: 'about.value.excellence'
    }
  ]);

  getValueDescription(key: string): string {
    return this.translationService.translate(key);
  }
}

