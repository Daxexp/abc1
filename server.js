const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config(); // To use environment variables from a .env file

const app = express();
const port = process.env.PORT || 3000;

// Use environment variables for sensitive data
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.use(bodyParser.json());

app.post('/location', async (req, res) => {
    const { latitude, longitude } = req.body;

    const mapUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=13/${latitude}/${longitude}`;

    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: `Live Location: ${mapUrl}`
        });
        res.status(200).send('Location sent to Telegram');
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
        res.status(500).send('Error sending message to Telegram');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});