require('dotenv').config();

const express = require('express')
const cors = require('cors')
const router = require("./src/routes")
const app = express();

const port = 5000;
app.use(express.json())
app.use(cors());
app.use('/api/v1', router);
// app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.listen(port, () => console.log(`Listening on port ${port}`));