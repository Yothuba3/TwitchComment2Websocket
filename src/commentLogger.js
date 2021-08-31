'use strict';
const tmi = require('tmi.js');
var $ = require('jquery');

//WebSocketの待機状態を表示
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

//webSocketが開通した場合のイベント
const onOpen = () => {
    console.log("websocket is open now");
    connectionStateString.innerHTML = "<span style='color:#3CCEC0;'>Websocket is open now!</span>";
};
//websocketがエラーを発生させた場合のイベント
const onError = (event) => {
    console.log(`websocket throw error: ${event}`);
    connectionStateString.innerHTML = "<span style='color:#EC0B43;'>Failed to open websocket.</span>";
};
//未使用 将来的に使うかもなので残しています
const onMessage = (event) => {
    // console.log(`websocket message received: ${event}`);
};


//Websocket送信ボタンが押された場合の処理
$('#connectWebSocketButton').on('click', function () {
    //初期化
    //クライアントが開いてる場合は閉じるのを確認してからnewする
    if (client.readyState !== 'CLOSED') {
        const asyncDisconnectClient = (async () => {
            await client.disconnect();
        })();
    }
    client = new tmi.Client(options);
    socket = null;

    //html要素取得
    const ip = document.getElementById('clientIP');
    const port = document.getElementById('clientPort');
    const channelURL = document.getElementById('channelURL');
    let commentOutput = document.getElementById('twitchCommentBox');
    //仕様上socketをnewしなおすのでイベントリスナーは毎回追加
    socket = new WebSocket(`ws://${ip.value}:${port.value}`);
    socket.addEventListener('open', onOpen);
    socket.addEventListener('error', onError);

    //twitchクライアントの設定
    const channelName = new URL(channelURL.value);
    client.channels = [channelName.pathname.slice(1)];

    client.connect();
    //コメントが来た場合に呼ばれるイベント
    client.on('message', (channel, tags, message, self) => {
        let comment = document.createElement('p');
        comment.className = "comment";
        comment.textContent = `${tags.username}: ${message}`;
        
        commentOutput.appendChild(comment); //html上にコメント追加
        //console.log(comment);
        //websocketが開通しきる前にコメントがくる場合のためのif
        if (socket.readyState === WebSocket.OPEN) socket.send(`${message}`);
    });
});