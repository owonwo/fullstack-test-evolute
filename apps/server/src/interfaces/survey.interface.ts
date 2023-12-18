export interface Survey {
  title: string;
  questions: Question[];
}

export interface Question {
  text: string;
  options: Option[];
}

export interface Option {
  text: string;
}
