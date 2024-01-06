const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/developerRegistration', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const app = express();
app.use(bodyParser.json());

const developerSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const Developer = mongoose.model('Developer', developerSchema);

app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newDeveloper = new Developer({ username, email, password });
        await newDeveloper.save();
        res.json({ message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});