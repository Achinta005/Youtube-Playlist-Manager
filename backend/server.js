const express = require('express')
const app = express()
const port = 3001;
const youtubeRoutes=require('./routes/youtube')
const cors=require('cors');
require('dotenv').config();

app.use(cors({
  origin:"http://localhost:3000"
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/youtube',youtubeRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
