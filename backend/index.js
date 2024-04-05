// const express = require('express');
// const app = express();
// const port = 5000;

// const mongoDB = require('./server');

// mongoDB();

// // CORS middleware
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     // Handling preflight requests
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//         return res.status(200).json({});
//     }
//     next();
// });

// app.use(express.json());

// app.use('/api', require("./routes/CreateUser"));
// app.use('/api', require("./routes/DisplayData"));
// app.use('/api', require("./routes/OrderData"));

// app.get('/', (req, res) => {
//     res.send("Hello World!");
// });

// app.listen(port, () => {
//     console.log(`Listening to port: ${port}`);
// });


const express = require('express');
const app = express();
const port = 5000;

const mongoDB = require('./server');

mongoDB();

// const axios = require('axios');

// CORS middleware
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://cravecraz.onrender.com");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    // Handling preflight requests
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use(express.json());

app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/DisplayData"));
app.use('/api', require("./routes/OrderData"));

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
});
