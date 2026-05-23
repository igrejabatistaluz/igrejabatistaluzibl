import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Estudo {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  author: string;
  pdfUrl?: string;
  videoUrl?: string;
}

@Component({
  selector: 'app-estudos-biblicos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estudos-biblicos.component.html',
  styleUrl: './estudos-biblicos.component.scss'
})
export class EstudosBiblicosComponent {
  // Signal para os estudos bíblicos
  estudos = signal<Estudo[]>([
    {
      id: 1,
      title: 'Estudo sobre o Livro de Gênesis',
      description: 'Uma jornada completa pelo primeiro livro da Bíblia, explorando a criação, a queda e o início da história da redenção.',
      category: 'Antigo Testamento',
      duration: '12 semanas',
      author: 'Pastor Luciano Barcelos',
      pdfUrl: '#',
      videoUrl: '#'
    },
    {
      id: 2,
      title: 'O Sermão do Monte',
      description: 'Estudo profundo sobre as bem-aventuranças e os ensinamentos de Jesus no Sermão do Monte.',
      category: 'Novo Testamento',
      duration: '8 semanas',
      author: 'Pastor Luciano Barcelos',
      pdfUrl: '#',
      videoUrl: '#'
    },
    {
      id: 3,
      title: 'Cartas de Paulo aos Coríntios',
      description: 'Análise das cartas de Paulo à igreja de Corinto, abordando questões práticas da vida cristã.',
      category: 'Epístolas',
      duration: '10 semanas',
      author: 'Pastor Luciano Barcelos',
      pdfUrl: '#',
      videoUrl: '#'
    },
    {
      id: 4,
      title: 'O Livro de Salmos',
      description: 'Estudo devocional através dos Salmos, explorando adoração, lamento e louvor.',
      category: 'Poesia',
      duration: '15 semanas',
      author: 'Pastor Luciano Barcelos',
      pdfUrl: '#',
      videoUrl: '#'
    }
  ]);
}

