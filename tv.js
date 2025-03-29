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
            width: 
