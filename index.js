const express = require("express");
const path = require("path")
const app = express();
const helmet = require("helmet");
const cookieparser = require("cookie-parser");
var cors = require("cors");

const configs = require("./configs.json");

const PORT = configs.PORT;
const HOST = configs.HOST;

app.use(helmet());
app.use(cookieparser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  };

app.use(cors(corsOptions))

app.get("/", (req,res) => {
    console.log('req.query:', req.query);
    console.log('req.cookies:', req.cookies);
    
    res.json({"root": "Homepage"});
});

app.get("/endpointGroups", (req, res) => {

    console.log('req.query:', req.query);
    console.log('req.cookies:', req.cookies);

    res.json(
        {"method": "endpointGroups",
        "query": req.query,
        "body": req.body
    })
})

app.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
});