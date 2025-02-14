import { v7 } from "uuid";
import { ModelStatus } from "../../../share/model/base-model";
import { ICategoryUseCase, IRepository } from "../interface";
import { CategoryCondDTO, CategoryCreateDTO, CategoryUpdateDTO } from "../model/dto";
import { Category } from "../model/model";
import { PagingDTO } from "../../../share/model/paging";
import { ErrDataNotFound } from "../../../share/model/base-errors";

// UseCase --impl--> Port Interface
export class CategoryUseCase implements ICategoryUseCase {
    constructor(private readonly repository: IRepository) { }

    // create a new category
    async create(data: CategoryCreateDTO): Promise<string> {
        // should validate data here or in the controller/transports
        const newId = v7();
        const category: Category = {
            id: newId,
            name: data.name,
            position: 0,
            image: data.image,
            description: data.description,
            status: ModelStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        await this.repository.insert(category);

        return newId;
    }

    async update(id: string, data: CategoryUpdateDTO): Promise<boolean> {
        const category = await this.repository.get(id);

        if (!category || category.status === ModelStatus.DELETED) {
            throw ErrDataNotFound;
        }

        return await this.repository.update(id, data);
    }

    async delete(id: string): Promise<boolean> {
        const category = await this.repository.get(id);

        if (!category || category.status === ModelStatus.DELETED) {
            throw ErrDataNotFound;
        }

        return await this.repository.delete(id, false);
    }

    async getDetail(id: string): Promise<Category | null> {
        const data = await this.repository.get(id);

        if (!data || data.status === ModelStatus.DELETED) {
            throw ErrDataNotFound; // should not use library's errors
        }

        return data;
    }

    async getList(cond: CategoryCondDTO, paging: PagingDTO): Promise<Array<Category>> {
        const data = await this.repository.list(cond, paging);
        return data;
    }
}