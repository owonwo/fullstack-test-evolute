import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Survey } from '@interfaces/survey.interface';
import surveyModel from '@models/survey.model';
import { CreateSurveyDto } from '@dtos/survey.dto';

class SurveyService {
  public async findById(id: string): Promise<Survey> {
    if (isEmpty(id)) throw new HttpException(400, 'UserId is empty');

    const record = await surveyModel.findOne({ _id: id });

    if (!record) {
      throw new HttpException(409, "Survey doesn't exist");
    }

    return record;
  }

  public async create(body: CreateSurveyDto): Promise<Survey> {
    const data = await surveyModel.create(body);

    return data.toJSON();
  }
}

export default SurveyService;
