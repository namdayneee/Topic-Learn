
export interface WordForm {
  word: string;
  type: string;
  pronunciation: string;
  meaning: string;
}

export interface VocabularyItem {
  word: string;
  pronunciation: string;
  type: string;
  meaning: string;
  example: string;
  relatedForms: WordForm[];
}

export interface ExerciseOption {
  letter: string;
  text: string;
}

export interface Exercise {
  question: string;
  options: ExerciseOption[];
  correctAnswer: string;
  explanation: string;
}

export interface Topic {
  id: number;
  title: string;
  vietnameseTitle: string;
  vocabulary: VocabularyItem[];
  exercises: Exercise[];
}
