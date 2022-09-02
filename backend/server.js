const app = require('./app.js');
const dotenv = require('dotenv');
const connectDatabase = require("./config/database.js");

//Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log((`Error: ${err.message}`));
    console.log(`Shutting down the server due to Unhandled uncaught exception`);
    process.exit(1);
})

//config
dotenv.config({ path: 'backend/config/config.env' });

//connecting to database
connectDatabase();

// console.log(hii); uncaught error

const server = app.listen(process.env.PORT, () => {
    console.log("server is running on port ", process.env.PORT);
});


//unhandled  promise rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled promise rejection`);

    server.close(() => {
        process.exit(1);
    });
})