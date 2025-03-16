import express from 'express';
import { getIndex } from '../controllers/index.controller';
import categoriesRouter from '../routes/category.routes';
import noteRouter from '../routes/note.route';

const router = express.Router();

router.get('/', getIndex);
router.get('/api/categories', categoriesRouter)
router.get("/api/notes", noteRouter);



export default router;