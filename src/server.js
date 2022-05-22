//this runs in backend
import express from "express";
import http from "http";
import socketIO from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("listening on http://localhost:3000");
//app.listen(3000, handleListen);

const httpServer = http.createServer(app);
const io = socketIO(httpServer);

io.on("connection", socket => {
  socket.on("enter_room", (roomName, done) => {
    console.log(roomName);
    socket.join(roomName);
    setTimeout(() => {
      //not running in backend, executed by back, run in front-end (security risk)
      done();
    }, 10000);
  });
});

/*
const wss = new WebSocket.Server({ server });

//connection list
const sockets = [];
wss.on("connection", socket => {
  //collects clients connection
  sockets.push(socket);
  socket["nickname"] = "Anonymous";
  console.log("Connected to Browser");
  socket.on("close", () => console.log("Disconnected from browser"));
  socket.on("message", msg => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        sockets.forEach(aSocket =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
      case "nickname":
        socket["nickname"] = message.payload;
    }
  });
});
*/

httpServer.listen(3000, handleListen);
