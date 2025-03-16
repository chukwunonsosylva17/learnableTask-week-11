
import { Request, Response, NextFunction } from "express";
import {
  getAllNotes,
  getNoteById,
  createNewNote,
  updateExistingNote,
  deleteNoteById,
} from "../services/note.service";

// Get all notes
export const getNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const notes = await getAllNotes();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// Get a single note by ID
export const getNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const note = await getNoteById(req.params.id);
    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// Create a new note
export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, content, category } = req.body;
    const newNote = await createNewNote(title, content, category);
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

// Update an existing note
export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, content, category } = req.body;
    const updatedNote = await updateExistingNote(
      req.params.id,
      title,
      content,
      category
    );

    if (!updatedNote) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

// Delete a note
export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deletedNote = await deleteNoteById(req.params.id);
    if (!deletedNote) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    next(error);
  }
};








// // src/controllers/notes.controller.ts
// import { RequestHandler } from 'express';
// import { NoteService } from '../services/note.service';
// import { z } from 'zod';
// import { validateRequest } from '../middleware/validation.middleware';
// import { NotFoundError } from '../utils/errorHandler';

// // Zod schemas for validation
// export const createNoteSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   content: z.string().min(1, "Content is required"),
//   categoryId: z.string().min(1, "Category ID is required")
// });

// export const updateNoteSchema = createNoteSchema.partial();

// // Controller methods

// export const getAllNotes: RequestHandler = async (req, res, next) => {
//   try {
//     const notes = await NoteService.getAllNotes();
//     res.json(notes);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getNoteById: RequestHandler = async (req, res, next) => {
//   try {
//     const note = await NoteService.getNoteById(req.params.id);
//     res.json(note);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateNote: RequestHandler = async (req, res, next) => {
//   try {
//     const note = await NoteService.updateNote(req.params.id, req.body);
//     res.json(note);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteNote: RequestHandler = async (req, res, next) => {
//   try {
//     await NoteService.deleteNote(req.params.id);
//     res.status(204).send();
//   } catch (error) {
//     next(error);
//   }
// };

// export const createNoteByCategory: RequestHandler = async (req, res, next) => {
//   try {
//     const note = await NoteService.createNote(req.body.categoryId);
//     res.status(201).json(note);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createNote: RequestHandler = async (req, res, next) => {
//   try {
//     const note = await NoteService.createNote(req.body.categoryId);
//     res.status(201).json(note);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getNotesByCategory: RequestHandler = async (req, res, next) => {
//   try {
//     if (!req.params.categoryId) {
//       return next(new NotFoundError('Category ID is required'));
//     }

//     const notes = await NoteService.getNotesByCategory(req.params.categoryId);

//     if (!notes) {
//       return next(new NotFoundError('No notes found'));
//     }

//     res.json(notes);
//   } catch (error) {
//     next(error);
//   }
// };

// // Route configuration
// export const noteRoutes = [
//   {
//     path: '/',
//     method: 'get',
//     handler: getAllNotes
//   },
//   {
//     path: '/:id',
//     method: 'get',
//     handler: getNoteById
//   },
//   {
//     path: '/:id',
//     method: 'post',
//     middleware: [validateRequest(createNoteSchema)],
//     handler: createNoteByCategory
//   },
//   {
//     path: '/:id',
//     method: 'post',
//     middleware: [validateRequest(createNoteSchema)],
//     handler: createNote
//   },
//   {
//     path: '/:id',
//     method: 'put',
//     middleware: [validateRequest(updateNoteSchema)],
//     handler: updateNote
//   },
//   {
//     path: '/:id',
//     method: 'delete',
//     handler: deleteNote
//   },
//   {
//     path: '/categories/:categoryId',
//     method: 'get',
//     handler: getNotesByCategory
//   }
// ];



// import { RequestHandler, Request, Response, NextFunction } from 'express';
// import Note from '../models/note.model';
// import { Category } from '../models/category.model'
// import { NotFoundError, ValidationError } from '../utils/errorHandler';
// import { z } from  'zod';

// // Zod schemas for validation
// export const noteSchema = z.object({
//   title: z.string().min(1),
//   content: z.string().min(1),
//   category: z.string().optional()
// });

// export const updateNoteSchema = noteSchema.partial();

// // Controller Methods

// // Get all notes
// export const getAllNotes = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//       const notes = await Note.find().sort({ updatedAt: -1 }).lean();

//       if (!notes) {
//           return next(new NotFoundError('No notes found'));
//       }

//       res.json({
//           status: 'success',
//           results: notes.length,
//           data: {
//               notes
//           }
//       });
//   } catch (error) {
//       next(error);
//   }
// };

// // Get a specific note
// export const getNoteById = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//       const note = await Note.findById(req.params.id).lean();

//       if (!note) {
//           return next(new NotFoundError(`Note with ID ${req.params.id} not found`));
//       }

//       res.json({ status: 'success', data: { note } });
//   } catch (error) {
//       next(error);
//   }
// };

// // Create a new note
// export const createNote: RequestHandler = async (req, res, next) => {
//   try {
//       const { title, content, category } = req.body;

//       if (!title || !content) {
//           return next(new ValidationError('Title and content are required'));
//       }

//       const categoryExistsPromise = category ? Category.findById(category) : Promise.resolve(null);

//       const [categoryExists] = await Promise.all([categoryExistsPromise]);

//       if (category && !categoryExists) {
//           return next(new NotFoundError(`Category with ID ${category} not found`));
//       }

//       const newNote = await Note.create({
//           title,
//           content,
//           category: categoryExists ? categoryExists._id : undefined
//       });

//       res.status(201).json({
//           status: 'success',
//           data: { note: newNote }
//       });
//   } catch (error) {
//       next(error);
//   }
// };

// // Delete a note
// export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//       const note = await Note.findByIdAndDelete(req.params.id);

//       if (!note) {
//           return next(new NotFoundError(`Note with ID ${req.params.id} not found`));
//       }

//       res.status(204).json({ status: 'success', data: null });
//   } catch (error) {
//       next(error);
//   }
// };

// export const getNotesByCategory: RequestHandler = async (req, res, next) => {
//   try {
//       const category = await Category.findById(req.params.categoryId);
//       if (!category) throw new NotFoundError('Category not found');
  
//       const notes = await Note.find({ category: req.params.categoryId })
//           .populate('category')

//       res.json(notes);
//   } catch (error) {
//       next(error);
//   }
// };

// export const updateNote: RequestHandler = async (req, res, next) => {
//   try {
//       const note = await Note.findByIdAndUpdate(
//           req.params.id,
//           { new: true, runValidators: true }
//       ).populate('category');

//       if (!note) throw new NotFoundError('Note not found');
//       res.json(note);
//   } catch (error) {
//       next(error);
//   }
// };
