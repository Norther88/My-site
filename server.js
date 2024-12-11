const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Настройка Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Или используйте SMTP вашего почтового провайдера
    auth: {
        user: process.env.EMAIL, // Почта отправителя
        pass: process.env.PASSWORD, // Пароль или App Password
    },
});

// Обработка маршрута
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'vaedev1291@gmail.com',
        subject: `Новое сообщение от ${name}`,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Ошибка при отправке письма');
        }
        res.status(200).send('Письмо успешно отправлено');
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
