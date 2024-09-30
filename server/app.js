import express from 'express';
import router from './routes/api.js';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import reportRoutes from './routes/reportRoutes.js';
import mongoose from 'mongoose';
import path from "path";
import CrisisRoutes from "./routes/CrisisRoutes.js";

import {
    DATABASE_URL,
    MAX_JSON_SIZE,
    PORT,
    REQUEST_NUMBER,
    REQUEST_TIME,
    URL_ENCODE,
    WEB_CACHE
} from './app/config/config.js';




const app = express();

// Enable CORS for your frontend
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD',
    credentials: true

}));

// App use default middlewares
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(helmet());



// App use limiter
const limiter = rateLimit({windowMs: REQUEST_TIME, max:REQUEST_NUMBER})
app.use(limiter);

//Cache
app.set('etag', WEB_CACHE);

// Database connection
mongoose.connect(DATABASE_URL, {autoIndex:true}).then(()=>{
    console.log("MongoDB Connected");
}).catch((err)=>{
    console.log('MongoDB Disconnected',err);
})


// API routes
app.use('/api', router);
app.use('/api', CrisisRoutes);
app.use('/api/reports', reportRoutes);

app.use('/uploads',express.static('uploads'));

app.get('/uploads/:image', (req, res) => {
    res.sendFile(__dirname + req.params.image);
})
//app.use('/uploads', express.static(path.join(process.cwd(), 'app/uploads')));

// Static file serving with compression
// app.get('/uploads/:image', (req, res) => {
//     const imagePath = path.join(process.cwd(), 'app/uploads', req.params.image);
//
//     // Dynamically set the Content-Type based on the file extension
//     const ext = path.extname(req.params.image).toLowerCase();
//     let contentType = 'image/jpeg'; // default to jpeg
//
//     if (ext === '.png') {
//         contentType = 'image/png';
//     } else if (ext === '.gif') {
//         contentType = 'image/gif';
//     }
//
//     const options = {
//         root: path.join(process.cwd(), 'app/uploads'),
//         headers: {
//             'Content-Type': contentType,
//         }
//     };
//
//     res.sendFile(req.params.image, options, (err) => {
//         if (err) {
//             res.status(err.status).end();
//         }
//     });
// });




app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});