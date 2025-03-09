import mongoose, {Schema} from 'mongoose';
import {INote} from '../interfaces/noteInterface';

const noteSchema = new Schema<INote>(
{
    title: { 
        type: String, 
        required: true,
        trim: true,
     },
    content: { 
        type: String, 
        required: true,
        trim: true
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
    { timestamps: true,
        versionKey: false
     },
    
);

const Note = mongoose.model<INote>('Note', noteSchema);

export default Note;
