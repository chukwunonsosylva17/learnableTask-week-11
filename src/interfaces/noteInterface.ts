import { Schema, model, Document, Types} from 'mongoose';

export interface ICategory extends Document {
  _id: Types.ObjectId;
    name: string;
    color: string;
    description: String;
    createdAt: Date;
    updatedAt: Date;
  }

export interface INote {
  _id: Types.ObjectId;
    title: string;
    content: string;
    category: Types.ObjectId | ICategory;
    createdAt: Date;
    updatedAt: Date;
  }
  
export interface INoteDocument extends INote, Document {
    _id: Types.ObjectId;
  }