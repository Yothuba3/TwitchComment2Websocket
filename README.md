# TwitchComment2Websocket
TwicthComment2Websocket(TC2WS)は，Twitchのコメントをwebsocket経由で,  
外部のアプリケーションへ送ることを目的としてElectron製のソフトウェアです． 
現在はWindowsのみインストーラーを配布していますがソースコードからmac向けにビルドすることは可能です．   
<img src="Build/TC2WS_icon.png" width = 40%>  
<img src="https://github.com/Yothuba3/READMEFiles/blob/main/README/TC2WS/TC2WS_header.png" width=80%>
# How to install
ページ右のReleaseからexeファイルをダウンロード可能です．
exeを実行することでインストーラーが起動します．  
<img src="https://github.com/Yothuba3/READMEFiles/blob/main/README/TC2WS/README_01.png">
# How to Use
ソフトウェアはtc2wsという名前でインストールされているため，powertoyなどを利用する場合はtc2wsで名前検索することが可能です．

<img src="https://github.com/Yothuba3/READMEFiles/blob/main/README/TC2WS/README_02.png">

1. TwitchチャンネルのURLを入力します．例(https://www.twitch.tv/yothuba)
2. websocketでコメントを送る際の送信先IP,ポートを指定します．
3. １で指定したチャンネルのコメント取得を開始するとともに，2で指定したIP,portへコメントを送信します．
4. websocketの状態を表示します．
   1. 接続に成功した場合:Websocket is open now!
   2. 失敗した場合:Failed to open websocket.
   - 接続に失敗する場合，サーバが開いているかファイアウォールでブロックされているか確認してください．
5. Twitchのコメントをリスト表示します．
