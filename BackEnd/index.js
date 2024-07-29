import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import EmployeeRouter from './Routes/employeeRoute.js';
import UserRouter  from './Routes/userRoute.js';
import { fileURLToPath } from 'url';



const port=4000;
const app=express();

dotenv.config();

app.use(cookieParser());
app.use(cors());

app.use(express.json());



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose
  .connect('mongodb+srv://shelakesayali9022:employeeManagement123@cluster0.qjt455y.mongodb.net/employeeDb')
  .then(() => {
    console.log("successfully connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });



app.get('/',(req,res)=>{
    res.send("app is running")
})

const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
app.use('/api/employee',EmployeeRouter);
app.use('/api/user',UserRouter);

app.listen(4000,()=>{
    console.log(`server is running on ${port}`)
})