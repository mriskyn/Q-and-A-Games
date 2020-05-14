const express = require('express');
const router = require('./routes');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json())
app.use(express.urlencoded( { extended: true }));

app.use(router);


app.listen(PORT, () => console.log('Listening on port:', PORT));