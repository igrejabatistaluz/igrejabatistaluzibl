import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

interface InstagramPost {
  id: number;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  date: string;
}

@Component({
  selector: 'app-instagram-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instagram-feed.component.html',
  styleUrl: './instagram-feed.component.scss'
})
export class InstagramFeedComponent {
  constructor(public translationService: TranslationService) {}

  // Traduções reativas
  sectionTitle = computed(() => this.translationService.translate('instagram.title'));
  sectionSubtitle = computed(() => this.translationService.translate('instagram.subtitle'));
  buttonText = computed(() => this.translationService.translate('instagram.button'));
  // Signal para os posts do Instagram (mock)
  instagramPosts = signal<InstagramPost[]>([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=400&fit=crop',
      caption: 'Culto de domingo abençoado! 🙏✨',
      likes: 245,
      comments: 32,
      date: '2 dias atrás'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      caption: 'Momento de adoração e comunhão 🎵',
      likes: 189,
      comments: 18,
      date: '4 dias atrás'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop',
      caption: 'Retiro de jovens foi incrível! 🔥',
      likes: 312,
      comments: 45,
      date: '1 semana atrás'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop',
      caption: 'Escola Bíblica Dominical - Estudo da Palavra 📖',
      likes: 156,
      comments: 12,
      date: '1 semana atrás'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop',
      caption: 'Ação social na comunidade 💙',
      likes: 278,
      comments: 28,
      date: '2 semanas atrás'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      caption: 'Culto de oração - Quarta-feira 🙏',
      likes: 134,
      comments: 15,
      date: '2 semanas atrás'
    }
  ]);

  // URL do Instagram
  instagramUrl = 'https://instagram.com/igrejabatistadaluzindustrial';

  /**
   * Formata números para exibição (ex: 1000 -> 1K)
   */
  formatNumber(num: number): string {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }
}

