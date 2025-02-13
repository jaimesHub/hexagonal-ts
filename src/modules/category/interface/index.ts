import { PagingDTO } from "../../../share/model/paging";
import { CategoryCondDTO, CategoryCreateDTO, CategoryUpdateDTO } from "../model/dto";
import { Category } from "../model/model";

export interface ICategoryUseCase {
    // Port Interfaces
    create(data: CategoryCreateDTO): Promise<string>;

}

export interface IRepository extends IQueryRepository, ICommandRepository {
    // insert(data: Category): Promise<void>;
    // update(id: string, data: CategoryUpdateDTO): Promise<boolean>;
    // delete(id: string): Promise<boolean>;

    // get(id: string): Promise<Category>;
    // list(cond: CategoryCondDTO, paging: PagingDTO): Promise<Array<Category>>;
}

// Interface Segreration Principle

export interface IQueryRepository {
    get(id: string): Promise<Category | null>;
    list(cond: CategoryCondDTO, paging: PagingDTO): Promise<Array<Category>>;
}

export interface ICommandRepository {
    insert(data: Category): Promise<void>;
    update(id: string, data: CategoryUpdateDTO): Promise<boolean>;
    delete(id: string): Promise<boolean>;

}