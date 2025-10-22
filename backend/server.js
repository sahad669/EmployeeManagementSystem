import express from "express";
import dotenv from "dotenv";
import connect from "./config/connectDB.js"
import cors from "cors";
import departmentRouter from './routes/departmentRouter.js'
import userRouter from "./routes/userRouter.js"
import attendanceRouter from "./routes/attendanceRouter.js"
import upload from "./middleware/multer.js";
import contactRouter from "./routes/contactRouter.js"
import OpenAI from 'openai'
dotenv.config();
const app = express();
app.use(express.json());
// app.use(cors({origin:"https://employee-management-system-eight-sigma.vercel.app/"}));
app.use(cors())

const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chat',async(req,res)=>{
  try {
    const{ message} = req.body
    const response = await openAi.chat.completions.create({
      model:"gpt-4o-mini",
     messages: [{ role: "user", content: message }]
    })
    res.json({reply:response.choices[0].message.content})
  } catch (error) {
      res.json({error:"Request not fulfilled"})
  }
})


app.use("/api/department",departmentRouter)
app.use("/api/users",userRouter)
app.use("/api/attendance",attendanceRouter)
app.use ("/api/contact",contactRouter)

connect();
app.listen(process.env.PORT, () => {
  console.log("server started");
});


app.post("/employee-image", upload.single("image"), (req, res) => {
  try {
    res.json({
      success: true,
      url: req.file.path,       
      public_id: req.file.filename, 
    });
  } catch (error) {
    console.error("Upload error", error);
    res.status(500).json({ success: false, error: "Upload failed" });
  }
});