const express = require('express');
const dotenv = require('dotenv');
const  cors = require('cors');
const path = require('path');

dotenv.config();
const bodyParser = require('body-parser');
const Router = require("./routers/userdataroutes")
const Router2 =require("./routers/organizationRoutes");
const app = express();



// middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/",Router2)
app.use('/api',Router)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
