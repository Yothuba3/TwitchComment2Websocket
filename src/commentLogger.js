'use strict';
const tmi = require('tmi.js');
var $ = require('jquery');

let connectionStateString = document.getElementById('connectionState');
connectionStateString.innerHTML = "<span style='color:#202020;'>Waiting for Websocket connection...</span>";

//tmiクライアントの初期設定
var options = {
    connection: {
        secure: true,
        reconnect: false,
    }
};

//外側でclientを宣言することでtmi接続クライアントを常に１つに
let client = new tmi.Client(options);

//websocketグローバル変数
let socket = null;

const onOpen = () => {
    console.log("websocket is open now");
    connectionStateString.innerHTML = "<span style='color:#3CCEC0;'>Websocket is open now!</span>";
};

const onError = (event) => {
    console.log(`websocket throw error: ${event}`);
    connectionStateString.innerHTML = "<span style='color:EC0B43;'>Failed to open websocket.</span>";
};

const onMessage = (event) => {
    // console.log(`websocket message received: ${event}`);
};



$('#connectWebSocketButton').on('click', function () {
    //初期化
    if (client.readyState !== 'CLOSED') {
        const asyncDisconnectClient = (async () => {
            await client.disconnect();
        })();
    }
    client = new tmi.Client(options);
    socket = null;

    //要素取得
    const ip = document.getElementById('clientIP');
    const port = document.getElementById('clientPort');
    const channelURL = document.getElementById('channelURL');
    let commentText = document.getElementById('comment');

    socket = new WebSocket(`ws://${ip.value}:${port.value}`);
    socket.addEventListener('open', onOpen);
    socket.addEventListener('error', onError);


    const channelName = new URL(channelURL.value);
    client.channels = [channelName.pathname.slice(1)];

    client.connect();
    client.on('message', (channel, tags, message, self) => {
        var comment = `${message}`;
        commentText.value = comment;
        //console.log(comment);
        if (socket.readyState === WebSocket.OPEN) socket.send(comment);
    });
});