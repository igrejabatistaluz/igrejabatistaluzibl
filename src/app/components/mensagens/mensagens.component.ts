import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Mensagem {
  id: number;
  title: string;
  preacher: string;
  date: string;
  duration: string;
  description: string;
  videoUrl?: string;
  audioUrl?: string;
  thumbnail: string;
}

@Component({
  selector: 'app-mensagens',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensagens.component.html',
  styleUrl: './mensagens.component.scss'
})
export class MensagensComponent {
  // Signal para as mensagens
  mensagens = signal<Mensagem[]>([
    {
      id: 1,
      title: 'Vivendo na Luz da Palavra',
      preacher: 'Pastor Luciano Barcelos',
      date: '14/01/2026',
      duration: '45 min',
      description: 'Mensagem sobre a importância de viver guiado pela Palavra de Deus em todos os aspectos da vida.',
      videoUrl: '#',
      audioUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'O Ano da Consolidação',
      preacher: 'Pastor Luciano Barcelos',
      date: '07/01/2026',
      duration: '50 min',
      description: 'Mensagem de início de ano sobre consolidação, crescimento e fortalecimento da fé.',
      videoUrl: '#',
      audioUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Amor e Comunhão',
      preacher: 'Pastor Luciano Barcelos',
      date: '31/12/2025',
      duration: '40 min',
      description: 'Reflexão sobre o verdadeiro significado do amor cristão e a importância da comunhão.',
      videoUrl: '#',
      audioUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop'
    }
  ]);
}

