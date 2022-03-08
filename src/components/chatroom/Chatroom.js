import "./chatroom.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Chatroom = ({ roomId, urlbase }) => {
  const [isLoading, setisLoading] = useState(true);
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");

  //Get all infos of this specific chatroom
  useEffect(() => {
    const fetchChatroom = async () => {
      try {
        const response = await axios.get(`${urlbase}/chat/${roomId}`);
        setData(response.data);
        console.log("chatroom response : ", response.data);
        setisLoading(false);
      } catch (error) {
        console.log("Chatroom error =>", error.message);
        console.log("Chatroom error message =>", error.response.data);
      }
    };
    fetchChatroom();
  }, [roomId]);

  //Send one message
  const sendMessage = (event) => {
    event.preventDefault();
    alert("A message was sent");
  };

  return (
    <div>
      <h2>Chatroom</h2>
      {isLoading ? (
        <span>Chatroom data is loading.</span>
      ) : (
        <div>
          <h3>{data.roomname}</h3>
          {/* <div>Participants : {data.participants.username}</div> */}
          <div>Display all the messages here with scroll on y axis</div>
          <form onSubmit={sendMessage}>
            <textarea
              type="text"
              name="message"
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatroom;
