const express = require('express');
const app = express();
const cors = require('cors');
const {CLIENT_ORIGIN, PORT}= require('./config')





app.get('/api/*', (req, res) => {
  res.json({ok:true});
});

app.use(
  cors({
      origin: CLIENT_ORIGIN
  })
);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

module.exports= {app};