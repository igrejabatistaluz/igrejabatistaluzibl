import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Devocional {
  id: number;
  title: string;
  date: string;
  verse: string;
  verseReference: string;
  content: string;
  author: string;
}

@Component({
  selector: 'app-devocionais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './devocionais.component.html',
  styleUrl: './devocionais.component.scss'
})
export class DevocionaisComponent {
  // Signal para os devocionais
  devocionais = signal<Devocional[]>([
    {
      id: 1,
      title: 'Vivendo na Luz da Palavra',
      date: '18/01/2026',
      verse: 'Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho.',
      verseReference: 'Salmos 119:105',
      content: 'A Palavra de Deus é nossa guia em todos os momentos. Quando meditamos nela diariamente, encontramos direção, sabedoria e força para enfrentar os desafios da vida. Que possamos buscar a Deus através de Sua Palavra todos os dias.',
      author: 'Pastor Luciano Barcelos'
    },
    {
      id: 2,
      title: 'O Poder da Oração',
      date: '17/01/2026',
      verse: 'Orem continuamente.',
      verseReference: '1 Tessalonicenses 5:17',
      content: 'A oração é nossa conexão direta com o Pai. Através dela, podemos compartilhar nossas alegrias, preocupações e necessidades. Deus ouve cada palavra e responde de acordo com Sua vontade perfeita.',
      author: 'Pastor Luciano Barcelos'
    },
    {
      id: 3,
      title: 'Amor Incondicional',
      date: '16/01/2026',
      verse: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.',
      verseReference: 'João 3:16',
      content: 'O amor de Deus por nós é incomparável. Ele nos amou primeiro, mesmo quando não merecíamos. Esse amor deve ser nossa inspiração para amar o próximo e viver em comunhão.',
      author: 'Pastor Luciano Barcelos'
    }
  ]);
}

