import 'dotenv/config';
import express from "express";
import cors from "cors";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import shippingRouter from "./routes/shippingRoute.js";

const app = express();
const port = process.env.PORT || 4000;
connectDb();
connectCloudinary()
app.use(cors());
app.use(express.json());
app.use("/api/shipping", shippingRouter);

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.get("/", (req, res) => {
  res.send("API working");
});


app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
