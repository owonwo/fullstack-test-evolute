import { IsString, IsArray } from 'class-validator';
import { Question } from '@interfaces/survey.interface';

export class CreateSurveyDto {
  @IsString()
  public title: string;

  @IsArray({
    message: a =>
      a.value.length === 0
        ? 'A minimum of one question is required.'
        : 'Questions requires',
  })
  public questions: Question;
}
