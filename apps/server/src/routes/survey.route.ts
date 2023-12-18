import { Router } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import SurveyController from '@controllers/survey.controller';
import {CreateSurveyDto} from "@dtos/survey.dto";

class UsersRoute implements Routes {
  public path = '/survey';
  public router = Router();
  public controller = new SurveyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.controller.getById);
    this.router.post(`${this.path}`, validationMiddleware(CreateSurveyDto, 'body'), this.controller.create);
  }
}

export default UsersRoute;
