import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  constructor(public translationService: TranslationService) {}

  // Traduções reativas
  sectionTitle = computed(() => this.translationService.translate('events.title'));
  sectionSubtitle = computed(() => this.translationService.translate('events.subtitle'));
  ctaText = computed(() => this.translationService.translate('events.cta.text'));
  ctaButton = computed(() => this.translationService.translate('events.cta.button'));
  locationLabel = computed(() => this.translationService.translate('events.location'));
  timeLabel = computed(() => this.translationService.translate('events.time'));

  // Signal para os próximos eventos (mantendo os dados originais, mas podem ser traduzidos no futuro)
  events = signal<Event[]>([
    {
      title: 'Retiro de Jovens',
      date: '15/03/2024',
      time: '08:00',
      location: 'Acampamento Monte Sinai',
      description: 'Um fim de semana de comunhão, adoração e crescimento espiritual para jovens.',
      icon: '🔥'
    },
    {
      title: 'Conferência de Família',
      date: '22/03/2024',
      time: '19:00',
      location: 'Templo Principal',
      description: 'Palestras e workshops sobre relacionamento familiar e valores cristãos.',
      icon: '👨‍👩‍👧‍👦'
    },
    {
      title: 'Culto de Celebração',
      date: '31/03/2024',
      time: '10:00',
      location: 'Templo Principal',
      description: 'Culto especial de celebração com testemunhos e ministração especial.',
      icon: '🎉'
    },
    {
      title: 'Escola Bíblica de Férias',
      date: '10/07/2024',
      time: '14:00',
      location: 'Templo Principal',
      description: 'Programação especial para crianças durante as férias escolares.',
      icon: '👶'
    }
  ]);

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

