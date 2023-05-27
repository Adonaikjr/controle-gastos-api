import express from "express";
import  {routes}  from "./src/routes";
import cors from "cors";
const app = express();
const PORT = 3333;
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`server is running 🚀 ${PORT}`);
});
