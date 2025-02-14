import { PagingDTO } from "../../../share/model/paging";
import { CategoryCondDTO, CategoryCreateDTO, CategoryUpdateDTO } from "../model/dto";
import { Category } from "../model/model";

export interface ICategoryUseCase {
    // Port Interfaces
    create(data: CategoryCreateDTO): Promise<string>;
    update(id: string, data: CategoryUpdateDTO): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    getDetail(id: string): Promise<Category | null>;
    getList(cond: CategoryCondDTO, paging: PagingDTO): Promise<Array<Category>>;

}

export interface IRepository extends IQueryRepository, ICommandRepository { }

// Interface Segregation Principle

export interface IQueryRepository {
    get(id: string): Promise<Category | null>;
    list(cond: CategoryCondDTO, paging: PagingDTO): Promise<Array<Category>>;
}

export interface ICommandRepository {
    insert(data: Category): Promise<boolean>;
    update(id: string, data: CategoryUpdateDTO): Promise<boolean>;
    delete(id: string, isHard: boolean): Promise<boolean>;

}