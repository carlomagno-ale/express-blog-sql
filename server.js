const express = require('express')
const app = express();

const cors = require("cors");

const port = 3000;
const postsRouter = require('./routers/posts')

// middleware per il CORS
app.use(cors({
    origin: 'http://localhost:5173'
}));

const serverError = require("./middlewares/serverError");
const notFound = require("./middlewares/404_notFound");

app.use(express.static('images'));
app.use(express.json());

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

app.use('/api/v1/posts', postsRouter)

app.use(serverError)
app.use(notFound)
