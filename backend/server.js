const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

app.use(cors());

dotenv.config({ path: "./.env" });

require("./db/conn");

app.use(express.json());

app.use(require("./routes/auth"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});