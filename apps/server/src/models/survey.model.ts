import { Survey } from '@/interfaces/survey.interface';
import { Document, model, Schema } from 'mongoose';

const optionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
});

const questionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  options: [optionSchema],
});

const surveySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
});

const SurveyModel = model<Survey & Document>('Survey', surveySchema);

export default SurveyModel;
