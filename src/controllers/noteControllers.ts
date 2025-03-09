import { Request, Response , NextFunction} from 'express';
import Note from '../models/noteModel';
import { NotFoundError, BadRequestError } from '../utils/errorClasses';


 // Get all notes
 export const getAllNotes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const notes = await Note.find().sort({ updatedAt: -1 });
      
      res.status(200).json({
        status: 'success',
        results: notes.length,
        data: {
          notes
        }
      });
    } catch (error) {
      next(error);
    }
  };
  
  // Get a specific note
  export const getNoteById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const note = await Note.findById(req.params.id);
      
      if (!note) {
        return next(new NotFoundError(`Note with ID ${req.params.id} not found`));
      }
      
      res.status(200).json({
        status: 'success',
        data: {
          note
        }
      });
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
      const { title, content } = req.body;
      
      if (!title || !content) {
        return next(new BadRequestError('Title and content are required'));
      }
      
      const newNote = await Note.create({
        title,
        content
      });
      
      res.status(201).json({
        status: 'success',
        data: {
          note: newNote
        }
      });
    } catch (error) {
      next(error);
    }
  };

    // Update a note
    export const updateNote = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        try {
          const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
          });
          
          if (!note) {
            return next(new NotFoundError(`Note with ID ${req.params.id} not found`));
          }
          
          res.status(200).json({
            status: 'success',
            data: {
              note
            }
          });
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
      const note = await Note.findByIdAndDelete(req.params.id);
      
      if (!note) {
        return next(new NotFoundError(`Note with ID ${req.params.id} not found`));
      }
      
      res.status(204).json({
        status: 'success',
        data: null
      });
    } catch (error) {
      next(error);
    }
  };
// export default class NoteController {
//     private noteService: NoteService;

//     constructor (){
//         this.noteService = new NoteService();
//     }
//     async getNote(req: Request, res: Response){
//         try{
//             const getNote = await this.noteService.getNote(req.params.id);
//             if(!getNote){
//                 res.status(404).json("Request was not found");
//             } else {
//                 res.json(getNote);
//             }
//         } catch (error) {
//             res.status(500).json(error);
//         }
//     }

//     async getNotes(req: Request, res: Response){
//         try{
//             const notes = await this.noteService.getNotes();

//             res.json(notes);
//         } catch(error){
//             res.status(500).json( {error});
//         }
//     }

//     async createNote(req: Request, res: Response){
//         try{
//             const note = await this.noteService.createNote(req.body)
//             res.status(201).json(note)
//         } catch (error){
//             res.status(500).json(error)
//         }

//     }

//     async updateNote(req: Request, res: Response){
//         try{
//             const updateNote = await this.noteService.updateNote(req.params.id, req.body);
//             if (!updateNote){
//                 res.status(404).json("File not found");
//             } else {
//                 res.json(updateNote);
//             }
//         } catch (error){
//             res.status(500).json(error)
//         }
//     }

//     async deleteNote(req: Request, res: Response){
//         try {
//             const deleteNote = await this.noteService.deleteNote(req.params.id);
//             if (!deleteNote){
//                 res.status(404).json("File does not exist");
//             } else {
//                 res.status(204).send();

//             }
//         } catch (error) {
//             res.status(500).json(error)
//         }
//     }

// }
// export const noteController = new NoteController();