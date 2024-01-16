const database = require("./database.js");
const express = require("express");
const app = express();
const port = 3000;

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.get('/', (req, res)  => {
    res.send("Hello Chuka");
});

app.post('/api/login', (req, res) => {
    let hasAunthenticatedUser = false;

    for(let i = 0; i < database.users.length; i++){

        const userToCheck = database.users[i];

        if (req.body.name === userToCheck.username && req.body.password === userToCheck.password) {
            res.send("AUTHENTICATED!!!");
            break;
        }
    }
    if (hasAunthenticatedUser){
        res.send("AUTHENTICATION FAILED!!!")
    }
})

app.listen(port, () => {
    console.log(`This server is running on ${port}`)
});