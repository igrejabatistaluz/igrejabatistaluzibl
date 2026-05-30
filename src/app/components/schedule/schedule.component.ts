import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

interface ScheduleItem {
  dayKey: string;
  time: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {
  constructor(public translationService: TranslationService) {}

  // Traduções reativas
  sectionTitle = computed(() => this.translationService.translate('schedule.title'));
  sectionSubtitle = computed(() => this.translationService.translate('schedule.subtitle'));
  scheduleNote = computed(() => this.translationService.translate('schedule.note'));

  // Signal para os horários de culto
  schedulesData = signal<ScheduleItem[]>([
    {
      dayKey: 'schedule.wednesday',
      time: '20:00',
      titleKey: 'schedule.wednesday.title',
      descriptionKey: 'schedule.wednesday.desc',
      icon: '🙏'
    },
    {
      dayKey: 'schedule.saturday',
      time: '16:00',
      titleKey: 'schedule.saturday.prayer.title',
      descriptionKey: 'schedule.saturday.prayer.desc',
      icon: '🕊️'
    },
    {
      dayKey: 'schedule.saturday',
      time: '19:30',
      titleKey: 'schedule.saturday.title',
      descriptionKey: 'schedule.saturday.desc',
      icon: '🔥'
    },
    {
      dayKey: 'schedule.sunday',
      time: '10:00',
      titleKey: 'schedule.sunday.morning.title',
      descriptionKey: 'schedule.sunday.morning.desc',
      icon: '☀️'
    },
    {
      dayKey: 'schedule.sunday',
      time: '19:00',
      titleKey: 'schedule.sunday.evening.title',
      descriptionKey: 'schedule.sunday.evening.desc',
      icon: '🌙'
    }
  ]);

  // Computed para schedules com traduções aplicadas
  schedules = computed(() => {
    return this.schedulesData().map(schedule => ({
      day: this.translationService.translate(schedule.dayKey),
      time: schedule.time,
      title: this.translationService.translate(schedule.titleKey),
      description: this.translationService.translate(schedule.descriptionKey),
      icon: schedule.icon
    }));
  });
}

