import express from 'express';
import { createCrisis } from '../app/controllers/CrisesController.js';
import multer from 'multer';
import path from 'path';


// Set up multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), 'app/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

const upload = multer({ storage });
const router = express.Router();

// Add crisis route (using multer middleware to handle file upload)
router.post('/crises', upload.single('image'), createCrisis);

export default router;
