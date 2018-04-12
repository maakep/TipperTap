import * as express from "express";
import * as socketIo from "socket.io";
import * as http from "http";
import * as path from "path";
// Server

const port = 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../index.html"));
});


app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../" + req.url));
});

server.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log("listening on *:" + port);
});




io.on("connection", (socket) => {
    // tslint:disable-next-line:no-console
    console.log("Client joined: " + socket.handshake.address);

    socket.on('client:click', () => {
        console.log("Someone clicked");
        socket.broadcast.emit('server:click');
    });
});


