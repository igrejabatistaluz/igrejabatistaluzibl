import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, Language } from '../../services/translation.service';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
  isOpen = signal(false);

  languages = [
    { code: 'pt-BR' as Language, name: 'Português', flag: '🇧🇷' },
    { code: 'en-US' as Language, name: 'English', flag: '🇺🇸' }
  ];

  constructor(public translationService: TranslationService) {}

  currentLanguage = computed(() => {
    const lang = this.translationService.currentLang();
    return this.languages.find(l => l.code === lang) || this.languages[0];
  });

  toggleDropdown(): void {
    this.isOpen.update(value => !value);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  selectLanguage(lang: Language): void {
    this.translationService.setLanguage(lang);
    this.closeDropdown();
  }
}

