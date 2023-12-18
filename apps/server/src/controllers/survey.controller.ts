import { NextFunction, Request, Response } from 'express';
import SurveyService from '@services/survey.service';

class SurveyController {
  public repository = new SurveyService();

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.repository.findById(req.params.id);

      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.repository.create(req.body);
      res
        .status(200)
        .json({ data: data, message: 'Survey created successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default SurveyController;
