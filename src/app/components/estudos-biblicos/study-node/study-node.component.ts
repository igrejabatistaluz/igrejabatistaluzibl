import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { StudyNode } from '../estudos-biblicos.types';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-study-node',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './study-node.component.html',
  styleUrl: './study-node.component.scss',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', opacity: 0, overflow: 'hidden' })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', animate('280ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ])
  ]
})
export class StudyNodeComponent {
  constructor(private translationService: TranslationService) {}

  @Input({ required: true }) node!: StudyNode;
  /** Profundidade dentro da árvore (0 = filho direto do mês). */
  @Input() depth = 0;

  isExpanded = signal(false);

  downloadLabel = computed(() => this.translationService.translate('estudos.actions.download'));

  get hasChildren(): boolean {
    return !!this.node.children && this.node.children.length > 0;
  }

  get hasDownload(): boolean {
    return !!this.node.downloadUrl;
  }

  get expandState(): 'expanded' | 'collapsed' {
    return this.isExpanded() ? 'expanded' : 'collapsed';
  }

  toggle(): void {
    if (this.hasChildren) {
      this.isExpanded.update(v => !v);
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }

  /** Evita que o clique no link de download propague para o header expansível. */
  stop(event: Event): void {
    event.stopPropagation();
  }
}
