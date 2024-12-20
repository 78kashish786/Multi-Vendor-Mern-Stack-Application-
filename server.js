import  express  from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'

import connectDB from './config/db.js';
import  authRoutes from './routes/authRoute.js'
import categoryRoute from "./routes/categoryRoute.js"
import productRoute from "./routes/productRoute.js"
const app = express();

dotenv.config();

//databse config

connectDB();

//middleware
app.use(cors({ origin: 'https://multi-vendor-mern-stack-application-zlxu.vercel.app', 
              methods: ['POST', 'GET', 'PUT', 'DELETE'],
              allowedHeaders: ['Content-Type', 'Authorization'] 
             }));


app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);


//restapis

app.get('/',(req,res)=>{
    res.send(
        "<h1>Welcome to ecommerce app</h1>"
    )

})

const PORT = process.env.PORT || 8000;
app.use(express.static("./client/build"));

app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname, "client","build","index.html"))
});
//run listen

app.listen(PORT, ()=>{
    console.log(`Server running ${process.env.DEV_MODE} mode on  ${PORT}`.bgMagenta.white)
})
