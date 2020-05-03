const express = require('express');
const cors = require('cors');
const query = require('./db');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '200mb', extended: true}));

app.post('/user', async (req, res) => {
    try {
        const {name, photo, salary, designation } = req.body;
        await query("INSERT INTO user_management.user (name, photo, salary, designation) VALUES(?, ?, ?, ?)", [name, photo, salary, designation]);
        const newUser = await query("SELECT LAST_INSERT_ID()");
        const user = await query("SELECT * FROM user_management.user WHERE id = ?", [newUser[0]['LAST_INSERT_ID()']]);
        res.json(user[0])
    } catch(err) {
        console.log(err)
    }
});

app.get('/user', async (req, res) => {
    try {
        const newUser = await query("SELECT * FROM user_management.user");
        let response = res.json(newUser);
        response = response.map( e => {
            e.photo = e.photo.toString('base64');
            return e
        });
        return response
    } catch(err) {
        console.log(err)
    }
});


app.get('/user/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await query("SELECT * FROM user_management.user WHERE id = ?", [id]);
        res.json(user[0])
    } catch(err) {
        console.log(err)
    }
});

app.put('/user', async (req, res) => {
    try {
        const {id, name, photo, salary, designation } = req.body;
        await query("UPDATE user_management.user SET name = ?, photo = ?, salary = ?, designation = ? WHERE id = ?", [name, photo, salary, designation, Number(id)]);
        const user = await query("SELECT * FROM user_management.user WHERE id = ?", [id]);
        res.json(user[0])
    } catch(err) {
        console.log(err)
    }
});

app.delete('/user/:id', async (req, res) => {

    try {
        const {id} = req.params;
        const user = await query("DELETE FROM user_management.user WHERE id = ?", [id]);
        res.json(user[0])
    } catch(err) {
        console.log(err)
    }
});

app.listen(port, () => {
    console.log('Server running...'+ port)
});