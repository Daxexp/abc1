// JavaScript code to create the HTML structure dynamically

// Create and append the <head> section
const head = document.head;

const metaCharset = document.createElement('meta');
metaCharset.setAttribute('charset', 'UTF-8');
head.appendChild(metaCharset);

const metaViewport = document.createElement('meta');
metaViewport.setAttribute('name', 'viewport');
metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
head.appendChild(metaViewport);

const title = document.createElement('title');
title.textContent = 'TV Channels';
head.appendChild(title);

const style = document.createElement('style');
style.textContent = `
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #121212;
        color: #ffffff;
        transition: background-color 0.5s ease, color 0.5s ease;
        overflow-x: hidden; /* Prevent horizontal scrolling */
        user-select: none; /* Disable text selection */
    }

    .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        padding-top: 60px; /* Add padding to avoid content being hidden behind the bar */
    }

    .bar {
        width: 100%;
        background-color: #ffffff;
        color: #121212;
        border-bottom: 2px solid #ff0000;
        padding: 10px 0;
        text-align: center;
        font-size: 1.5rem;
        font-weight: bold;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        transition: background-color 0.5s ease, color 0.5s ease;
    }

    .theme-toggle {
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .theme-toggle input {
        display: none;
    }

    .switch {
        display: inline-block;
        width: 60px;
        height: 34px;
        background-color: #ccc;
        border-radius: 34px;
        position: relative;
        transition: background-color 0.3s;
    }

    .switch::before {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 30px;
        height: 30px;
        background-color: #ffffff;
        border-radius: 50%;
        transition: transform 0.3s;
    }

    input:checked + .switch {
        background-color: #4CAF50;
    }

    input:checked + .switch::before {
        transform: translateX(26px);
    }

    .emoji {
        margin-left: 10px;
        font-size: 24px;
    }

    .channels {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
    }

    .channel {
        background-color: #1e1e1e;
        border-radius: 10px;
        overflow: hidden;
        width: 200px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        position: relative;
    }

    .channel:hover {
        transform: scale(1.08);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }

    .channel img {
        width: 100%;
        height: auto;
    }

    .channel h2 {
        margin: 10px 0;
    }

    .channel .play-button {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        background: rgba(255, 0, 0, 0.7);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        color: white;
        font-size: 24px;
        line-height: 50px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        transition: opacity 0.5s, transform 0.5s, box-shadow 0.5s;
        opacity: 0;
    }

    .channel:hover .play-button {
        display: block;
        transform: translate(-50%, -50%) scale(1.1);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
        opacity: 1;
    }

    .footer {
        text-align: center;
        padding: 20px 0;
        margin-top: 20px;
    }

    .footer p {
        margin: 0;
    }

    .player-section {
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.8);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
    }

    .back-button {
        position: absolute;
        top: 20px;
        left: 20px;
        background-color: #ffffff;
        color: #121212;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        transition: background-color 0.3s, color 0.3s;
    }

    .back-button:hover {
        background-color: #ff0000;
        color: #ffffff;
    }

    .player {
        width: 80%;
        max-width: 800px;
        height: 450px;
        background-color: #000;
    }

    /* Light mode styles */
    .light-mode {
        background-color: #f0f0f0 !important;
        color: #333 !important;
    }

    .light-mode .container {
        background-color: transparent;
    }

    .light-mode .bar {
        background-color: #000000;
        color: #ffffff;
    }

    .light-mode .channel {
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .light-mode .channel:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .light-mode .footer {
        color: #666;
    }

    .light-mode .theme-toggle .switch {
        background-color: #ccc;
    }

    .light-mode .theme-toggle input:checked + .switch {
        background-color: #4CAF50;
    }

    .light-mode .theme-toggle input:checked + .switch::before {
        background-color: #ffffff;
    }

    .light-mode .player-section {
        background-color: rgba(255, 255, 255, 0.8);
    }

    .light-mode .back-button {
        background-color: #000000;
        color: #ffffff;
    }

    .light-mode .back-button:hover {
        background-color: #ff0000;
        color: #ffffff;
    }

    /* Responsive styles */
    @media (max-width: 768px) {
        .channel {
            width: 45%;
        }

        .player {
            width: 95%;
            height: auto;
        }

        .back-button {
            width: 80px;
            font-size: 14px;
            padding: 8px 16px;
        }
    }

    @media (max-width: 480px) {
        .channel {
            width: 100px; /* Smaller tiles for mobile view */
        }

        .channel h2 {
            font-size: 14px; /* Smaller font size for channel names */
        }

        .channel .play-button {
            width: 30px; /* Smaller play button for mobile view */
            height: 30px;
            font-size: 16px;
            line-height: 30px;
        }

        .player {
            width: 100%;
            height: auto;
        }

        .back-button {
            width: 60px;
            font-size: 12px;
            padding: 6px 12px;
        }

        .bar {
            font-size: 1.2rem;
        }

        .switch {
            width: 40px; /* Smaller switch for mobile view */
            height: 20px;
        }

        .switch::before {
            width: 18px;
            height: 18px;
        }

        .emoji {
            font-size: 18px; /* Smaller emoji for mobile view */
            margin-left: 5px; /* Adjust margin for better alignment */
        }
    }
`;
head.appendChild(style);

