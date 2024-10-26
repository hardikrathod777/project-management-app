// app.mjs
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/userRoute.js';
import projectRoutes from './routes/projectRoute.js'; 

dotenv.config(); 

const app = express();

app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173' 
}));
app.use(express.json()); 


app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);


const PORT = process.env.PORT || 5000; 
app.listen(PORT, async () => {
    await connectDB(); 
    console.log(`Server Starting On http://localhost:${PORT}`);
});
