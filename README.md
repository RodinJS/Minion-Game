# Rodin Inc. Minion Game

```sh
git clone --recursive git@github.com:RodinJS/Minion-Game.git 
```

![](http://68.media.tumblr.com/7935d45b8e4bd49684fb41b4499d3b8f/tumblr_nejg3v5kfs1s8njeuo1_1280.jpg)

# Server start
    ## Default server run on 3010 port
       npm run server
    ## If you want change port
       export PORT=3011; npm run server;

# Socket server Client

     <script src="/socket-server?debug=true"></script>
     included in public index.html
     1. Default server host http://localhost:3010
     ## For changing host 
     1. <script src="/socket-server?debug=true&host=http://rodin.uxt"></script>