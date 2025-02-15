const express = require('express');

const { PORT } = require('./config/server_config');

const apiRoutes = require("./routes/index");

const db = require("./models/index")

const setupAndStartServer = async () => {
    db.sequelize.sync()
    .then(() => {
        console.log("Synced db");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

    const app = express();

    app.use(express.json());

    app.use("/api", apiRoutes);
    
    app.listen(PORT, ()=> {
        console.log('Server started at', PORT);
    })
}

setupAndStartServer();