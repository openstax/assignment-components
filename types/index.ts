export type answerType = {
  id: idType;
  correctness: string | null;
  isCorrect: boolean;
  content_html: string;
  selected_count?: number;
};

export type chosenAnswerType = (idType | undefined)[];

export type idType = string | number;
