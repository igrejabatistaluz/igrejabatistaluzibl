import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Recurso {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-recursos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recursos.component.html',
  styleUrl: './recursos.component.scss'
})
export class RecursosComponent {
  // Signal para os recursos - Links para ferramentas evangélicas brasileiras gratuitas
  recursos = signal<Recurso[]>([
    {
      id: 1,
      title: 'Bíblia Online',
      description: 'Leia a Bíblia Sagrada em diferentes versões evangélicas (ARC, NVI, NTLH)',
      category: 'Ferramenta',
      icon: '📖',
      url: 'https://www.bibliaonline.com.br'
    },
    {
      id: 2,
      title: 'Dicionário Bíblico',
      description: 'Consulte termos e conceitos bíblicos para melhor compreensão',
      category: 'Referência',
      icon: '📚',
      url: 'https://www.dicionariobiblico.com.br'
    },
    {
      id: 3,
      title: 'Concordância Bíblica',
      description: 'Encontre versículos por palavra-chave ou tema',
      category: 'Ferramenta',
      icon: '🔍',
      url: 'https://www.bibliaonline.com.br/concordancia'
    },
    {
      id: 4,
      title: 'Mapas Bíblicos',
      description: 'Explore a geografia e história dos tempos bíblicos',
      category: 'Referência',
      icon: '🗺️',
      url: 'https://www.textobiblico.com.br/mapas'
    },
    {
      id: 5,
      title: 'Cronologia Bíblica',
      description: 'Entenda a sequência temporal dos eventos bíblicos',
      category: 'Referência',
      icon: '📅',
      url: 'https://www.bibliaonline.com.br/cronologia'
    },
    {
      id: 6,
      title: 'Comentários Bíblicos',
      description: 'Estudos e comentários evangélicos de versículos e livros',
      category: 'Estudo',
      icon: '✍️',
      url: 'https://www.classebiblica.org'
    }
  ]);
}

