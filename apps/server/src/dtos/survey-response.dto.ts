import {IsArray, IsObject, IsString} from 'class-validator';
import {Question} from '@interfaces/survey.interface';

type SurveyUser = {
  full_name: string;
  email: string;
};

export class CreateSurveyResponseDto {
  @IsObject()
  public user: SurveyUser;

  @IsString()
  public survey: string;

  @IsArray()
  public answers: Question;
}
