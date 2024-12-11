import express, { json } from "express";
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.get('/', (req, res) => {

})

app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
})