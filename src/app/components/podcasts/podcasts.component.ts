import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Podcast {
  id: number;
  title: string;
  description: string;
  duration: string;
  date: string;
  thumbnail: string;
  platform: string;
  url: string;
}

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './podcasts.component.html',
  styleUrl: './podcasts.component.scss'
})
export class PodcastsComponent {
  // Signal para os podcasts
  podcasts = signal<Podcast[]>([
    {
      id: 1,
      title: 'Vivendo na Luz - Episódio 1',
      description: 'Uma conversa sobre como viver nossa fé no dia a dia, buscando a luz da Palavra de Deus em todas as situações.',
      duration: '45 min',
      date: '15/01/2026',
      thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop',
      platform: 'Spotify',
      url: '#'
    },
    {
      id: 2,
      title: 'Estudos Bíblicos - Gênesis',
      description: 'Série de estudos sobre o livro de Gênesis, explorando os fundamentos da criação e o início da história bíblica.',
      duration: '60 min',
      date: '10/01/2026',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      platform: 'YouTube',
      url: '#'
    },
    {
      id: 3,
      title: 'Mensagens de Esperança',
      description: 'Palavras de encorajamento e esperança para momentos difíceis, baseadas na promessa de Deus para nossas vidas.',
      duration: '30 min',
      date: '05/01/2026',
      thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop',
      platform: 'Apple Podcasts',
      url: '#'
    }
  ]);
}

