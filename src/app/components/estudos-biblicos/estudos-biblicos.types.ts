/**
 * Tipos da Árvore de Estudos Bíblicos.
 *
 * Estruturado para permitir recursão (subestudos / sub-tópicos) sem refatoração
 * quando novos anexos forem enviados.
 */

export interface StudyNode {
  /** Identificador único do nó dentro do mês (slug ou número). */
  id: string;
  /** Título principal do estudo / tópico. */
  title: string;
  /** Subtítulo curto (ex.: referência bíblica, tema). */
  subtitle?: string;
  /** Texto descritivo / resumo. Suporta múltiplos parágrafos via \n. */
  description?: string;
  /** Caminho público (em /assets) do arquivo original .docx para download. */
  downloadUrl?: string;
  /** Nome amigável usado no atributo download do link. */
  downloadFilename?: string;
  /** Filhos para sub-tópicos / desdobramentos do estudo. */
  children?: StudyNode[];
}

export interface MonthNode {
  /** Slug do mês usado em IDs HTML e tracking. */
  id: string;
  /** 1 = Janeiro ... 12 = Dezembro. */
  monthNumber: number;
  /** Chave de tradução do nome do mês (ex.: 'estudos.month.january'). */
  nameKey: string;
  /** Estudos do mês. Vazio enquanto os anexos não chegam. */
  studies: StudyNode[];
}

export interface StudyPlan {
  year: number;
  /** Chave de tradução do título da raiz. */
  titleKey: string;
  months: MonthNode[];
}
