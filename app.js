const express = require("express");
const database = require("./database.js");
const cookieParser = require('cookie-parser');
const path = require('path')
const app = express();
const port = 3000;

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.get('/', (req, res)  => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'landing-page.html'));
});

app.get('/dashboard', (req, res) => {

    if (req.cookies.sessionToken){
        res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
    } else {
        res.redirect('/login');
        res.sendStatus(401);
    }
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
})


app.post('/api/login', (req, res) => {
    let hasAunthenticatedUser = false;
    for(let i = 0; i < database.users.length; i++){

        const userToCheck = database.users[i];
        // res.sendFile(path.join(__dirname, 'public', 'dashboard.html'))

        if (req.body.username === userToCheck.username && req.body.password === userToCheck.password) {
            // creates unique for session token login attempt
            const sessionToken = `${userToCheck.username}_${Date.now()}`;
            res.send(sessionToken)
            hasAunthenticatedUser = true;
            break;
        }
    }
    if (!hasAunthenticatedUser){
        res.sendStatus(401)
    }
})


app.get('/api/:username/city', (req, res) => {
    const username = req.params.username;
    const foundUser = database.users.find(user => user.username === username);

    if (!foundUser) {
        res.sendStatus(404);
        return;
    }

    res.send(foundUser.city);
});
app.get('/api/:username/profile-picture-path', (req, res) => {
    const username = req.params.username;
    const foundUser = database.users.find(user => user.username === username);

    if (!foundUser) {
        res.sendStatus(404);
        return;
    }

    res.send(foundUser.profilePicture);
});
app.listen(port, () => {
    console.log(`This server is running on ${port}`)
});
