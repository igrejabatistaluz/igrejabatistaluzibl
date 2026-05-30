import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

interface CellItem {
  nameKey: string;
  descriptionKey: string;
  dayKey: string;
  time: string;
  icon: string;
}

@Component({
  selector: 'app-cells',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cells.component.html',
  styleUrl: './cells.component.scss'
})
export class CellsComponent {
  constructor(public translationService: TranslationService) {}

  sectionTitle = computed(() => this.translationService.translate('cells.title'));
  sectionSubtitle = computed(() => this.translationService.translate('cells.subtitle'));
  addressLabel = computed(() => this.translationService.translate('cells.address.label'));
  addressValue = computed(() => this.translationService.translate('cells.address.value'));
  dayLabel = computed(() => this.translationService.translate('cells.day.label'));
  timeLabel = computed(() => this.translationService.translate('cells.time.label'));
  mapButton = computed(() => this.translationService.translate('cells.map.button'));

  cellsData = signal<CellItem[]>([
    {
      nameKey: 'cells.networking.name',
      descriptionKey: 'cells.networking.desc',
      dayKey: 'cells.day.thursday',
      time: '20:00',
      icon: '🤝'
    },
    {
      nameKey: 'cells.youth.name',
      descriptionKey: 'cells.youth.desc',
      dayKey: 'cells.day.saturday',
      time: '17:30',
      icon: '🔥'
    },
    {
      nameKey: 'cells.teens.name',
      descriptionKey: 'cells.teens.desc',
      dayKey: 'cells.day.saturday',
      time: '17:30',
      icon: '✨'
    }
  ]);

  cells = computed(() => {
    return this.cellsData().map(cell => ({
      name: this.translationService.translate(cell.nameKey),
      description: this.translationService.translate(cell.descriptionKey),
      day: this.translationService.translate(cell.dayKey),
      time: cell.time,
      icon: cell.icon
    }));
  });

  // Endereço único para todas as células - link do Google Maps
  mapUrl = 'https://www.google.com/maps/search/?api=1&query=Rua+Monsenhor+Jo%C3%A3o+Rodrigues+217+Industrial';
}
