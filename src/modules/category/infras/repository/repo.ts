import { Sequelize } from "sequelize";
import { PagingDTO } from "../../../../share/model/paging";
import { IRepository } from "../../interface";
import { CategoryCondDTO, CategoryUpdateDTO } from "../../model/dto";
import { Category } from "../../model/model";

// implement ORM here (Sequelize)

export class MySqlCategoryRepository implements IRepository {
    constructor(
        private readonly sequelize: Sequelize,
        private readonly modelName: string,
    ) { }

    get(id: string): Promise<Category | null> {
        throw new Error("Method not implemented.");
    }

    list(cond: CategoryCondDTO, paging: PagingDTO): Promise<Array<Category>> {
        throw new Error("Method not implemented.");
    }

    async insert(data: Category): Promise<boolean> {
        await this.sequelize.models[this.modelName].create(data);
        return true;
    }

    update(id: string, data: CategoryUpdateDTO): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}