import { Component, signal, HostListener, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageSelectorComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    private router: Router,
    public translationService: TranslationService
  ) {}
  // Signal para controlar o estado do menu mobile
  isMenuOpen = signal(false);
  // Signal para controlar se o header está fixo (scroll)
  isScrolled = signal(false);
  // Signal para controlar o dropdown "Mais"
  isMoreMenuOpen = signal(false);

  // Links do menu "Mais" com traduções
  moreMenuItems = computed(() => [
    {
      label: this.translationService.translate('more.devocionais'),
      icon: '📖',
      url: '/devocionais',
      description: this.translationService.translate('more.devocionais.desc')
    },
    // {
    //   label: this.translationService.translate('more.podcasts'),
    //   icon: '🎙️',
    //   url: '/podcasts',
    //   description: this.translationService.translate('more.podcasts.desc')
    // },
    {
      label: this.translationService.translate('more.planoLeitura'),
      icon: '📚',
      url: '/plano-leitura',
      description: this.translationService.translate('more.planoLeitura.desc')
    },
    {
      label: this.translationService.translate('more.estudos'),
      icon: '✍️',
      url: '/estudos-biblicos',
      description: this.translationService.translate('more.estudos.desc')
    },
    // {
    //   label: this.translationService.translate('more.mensagens'),
    //   icon: '🎤',
    //   url: '/mensagens',
    //   description: this.translationService.translate('more.mensagens.desc')
    // },
    {
      label: this.translationService.translate('more.recursos'),
      icon: '📦',
      url: '/recursos',
      description: this.translationService.translate('more.recursos.desc')
    }
  ]);

  /**
   * Listener para detectar scroll e aplicar estilo ao header
   */
  // Traduções reativas
  navHome = computed(() => this.translationService.translate('nav.home'));
  navAbout = computed(() => this.translationService.translate('nav.about'));
  navSchedule = computed(() => this.translationService.translate('nav.schedule'));
  navMinistries = computed(() => this.translationService.translate('nav.ministries'));
  navCells = computed(() => this.translationService.translate('nav.cells'));
  navEvents = computed(() => this.translationService.translate('nav.events'));
  navContact = computed(() => this.translationService.translate('nav.contact'));
  navMore = computed(() => this.translationService.translate('nav.more'));

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
    this.closeMoreMenu();
  }

  /**
   * Alterna o estado do menu mobile
   */
  toggleMenu(): void {
    this.isMenuOpen.update(value => {
      // Se estiver fechando o menu, fecha também o dropdown "Mais"
      if (value) {
        this.closeMoreMenu();
      }
      return !value;
    });
  }

  /**
   * Fecha o menu mobile
   */
  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  /**
   * Navega para uma seção e fecha o menu
   * Se estiver em outra página, navega para a home primeiro
   */
  scrollToSection(sectionId: string): void {
    // Verifica se está na página inicial
    if (this.router.url === '/' || this.router.url === '') {
      // Se estiver na home, faz scroll direto
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Se não estiver na home, navega para lá com hash
      this.router.navigate(['/'], { fragment: sectionId }).then(() => {
        // Aguarda a navegação e faz scroll
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      });
    }
    this.closeMenu();
    this.closeMoreMenu();
  }

  /**
   * Alterna o estado do dropdown "Mais"
   */
  toggleMoreMenu(): void {
    this.isMoreMenuOpen.update(value => !value);
  }

  /**
   * Fecha o dropdown "Mais"
   */
  closeMoreMenu(): void {
    this.isMoreMenuOpen.set(false);
  }

  /**
   * Hover no menu "Mais" (apenas desktop)
   */
  onMoreMenuHover(): void {
    // Só funciona no desktop (largura >= 768px)
    if (window.innerWidth >= 768) {
      this.isMoreMenuOpen.set(true);
    }
  }

  /**
   * Leave no menu "Mais" (apenas desktop)
   */
  onMoreMenuLeave(): void {
    // Só funciona no desktop (largura >= 768px)
    if (window.innerWidth >= 768) {
      this.closeMoreMenu();
    }
  }
}

