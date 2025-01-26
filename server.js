const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Bellekte saklanacak örnek kullanıcılar
let users = [
    { id: 1, name: "Ahmet", email: "ahmet@example.com" },
    { id: 2, name: "Ayşe", email: "ayse@example.com" }
];

// 1. Kullanıcıları listeleme
app.get('/users', (req, res) => {
    res.json(users);
});

// 2. Yeni kullanıcı ekleme
app.post('/users', (req, res) => {
    const { id, name, email } = req.body;

    // Aynı ID'de kullanıcı varsa hata döndür
    if (users.find(user => user.id === id)) {
        return res.status(400).json({ message: "Bu ID'ye sahip kullanıcı zaten var" });
    }

    const newUser = { id, name, email };
    users.push(newUser);
    res.status(201).json({ message: "Kullanıcı eklendi", user: newUser });
});

// 3. Kullanıcı bilgilerini güncelleme
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = users.find(user => user.id == id);

    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
        res.json({ message: "Kullanıcı güncellendi", user });
    } else {
        res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }
});

// 4. Kullanıcı silme
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const userIndex = users.findIndex(user => user.id == id);

    if (userIndex !== -1) {
        const removedUser = users.splice(userIndex, 1);
        res.json({ message: "Kullanıcı silindi", user: removedUser });
    } else {
        res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }
});

// Sunucuyu başlat
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} üzerinde çalışıyor`);
});
