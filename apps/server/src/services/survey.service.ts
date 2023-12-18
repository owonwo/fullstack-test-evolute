import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Survey, SurveyResponse } from '@interfaces/survey.interface';
import surveyModel from '@models/survey.model';
import { CreateSurveyDto } from '@dtos/survey.dto';
import ResponseModel from '@models/response.model';
import SurveyModel from '@models/survey.model';

class SurveyService {
  public async findById(id: string): Promise<Survey> {
    if (isEmpty(id)) throw new HttpException(400, 'Invalid Id provided');

    const record = await surveyModel.findOne({ _id: id }).catch(() => null);

    if (!record) {
      throw new HttpException(400, "Survey doesn't exist");
    }

    return record;
  }

  public async create(body: CreateSurveyDto): Promise<Survey> {
    const data = await surveyModel.create(body);
    return data.toJSON();
  }

  public async saveResponse(body: SurveyResponse): Promise<SurveyResponse> {
    const survey = await SurveyModel.findById({ _id: body.survey }).catch(
      () => null,
    );
    if (!survey) {
      throw new HttpException(
        404,
        'Error saving response. Please reference a valid survey',
      );
    }

    const data = await ResponseModel.create(body);
    return data.toJSON();
  }
}

export default SurveyService;
