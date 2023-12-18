export type Question = {
  text: string;
  options: { _id: string; text: string }[];
};

export type CreateSurveyPayload = {
  title: string;
  questions: Question[];
};

export type Survey = CreateSurveyPayload & { _id: string };

export type SurveyParticipant = {
  full_name: string;
  email_address: string;
};

export type SuccessPayload<TData> =
  | {
      success: false;
      msg: string;
    }
  | {
      success: true;
      data: TData;
    };
