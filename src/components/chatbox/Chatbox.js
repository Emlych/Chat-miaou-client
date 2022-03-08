import { useState, useEffect } from "react";
import axios from "axios";
import Chatroom from "../chatroom/Chatroom";
//Styling and icons
import "./chatbox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";

const Chatbox = ({ token, toggleModal, urlbase }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [roomname, setroomname] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [data, setData] = useState(null);
  const [roomId, setRoomId] = useState("");

  //Get all chat rooms names
  useEffect(() => {
    const fetchRoomnames = async () => {
      try {
        const response = await axios.get(`${urlbase}/chats`);
        console.log("fetchRoomnames data: ", response.data);
        setData(response.data.chatrooms);
        setIsLoading(false);
      } catch (error) {
        console.log("error ==>", error.message);
        console.log("error message ==>", error.response.data);
      }
    };
    fetchRoomnames();
  }, []);

  //Create a new chat room
  const addChatroom = async (event) => {
    event.preventDefault();
    const newChatroomData = new FormData();
    newChatroomData.append("roomname", roomname);
    newChatroomData.append("isPrivate", isPrivate);
    try {
      if (roomname) {
        const response = await axios.post(
          `${urlbase}/chat/create`,
          newChatroomData,
          {
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("new chatbox data : ", response.data);
      } else {
        alert("Please specify a room name.");
      }
    } catch (error) {
      console.log("error ==>", error.message);
      console.log("error message ==>", error.response.data);
    }
  };

  return token ? (
    isLoading ? (
      <div>Data are loading</div>
    ) : (
      <div className="chatbox">
        <div className="chat-nav">
          <form onSubmit={addChatroom}>
            <button type="submit">
              <FontAwesomeIcon icon={faPlusCircle} className="icon" />
            </button>
            <input
              type="text"
              name="roomname"
              id="roomname"
              placeholder="Add a new chatroom"
              value={roomname}
              onChange={(event) => {
                setroomname(event.target.value);
              }}
            />
            <button className="lock" onClick={() => setIsPrivate(!isPrivate)}>
              {isPrivate ? (
                <FontAwesomeIcon icon={faLock} />
              ) : (
                <FontAwesomeIcon icon={faLockOpen} />
              )}
            </button>
          </form>
          <div className="chat-names">
            {data.map((item) => {
              return (
                <div key={item._id}>
                  <button
                    onClick={() => {
                      setRoomId(item._id);
                    }}
                  >
                    {item.roomname}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="chat-room">
          {roomId ? (
            <Chatroom roomId={roomId} urlbase={urlbase} />
          ) : (
            <div>
              Welcome to the chat box for friendly chats. <br /> Please select a
              chatroom or create a new room to begin with.
            </div>
          )}
        </div>
      </div>
    )
  ) : (
    <div className="no-chatbox">
      <div> Please login or sign up to continue.</div>
      <button onClick={toggleModal}>Login | Signup</button>
    </div>
  );
};

export default Chatbox;
