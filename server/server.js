const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000});

const generateUID = () => {
  return (
    "_" +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

const players = {};

server.on('connection', ws => {
   
    ws.on('message', message => {

        if (message === 'exit') {
            ws.close();
        }
         else {
          let have_already;
          try {
            const data = JSON.parse(message);

            switch(data.method) {
              case "SET_PLAYER_POSITION":
                players[data.token] = data.player;
                console.log(`Position for player ${data.token} setted`);
                break;
            }

            // have_already = players.values().some(pl => pl.x === player.x && pl.y === player.y);
            // players[player.id] = ({ x: player.x, y: player.y});

            server.clients.forEach(client => {

              if (client.readyState === WebSocket.OPEN) {
                switch(data.method) {
                  case "SET_PLAYER_POSITION":
                    client.send(JSON.stringify({ method: "SET_PLAYERS", players: players }));
                    break;
                  case "CD":
                    client.send(message);
                    break;
                }
              }
            })
         
          } catch(e) {
            console.error(e);
          }

        }
        
    })
   
    ws.send("Welcome to server!");
})