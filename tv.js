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
        margin-left