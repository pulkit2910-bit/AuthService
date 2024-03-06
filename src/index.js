const express = require('express');
const { PORT } = require('./config/server_config');

const setupAndStartServer = async () => {
    const app = express();

    app.use(express.json());

    app.listen(PORT, ()=> {
        console.log('Server started at', PORT);
    })
}

setupAndStartServer();