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
    "TV Derana": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/derana.png",
    "Sirasa TV": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/ucihva.png",
    "Hiru TV": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/hiru-tv.png",
    "Swarnawahini": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/ddcjju.png",
    "ITN": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/ducchq.png",
    "Star TV": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/vztqoe.png",
    "Music TV": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/music-television.png",
    "SLT": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/twkwpt.png",
    "Pragna TV": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/pragna-tv.png",
    "Rupawahini": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/rupavahini.png",
    "Shardha TV": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/mvfdxj.png",
    "Jaya TV": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/ppkeyw.png",
    "Verbum TV": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/verbum-tv.png",
    "ChannelEye": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/fhuhab.png",
    "AdaDerana24x7": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/ada-derana-24.png",
    "TNL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdcQj9w0VyOAgD7wwyCze0adezDmRm2F6P0cmX22tNFOvXtO9X5gPJRZQ&usqp=CAE&s",
    "TV1": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/vjtiwc.png",
    "Shakthi TV": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/dmikwb.png",
    "Siyatha TV": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/twchnq.png",
    "Wasantham TV": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/ngfsik.png",
    "Charana TV": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/djwqoh.png",
    "Nethra TV": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/udbacm.png",
    "Buddhist TV": "https://mobond.yuppcdn.net/peotvgo/320/280/content/common/channel/logos/the-buddhist.png"
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

channelsDiv.appendChild(createChannel('TV Derana', channels["TV Derana"], 'TV Derana'));
channelsDiv.appendChild(createChannel('Sirasa TV', channels["Sirasa TV"], 'Sirasa TV'));
channelsDiv.appendChild(createChannel('Hiru TV', channels["Hiru TV"], 'Hiru TV'));
channelsDiv.appendChild(createChannel('Swarnawahini', channels["Swarnawahini"], 'Swarnawahini'));
channelsDiv.appendChild(createChannel('ITN', channels["ITN"], 'ITN'));
channelsDiv.appendChild(createChannel('Star TV', channels["Star TV"], 'Star TV'));
channelsDiv.appendChild(createChannel('Music TV', channels["Music TV"], 'Music TV'));
channelsDiv.appendChild(createChannel('SLT', channels["SLT"], 'SLT'));
channelsDiv.appendChild(createChannel('Pragna TV', channels["Pragna TV"], 'Pragna TV'));
channelsDiv.appendChild(createChannel('Rupawahini', channels["Rupawahini"], 'Rupawahini'));
channelsDiv.appendChild(createChannel('Shardha TV', channels["Shardha TV"], 'Shardha TV'));
channelsDiv.appendChild(createChannel('Jaya TV', channels["Jaya TV"], 'Jaya TV'));
channelsDiv.appendChild(createChannel('Verbum TV', channels["Verbum TV"], 'Verbum TV'));
channelsDiv.appendChild(createChannel('ChannelEye', channels["ChannelEye"], 'ChannelEye'));
channelsDiv.appendChild(createChannel('AdaDerana24x7', channels["AdaDerana24x7"], 'AdaDerana24x7'));
channelsDiv.appendChild(createChannel('TNL', channels["TNL"], 'TNL'));
channelsDiv.appendChild(createChannel('TV1', channels["TV1"], 'TV1'));
channelsDiv.appendChild(createChannel('Shakthi TV', channels["Shakthi TV"], 'Shakthi TV'));
channelsDiv.appendChild(createChannel('Siyatha TV', channels["Siyatha TV"], 'Siyatha TV'));
channelsDiv.appendChild(createChannel('Wasantham TV', channels["Wasantham TV"], 'Wasantham TV'));
channelsDiv.appendChild(createChannel('Charana TV', channels["Charana TV"], 'Charana TV'));
channelsDiv.appendChild(createChannel('Nethra TV', channels["Nethra TV"], 'Nethra TV'));
channelsDiv.appendChild(createChannel('Buddhist TV', channels["Buddhist TV"], 'Buddhist TV'));


container.appendChild(channelsDiv);
body.appendChild(container);

const footer = document.createElement('div');
footer.className = 'footer';

const footerP = document.createElement('p');
footerP.innerHTML = '&copy; 2K25 TV Channels. All rights reserved.';
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

function playChannel(channelKey) {
    window.location.href = `player.html?channel=${encodeURIComponent(channelKey)}`;
}
