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
            // const player = JSON.parse(message);
            // have_already = players.values().some(pl => pl.x === player.x && pl.y === player.y);
            // players[player.id] = ({ x: player.x, y: player.y});
            console.log("messsage")
          } catch(e) {
            console.error(e);
          }
          server.clients.forEach(client => {

              if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(players));
              }
          })
        }
        
    })
    const new_player = generateUID();
    players[new_player] = null;
    ws.send(JSON.stringify({token: new_player}));
})