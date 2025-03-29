const channels = {
    "tv-derana": "https://edge2-moblive.yuppcdn.net/transhd2/smil:detv04.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToyMzozMCBBTSZoYXNoX3ZhbHVlPXN0aU85Umg2R1ZCMzZ0Y0lkVStmZ0E9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfNF8tMSZzdHJtX2xlbj0yNQ==",
    "sirasa-tv": "https://edge3-moblive.yuppcdn.net/transsd/smil:sirtv09.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToxMzo1MyBBTSZoYXNoX3ZhbHVlPWxTdVZPMHpONjVtTHkzTS9MWjkvUEE9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfOV8tMSZzdHJtX2xlbj0yNQ==",
    "hiru-tv": "https://edge2-moblive.yuppcdn.net/transhd2/smil:hitv17.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMToxNzo0MiBBTSZoYXNoX3ZhbHVlPWF2aHYvSjRsOWFxYTg0Tkt2RENnM3c9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfMTdfLTEmc3RybV9sZW49MjU=",
};

function playChannel(channelKey) {
    const channelName = document.querySelector(`.channel[data-key="${channelKey}"] h2`).textContent;
    window.location.href = `player.html?channel=${encodeURIComponent(channelName)}&id=${encodeURIComponent(channelKey)}`;
}

function resolveStreamURL(channelKey) {
    return channels[channelKey];
}
