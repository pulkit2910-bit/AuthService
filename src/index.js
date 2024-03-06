const express = require('express');
const { PORT } = require('./config/server_config');

const apiRoutes = require("./routes/index");

const setupAndStartServer = async () => {
    const app = express();

    app.use(express.json());

    app.use("/api", apiRoutes);

    app.listen(PORT, ()=> {
        console.log('Server started at', PORT);
    })
}

setupAndStartServer();