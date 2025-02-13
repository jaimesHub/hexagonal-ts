import { v7 } from "uuid";
import { ModelStatus } from "../../../share/model/base-model";
import { ICategoryUseCase, IRepository } from "../interface";
import { CategoryCreateDTO } from "../model/dto";
import { Category } from "../model/model";

// UseCase --impl--> Port Interface
export class CategoryUseCase implements ICategoryUseCase {
    constructor(private readonly repository: IRepository) { }

    // create a new category
    async create(data: CategoryCreateDTO): Promise<string> {
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

        const result = await this.repository.insert(category);

        return newId;
    }


}