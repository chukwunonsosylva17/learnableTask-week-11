import { Document } from 'mongoose';
import { ICategory, INote } from '../interfaces/noteInterface';

export type CreateNoteInput = {
    title: string;
    content: string;
    categoryId: ICategory['_id'];
};

export type UpdateNoteInput = Partial<CreateNoteInput> & {
    updatedAt?: Date;
};

export type CreateCategoryInput = {
    name: string;
    color?: string;
};

export type UpdateCategoryInput = Partial<CreateCategoryInput>;

export type NoteDocument = Document<unknown, any, INote> & INote;
export type CategoryDocument = Document<unknown, any, ICategory> & ICategory;
