const database = require("./database.js");
const express = require("express");
const path = require('path')
const app = express();
const port = 3000;

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.get('/', (req, res)  => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'landing-page.html'));
});


app.post('/api/login', (req, res) => {
    let hasAunthenticatedUser = false;
    for(let i = 0; i < database.users.length; i++){

        const userToCheck = database.users[i];

        if (req.body.name === userToCheck.username && req.body.password === userToCheck.password) {
            // creates unique for session token login attempt
            const sessionToken = `${userToCheck.username}_${Date.now()}`;

            res.send(sessionToken);
            hasAunthenticatedUser = true;
            break;
        }
    }
    if (hasAunthenticatedUser === false){
        res.sendStatus(401)
    }
})

app.listen(port, () => {
    console.log(`This server is running on ${port}`)
});