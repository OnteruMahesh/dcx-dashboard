const express = require('express');
const dbConn = require('./database/db.conn');
const app = express();
const cors = require('cors');
const port = 8080;
const userRoutes = require('./routes/user');
const pageRoutes = require('./routes/page');
const categoriesRoutes = require('./routes/category');

app.use(cors());
app.use(express.json());
dbConn();

app.get('/',(req,res)=>{
  res.end("Hello world");
})

app.use('/user',userRoutes);
app.use('/page',pageRoutes);
app.use('/category',categoriesRoutes);

app.listen(port,()=>{
    console.log(`Server is live at : http://localhost/`+port)
})
