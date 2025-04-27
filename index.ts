import apiRouter from "./src/routes";
import connectionDB from "./src/connection/connection"

const express = require("express")
const morgan = require("morgan");
const cors = require("cors");

const app = express(); 
const port = 3000; 


app.use(cors({ origin:true }));
app.use(morgan("dev"));
app.use(express.json());

app.use('/api',apiRouter)

async function main() {
  await connectionDB();
  app.listen(port, () => {
    console.log(`App usando el puerto ${port}`);
  });
}

main(); 
