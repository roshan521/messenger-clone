import { FormControl, IconButton, Input, InputLabel } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import React, { useEffect, useState } from "react";
import "./App.css";
import Message from "./component/Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUsername] = useState("");

  useEffect(() => {
    const name = prompt("Please enter your name");
    setUsername(name.toUpperCase());
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  //add the message to the message array
  const sendMessage = (event) => {
    event.preventDefault();

    db.collection("messages").add({
      username: userName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <>
      <div className="App">
        <img
          src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100"
          alt="messenger"
        />

        <h1 className="App__title">
          <span className="App__span">Welcome</span> {userName}
        </h1>
        <form className="App__form">
          <FormControl className="form__control">
            <InputLabel>Enter a message....</InputLabel>
            <Input
              className="form--input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <IconButton
              className="form--button"
              disabled={!input}
              type="submit"
              variant="contained"
              color="primary"
              onClick={sendMessage}
            >
              <SendIcon />
            </IconButton>
          </FormControl>
        </form>

        <FlipMove>
          {messages.map(({ id, message }) => {
            return <Message key={id} message={message} username={userName} />;
          })}
        </FlipMove>
      </div>
    </>
  );
}

export default App;
