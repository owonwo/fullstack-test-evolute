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

export type SurveyResponse = {
  user: {
    full_name: string;
    email: string;
  };
  survey: string;
  answers: string[];
};
