import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import uploadRoute from './routes/uploadRoute.js'
import cors from 'cors'
import { upload } from './middlewares/uploadMiddleware.js';


dotenv.config();

connectDB();

const app = express()

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//ROUTES
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);
app.use('/api', uploadRoute);


app.get("/",(req,res) => {
    res.send(`<h1>server running on port ${PORT}</h1>`)
})

const PORT = process.env.PORT || 5174


app.listen(PORT, () => {
    console.log("welcome:", PORT);
    
}
)