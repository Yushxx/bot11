const TelegramBot = require('node-telegram-bot-api');
const token = '6319635612:AAEiYjpMty-VqmKgkhAK9nRQRkhcPFwvdJo'; // Remplacez VOTRE_TOKEN par votre token API Telegram
const bot = new TelegramBot(token, { polling: true });

// Fonction pour générer un multiplicateur aléatoire selon les règles spécifiées
function generateMultiplier() {
    const random = Math.random();
    if (random < 0.5) {
        return (Math.random() * (2 - 1.55) + 1.55).toFixed(2);
    } else if (random < 0.65) {
        return (Math.random() * (2.99 - 2) + 2).toFixed(2);
    } else {
        return (Math.random() * (1.49 - 1.22) + 1.22).toFixed(2);
    }
}

// Fonction pour envoyer les prédictions au canal à des intervalles spécifiques
function sendPredictions() {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();

    if ((hour >= 20 && hour <= 23 && minute % 10 === 0) ||
        (hour >= 0 && hour < 8 && minute % 15 === 0)) {
        
        const multiplier = generateMultiplier();
        const message = `📱 Site : 👉 [Cliquez ici pour jouer](https://1wnurc.com/v3/lucky-jet-updated#2x3m) 👈\n` +
                        `🎯 Entrée confirmée ! 🎯\n` +
                        `💰 Récupérez gain à code : ${multiplier}\n` +
                        `⏳ ... il reste 10 minutes !\n` +
                        `✅ 💸 [Cliquez ici pour ouvrir la plateforme](https://1wnurc.com/v3/lucky-jet-updated#2x3m)\n` +
                        `🚀 [Tutoriel](https://t.me/jetluckysolkah/2)`;

        bot.sendMessage('@jetluckysolkah', message, { parse_mode: 'Markdown', disable_web_page_preview: true });
    }
}

// Handler pour la commande /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Salut admin', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Test', callback_data: 'test' }],
                [{ text: 'Générer signal', callback_data: 'generate_signal' }]
            ]
        }
    });
});

// Handler pour les boutons inline
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    if (data === 'test') {
        const multiplier = generateMultiplier();
        const message = `📱 Site : 👉 [Cliquez ici pour jouer](https://1wnurc.com/v3/lucky-jet-updated#2x3m) 👈\n` +
                        `🎯 Entrée confirmée ! 🎯\n` +
                        `💰 Récupérez gain à code : ${multiplier}\n` +
                        `⏳ ... il reste 10 minutes !\n` +
                        `✅ 💸 [Cliquez ici pour ouvrir la plateforme](https://1wnurc.com/v3/lucky-jet-updated#2x3m)\n` +
                        `🚀 [Tutoriel](https://t.me/jetluckysolkah/2)`;
        bot.sendMessage('@jetluckysolkah', message);
    } else if (data === 'generate_signal') {
        const multiplier = generateMultiplier();
        const message = `📱 Site : 👉 [Cliquez ici pour jouer](https://1wnurc.com/v3/lucky-jet-updated#2x3m) 👈\n` +
                        `🎯 Entrée confirmée ! 🎯\n` +
                        `💰 Retrait a : ${multiplier}\n` +
                        `⏳ ... il reste 10 minutes !\n` +

                        `✅ 💸 [Cliquez ici pour ouvrir la plateforme](https://1wnurc.com/v3/lucky-jet-updated#2x3m)\n` +
                        
`🚀 [Tutoriel](https://t.me/jetluckysolkah/2)`;
        bot.sendMessage(chatId, message, { parse_mode: 'Markdown', disable_web_page_preview: true });
    }
});

// Démarre l'envoi des prédictions toutes les minutes
setInterval(sendPredictions, 60000);
