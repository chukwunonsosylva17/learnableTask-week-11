import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../interfaces/noteInterface';

const categorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        color: {
            type: String,
            default: '#ffffff'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
    },
    { timestamps: true }
);

export const Category = mongoose.model<ICategory>('Category', categorySchema);