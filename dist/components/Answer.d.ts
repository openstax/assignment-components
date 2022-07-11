import { ReactNode } from 'react';
declare type answerType = {
    id: idType;
    correctness: string;
    isCorrect: boolean;
    content_html: string;
    selected_count?: number;
};
declare type idType = string | number;
interface AnswerProps {
    answer: answerType;
    iter: number;
    qid: idType;
    type: 'teacher-review' | 'teacher-preview' | 'student' | 'student-mpp';
    hasCorrectAnswer: boolean;
    onChangeAnswer: () => void;
    disabled: boolean;
    chosenAnswer: (string | null | undefined)[];
    correctAnswerId: idType;
    incorrectAnswerId: idType;
    answered_count: number;
    show_all_feedback: boolean;
    keyControl: string | number | [];
    onKeyPress: () => void;
    children?: ReactNode;
    correctIncorrectIcon?: ReactNode;
    radioBox?: ReactNode;
    selectedCount: any;
    isCorrect: any;
    isIncorrect: any;
    feedback?: any;
}
export declare const Answer: {
    (props: AnswerProps): JSX.Element;
    displayName: string;
};
export {};
