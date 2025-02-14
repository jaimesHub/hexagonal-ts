import { Router } from "express";
import { init, modelName } from "./infras/repository/dto";
import { Sequelize } from "sequelize";
import { CategoryHttpService } from "./infras/transport/http-service";
import { CategoryUseCase } from "./usecase";
import { MySqlCategoryRepository } from "./infras/repository/repo";

export const setupCategoryHexagon = (sequelize: Sequelize) => {
    init(sequelize);

    // setup DI here
    const repository = new MySqlCategoryRepository(sequelize, modelName);
    const useCase = new CategoryUseCase(repository);
    const httpService = new CategoryHttpService(useCase);

    const router = Router();

    router.get('/categories', httpService.listCategory.bind(httpService));
    router.get('/categories/:id', httpService.getCategory.bind(httpService));
    router.post('/categories', httpService.createCategory.bind(httpService));
    router.patch('/categories/:id', httpService.updateCategory.bind(httpService));
    router.delete('/categories/:id', httpService.deleteCategory.bind(httpService));

    return router;
}