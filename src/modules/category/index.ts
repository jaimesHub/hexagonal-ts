import { Router } from "express";
import { listCategoryApi } from "./infras/list-api";
import { getCategoryApi } from "./infras/get-api";
import { createCategoryApi } from "./infras/create-api";
import { updateCategoryApi } from "./infras/update-api";
import { deleteCategoryApi } from "./infras/delete-api";
import { init, modelName } from "./infras/repository/dto";
import { Sequelize } from "sequelize";
import { CategoryHttpService } from "./infras/transport/http-service";
import { CategoryUseCase } from "./usecase";
import { MySqlCategoryRepository } from "./infras/repository/repo";

export const setupCategoryModule = (sequelize: Sequelize) => {
    init(sequelize);
    const router = Router();

    router.get('/categories', listCategoryApi());
    router.get('/categories/:id', getCategoryApi());
    router.post('/categories', createCategoryApi());
    router.patch('/categories/:id', updateCategoryApi());
    router.delete('/categories/:id', deleteCategoryApi());

    return router;
}

export const setupCategoryHexagon = (sequelize: Sequelize) => {
    init(sequelize);

    // setup DI here
    const repository = new MySqlCategoryRepository(sequelize, modelName);
    const useCase = new CategoryUseCase(repository);
    const httpService = new CategoryHttpService(useCase);

    const router = Router();

    router.get('/categories', listCategoryApi());
    router.get('/categories/:id', getCategoryApi());
    router.post('/categories', httpService.createCategory.bind(httpService));
    router.patch('/categories/:id', updateCategoryApi());
    router.delete('/categories/:id', deleteCategoryApi());

    return router;
}