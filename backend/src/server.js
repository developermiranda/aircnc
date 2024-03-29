const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const socketio = require("socket.io");
const http = require("http");

const routes = require("./routes");

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(
  "mongodb+srv://xxxxx:xxxxx@omnistack-yak2v.mongodb.net/semana9?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const connectedUsers = {};

io.on("connection", socket => {
  // console.log(socket.handshake.query);
  // console.log("Usuário conectado", socket.id);

  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

// Pattners

// GET, POST, PUT, DELETE

// req.query = Acessar query params (para filtros)
// req.params = Acessar rote params (para edição, delete)
// req.body = Acessar corpo da requisição (para criação, edição)

// usando cors pode ser definido o ip de qual aplicação poderá acessar a nossa aplicação

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

server.listen(3333);
