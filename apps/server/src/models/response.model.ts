import { Document, model, Schema } from 'mongoose';
import { SurveyResponse } from '@interfaces/survey.interface';

const responseSchema = new Schema({
  survey: {
    type: Schema.Types.ObjectId,
    ref: 'Survey',
    required: true,
  },
  answers: {
    type: [
      [
        {
          type: Schema.Types.ObjectId,
          ref: 'Option',
        },
      ],
    ],
    default: [],
  },
});

const Response = model<Document<SurveyResponse>>('Response', responseSchema);

export default Response;
