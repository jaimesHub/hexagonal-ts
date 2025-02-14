import { z } from "zod";
import { ModelStatus } from "../../../share/model/base-model";

export const CategoryCreateSchema = z.object({
    name: z.string().min(2, 'name must be at least 2 characters'),
    image: z.string().optional(),
    description: z.string().optional(),
    parentId: z.string().uuid().nullable().optional(),
});

export type CategoryCreateDTO = z.infer<typeof CategoryCreateSchema>;

// type AnotherCategoryCreateDTO = Omit<Category, 'id' | 'position' | 'createdAt' | 'updatedAt'>;

export const CategoryUpdateSchema = z.object({
    name: z.string().min(2, 'name must be at least 2 characters').optional(),
    image: z.string().optional(),
    description: z.string().max(255, 'description must be at most 255 characters').optional(),
    parentId: z.string().uuid().nullable().optional(),
    status: z.nativeEnum(ModelStatus).optional(),
});

export type CategoryUpdateDTO = z.infer<typeof CategoryUpdateSchema>;

// type AnotherCategoryUpdateDTO = Pick<Category, 'name' | 'image' | 'description' | 'parentId' | 'status'>;

export const CategoryCondDTOSchema = z.object({
    name: z.string().min(3, 'name must be at least 3 characters').optional(),
    parentId: z.string().uuid().nullable().optional(),
    status: z.nativeEnum(ModelStatus).optional(),
});

export type CategoryCondDTO = z.infer<typeof CategoryCondDTOSchema>;