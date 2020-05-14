const express = require('express');
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded( { extended: true }));

const app = express();

app.listen(PORT, () => console.log('Listening on port:', PORT));