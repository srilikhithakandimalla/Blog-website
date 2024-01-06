const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.render('index', { posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/newpost', (req, res) => {
    res.render('newpost');
});

app.post('/addpost', async (req, res) => {
    try {
        const { title, content } = req.body;

        const newPost = new Post({ title, content });
        await newPost.save();

        res.redirect('/');
    } catch (error) {
        console.error('Error adding post:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});