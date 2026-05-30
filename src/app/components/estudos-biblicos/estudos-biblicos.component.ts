import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TranslationService } from '../../services/translation.service';
import { STUDY_PLAN_2026 } from './estudos-biblicos.data';
import { MonthNode } from './estudos-biblicos.types';
import { StudyNodeComponent } from './study-node/study-node.component';

@Component({
  selector: 'app-estudos-biblicos',
  standalone: true,
  imports: [CommonModule, StudyNodeComponent],
  templateUrl: './estudos-biblicos.component.html',
  styleUrl: './estudos-biblicos.component.scss',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', opacity: 0, overflow: 'hidden' })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', animate('320ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ])
  ]
})
export class EstudosBiblicosComponent {
  constructor(public translationService: TranslationService) {}

  readonly plan = STUDY_PLAN_2026;
  readonly currentMonth = new Date().getMonth() + 1;

  /** Conjunto de IDs de meses expandidos. */
  private expanded = signal<Set<string>>(new Set([this.currentMonthId()]));

  planTitle = computed(() => this.translationService.translate(this.plan.titleKey));
  planSubtitle = computed(() => this.translationService.translate('estudos.plan.subtitle'));
  emptyMessage = computed(() => this.translationService.translate('estudos.empty.message'));
  expandAllLabel = computed(() => this.translationService.translate('estudos.actions.expandAll'));
  collapseAllLabel = computed(() => this.translationService.translate('estudos.actions.collapseAll'));
  currentBadgeLabel = computed(() => this.translationService.translate('estudos.currentBadge'));
  studiesCountLabel = (count: number) => {
    const key = count === 1 ? 'estudos.studiesCount.one' : 'estudos.studiesCount.many';
    return this.translationService.translate(key).replace('{{count}}', String(count));
  };

  private currentMonthId(): string {
    const m = STUDY_PLAN_2026.months.find(mo => mo.monthNumber === new Date().getMonth() + 1);
    return m ? m.id : 'janeiro';
  }

  isExpanded(monthId: string): boolean {
    return this.expanded().has(monthId);
  }

  isCurrent(month: MonthNode): boolean {
    return month.monthNumber === this.currentMonth;
  }

  expandState(monthId: string): 'expanded' | 'collapsed' {
    return this.isExpanded(monthId) ? 'expanded' : 'collapsed';
  }

  toggle(monthId: string): void {
    this.expanded.update(set => {
      const next = new Set(set);
      next.has(monthId) ? next.delete(monthId) : next.add(monthId);
      return next;
    });
  }

  onMonthKeydown(event: KeyboardEvent, monthId: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle(monthId);
    }
  }

  expandAll(): void {
    this.expanded.set(new Set(this.plan.months.map(m => m.id)));
  }

  collapseAll(): void {
    this.expanded.set(new Set());
  }

  monthName(month: MonthNode): string {
    return this.translationService.translate(month.nameKey);
  }

  monthShort(month: MonthNode): string {
    const name = this.monthName(month);
    return name.substring(0, 3).toUpperCase();
  }
}