// Create and append the <body> section
const body = document.body;

const bar = document.createElement('div');
bar.className = 'bar';
bar.textContent = 'TV Channels';

const themeToggle = document.createElement('div');
themeToggle.className = 'theme-toggle';

const themeSwitch = document.createElement('input');
themeSwitch.type = 'checkbox';
themeSwitch.id = 'theme-switch';
themeSwitch.addEventListener('change', toggleTheme);
themeToggle.appendChild(themeSwitch);

const themeSwitchLabel = document.createElement('label');
themeSwitchLabel.className = 'switch';
themeSwitchLabel.htmlFor = 'theme-switch';
themeToggle.appendChild(themeSwitchLabel);

const emoji = document.createElement('span');
emoji.className = 'emoji';
emoji.textContent = '🌙';
themeToggle.appendChild(emoji);

bar.appendChild(themeToggle);
body.appendChild(bar);

const container = document.createElement('div');
container.className = 'container';

const channelsDiv = document.createElement('div');
channelsDiv.className = 'channels';

const channels = {
    "TV Derana": "https://edge2-moblive.yuppcdn.net/transhd2/smil:detv04.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToyMzozMCBBTSZoYXNoX3ZhbHVlPXN0aU85Umg2R1ZCMzZ0Y0lkVStmZ0E9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfNF8tMSZzdHJtX2xlbj0yNQ==",
    "Sirasa TV": "https://edge3-moblive.yuppcdn.net/transsd/smil:sirtv09.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToxMzo1MyBBTSZoYXNoX3ZhbHVlPWxTdVZPMHpONjVtTHkzTS9MWjkvUEE9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfOV8tMSZzdHJtX2xlbj0yNQ==",
    "Hiru TV": "https://edge2-moblive.yuppcdn.net/transhd2/smil:hitv17.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToxNzo0MiBBTSZoYXNoX3ZhbHVlPWF2aHYvSjRsOWFxYTg0Tkt2RENnM3c9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfMTdfLTEmc3RybV9sZW49MjU=",
};

function createChannel(channelKey, channelLogo, channelName) {
    const channel = document.createElement('div');
    channel.className = 'channel';
    channel.setAttribute('data-key', channelKey);

    const img = document.createElement('img');
    img.src = channelLogo;
    img.alt = `${channelName} Logo`;
    channel.appendChild(img);

    const h2 = document.createElement('h2');
    h2.textContent = channelName;
    channel.appendChild(h2);

    const button = document.createElement('button');
    button.className = 'play-button';
    button.textContent = '▶';
    button.addEventListener('click', () => playChannel(channelKey));
    channel.appendChild(button);

    return channel;
}

channelsDiv.appendChild(createChannel('TV Derana', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/derana.png', 'TV Derana'));
channelsDiv.appendChild(createChannel('Sirasa TV', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/ucihva.png', 'Sirasa TV'));
channelsDiv.appendChild(createChannel('Hiru TV', 'https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/hiru-tv.png', 'Hiru TV'));

container.appendChild(channelsDiv);
body.appendChild(container);

const footer = document.createElement('div');
footer.className = 'footer';

const footerP = document.createElement('p');
footerP.innerHTML = '&copy; 2k25 TV Channels. All rights reserved.';
footer.appendChild(footerP);
body.appendChild(footer);

function toggleTheme() {
    const body = document.body;
    const emoji = document.querySelector('.theme-toggle .emoji');
    const isLightMode = document.getElementById('theme-switch').checked;
    if (isLightMode) {
        body.classList.add('light-mode');
        emoji.textContent = '☀️';
    } else {
        body.classList.remove('light-mode');
        emoji.textContent = '🌙';
    }
}

function encodeStreamURL(url) {
    return btoa(url);
}

function decodeStreamURL(encodedUrl) {
    return atob(encodedUrl);
}

function playChannel(channelKey) {
    const channelName = document.querySelector(`.channel[data-key="${channelKey}"] h2`).textContent;
    const streamURL = channels[channelKey];
    const encodedStreamURL = encodeStreamURL(streamURL);
    window.location.href = `player.html?channel=${encodeURIComponent(channelName)}&stream=${encodeURIComponent(encodedStreamURL)}`;
}

// Decode the stream URL when loading the player page
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedStreamURL = urlParams.get('stream');
    if (encodedStreamURL) {
        const streamURL = decodeStreamURL(encodedStreamURL);
        document.getElementById('streamSource').src = streamURL;
    }
});
