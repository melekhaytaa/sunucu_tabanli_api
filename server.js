const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let posts = [];

// Blog yazılarını listeleme
app.get('/posts', (req, res) => {
    res.json(posts);
});

// Yeni bir blog yazısı ekleme
app.post('/posts', (req, res) => {
    const { id, title, content } = req.body;
    const newPost = { id, title, content };
    posts.push(newPost);
    res.status(201).json({ message: 'Blog yazısı eklendi', post: newPost });
});

// Blog yazısını güncelleme
app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = posts.find(p => p.id == id);

    if (post) {
        post.title = title;
        post.content = content;
        res.json({ message: 'Blog yazısı güncellendi', post });
    } else {
        res.status(404).json({ message: 'Blog yazısı bulunamadı' });
    }
});

// Blog yazısını silme
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    const postIndex = posts.findIndex(p => p.id == id);

    if (postIndex !== -1) {
        const removedPost = posts.splice(postIndex, 1);
        res.json({ message: 'Blog yazısı silindi', post: removedPost });
    } else {
        res.status(404).json({ message: 'Blog yazısı bulunamadı' });
    }
});

// Sunucuyu başlat
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} üzerinde çalışıyor`);
});
