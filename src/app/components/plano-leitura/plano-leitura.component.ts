import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LeituraDia {
  dia: number;
  data: string;
  livros: string[];
  versiculos: string;
}

@Component({
  selector: 'app-plano-leitura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plano-leitura.component.html',
  styleUrl: './plano-leitura.component.scss'
})
export class PlanoLeituraComponent {
  // Signal para o plano de leitura
  planoLeitura = signal<LeituraDia[]>([
    {
      dia: 1,
      data: '01/01/2026',
      livros: ['Gênesis 1-3', 'Mateus 1'],
      versiculos: 'Começando o ano com a criação e o nascimento de Jesus'
    },
    {
      dia: 2,
      data: '02/01/2026',
      livros: ['Gênesis 4-7', 'Mateus 2'],
      versiculos: 'A queda e o dilúvio; a fuga para o Egito'
    },
    {
      dia: 3,
      data: '03/01/2026',
      livros: ['Gênesis 8-11', 'Mateus 3'],
      versiculos: 'A torre de Babel; João Batista prepara o caminho'
    },
    {
      dia: 4,
      data: '04/01/2026',
      livros: ['Gênesis 12-15', 'Mateus 4'],
      versiculos: 'A chamada de Abraão; Jesus é tentado'
    },
    {
      dia: 5,
      data: '05/01/2026',
      livros: ['Gênesis 16-18', 'Mateus 5'],
      versiculos: 'A promessa a Abraão; o Sermão do Monte'
    }
  ]);

  // Dia atual (pode ser calculado dinamicamente)
  diaAtual = signal(1);
}

