export type SurveyQuestion = {
  _id: string;
  question: string;
  options: string[];
};

export type Question = {
  text: string;
  options: { text: string }[];
};

export type CreateSurveyPayload = {
  title: string;
  questions: Question[];
};

export type Survey = CreateSurveyPayload & { _id: string };
