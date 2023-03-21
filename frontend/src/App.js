import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message: message });
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageRecieved(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        placeholder="Message ....."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>Send Message</button>

      <h1>{messageRecieved}</h1>
    </div>
  );
}

export default App;
