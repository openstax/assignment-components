type CollaboratorSolution = {
  content_html: string;
};

export type Question = {
  id: ID;
  stem_html: string;
  collaborator_solutions: CollaboratorSolution[];
  formats?: string[];
  stimulus_html: string;
  answers: Answer[];
};

export type Answer = {
  id: ID;
  correctness: string | null | undefined;
  isCorrect?: boolean;
  content_html: string;
  selected_count?: number;
  feedback_html?: string;
};

export type AnswerDisplayType = 'teacher-review' | 'teacher-preview' | 'student' | 'student-mpp';
export type ChosenAnswer = (ID | undefined)[];

export type ID = string | number;
