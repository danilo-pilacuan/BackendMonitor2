
// Import the express in typescript file
import express from 'express';
import { Request,Response } from 'express';
import http from 'http';
import { Server } from "socket.io";
import Path from 'path'; 
import cors from 'cors';


// Initialize the express engine
const app: express.Application = express();
const server = http.createServer(app);
const io = new Server( server,{
    cors: {
      origin: "http://192.168.0.107:8080"
    }
  });

// Take a port 3000 for running server.
const port: number = 3000;

app.use(cors({
    credentials: true,
    origin: ['http://192.168.0.107:3000','http://192.168.0.107:8080','http://192.168.0.107:8081','http://192.168.0.107:8082']
}))

// Handling '/' Request
app.get('/', (req :Request, res:Response) => {
    res.send("TypeScript With Express");
});

app.get('/api/usuarios', (req :Request, res:Response) => {
    res.json({usuarios:32})
});

app.post('/testUP', (req :Request, res:Response) => {
    console.log("testio1");
    console.log(req.body)
    io.emit("lecturaUP",{data:"message for recieve data"})
    res.json({usuarios:32})
});
app.post('/testDOWN', (req :Request, res:Response) => {
    console.log("testio2");
    console.log(req.body)
    io.emit("lecturaDOWN",{data:"message for recieve data"})
    res.json({usuarios:32})
});
app.post('/testLEFT', (req :Request, res:Response) => {
    console.log("testio3");
    console.log(req.body)
    io.emit("lecturaL",{data:"message for recieve data"})
    res.json({usuarios:32})
});
app.post('/testRIGHT', (req :Request, res:Response) => {
    console.log("testio4");
    console.log(req.body)
    io.emit("lecturaR",{data:"message for recieve data"})
    res.json({usuarios:32})
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        
        console.log('🔥: A user disconnected');
      });
      socket.on('testSocket', () => {
        
        console.log('🔥: A user disconnected');
      });
});
io.on('testClient', (socket) => {
    console.log('🔥: A user Sent data');
  });



app.use(express.static(Path.join(__dirname, '/public')));


// Server setup
server.listen(port, () => {
    console.log(`TypeScript with Express
         http://192.168.0.107:${port}/`);
});