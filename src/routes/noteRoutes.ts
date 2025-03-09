import { Router } from "express";
import {
     getAllNotes,
     getNoteById,
     createNote,
     updateNote,
     deleteNote
}
     from '../controllers/noteControllers';

const router = Router();

router.route("/").get(getAllNotes).post(createNote);
router.route("/:id").get(getNoteById).put(updateNote).delete(deleteNote);

export default router;


