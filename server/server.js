const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000});

const players = [];

server.on('connection', ws => {
   
    ws.on('message', message => {

        if (message === 'exit') {
            ws.close();
        }
         else {

          try {
            const player = JSON.parse(message);
            const have_already = players.some(pl => pl.x === player.x && pl.y === player.y);
            if (have_already) {
              
            }
            else {
              players.push(player);
              client.send(JSON.stringify(players)); 
            }
          } catch(e) {
            client.send(message);
          }
            server.clients.forEach(client => {

                if (client.readyState === WebSocket.OPEN) {
                  
                    
                }
            })
        }
        
    })
    ws.send("Welcome to server");
})