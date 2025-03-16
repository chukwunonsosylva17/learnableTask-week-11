import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";
import { validateCategory } from "../middleware/categoryValidation.middleware";
import { validateIdParam } from "../middleware/idCategoryValidation.middleware"; // New middleware for ID validation

const router = express.Router();

// Category Routes
router.post("/", validateCategory, createCategory); // Validate category body before creation
router.get("/", getAllCategories);
router.get("/:id", validateIdParam, getCategoryById); // Validate ID before fetching category
router.put("/:id", validateIdParam, validateCategory, updateCategory); // Validate both ID and body
router.delete("/:id", validateIdParam, deleteCategory); // Validate ID before deletion

export default router;





// // src/routes/notes.ts
// import express from 'express';
// import { noteRoutes } from '../controllers/note.controllers';
// import * noteController  from '../controllers/note.controllers';
// import { noteSchema, updateNoteSchema } from '../validations/schemas';
// import { validate } from '../middleware/validation';

// interface NoteRoute {
//   method: string;
//   path: string;
//   middleware?: express.RequestHandler[];
//   handler: express.RequestHandler;
// }

// const router = express.Router();

// noteRoutes.forEach((route: NoteRoute) => {
//   const method = route.method as 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
//   if (router[method]) {
//     router[method](
//       route.path,
//       ...(route.middleware || []),
//       route.handler
//     );
//   } else {
//     console.error(`Unsupported HTTP method: ${method}`);
//   }
// });

// router.post(
//   '/',
//   validate(noteSchema),
//   notesController.createNote
// );

// router.put(
//   '/:id',
//   validate(updateNoteSchema),
//   notesController.updateNote
// );

// export default router;

