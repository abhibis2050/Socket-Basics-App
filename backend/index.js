const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// logger
app.use(morgan("tiny"));

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  },
});

io.on("connection", (socket) => {
  console.log(`connected to socket id ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("recieve_message", data);
  });

socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// port
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
