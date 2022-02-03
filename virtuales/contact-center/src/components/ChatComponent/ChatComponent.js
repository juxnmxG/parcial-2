import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";

import useFectGet from "../../utils/useFectGet";
import Loading from "../Loading/Loading";
import CameraDistribution from "../main/CameraDistribution/CameraDistribution";
import "./ChatComponent.css";
import Pusher from "pusher-js"
import ReactScrollableFeed from "react-scrollable-feed"

function ChatComponent() {

  const { id, room } = useParams();
  const [selected, setSelected] = useState("messages");

  const [messagesReceived, setMessagesReceived] = useState([])
  const [onlineUsers, setOnlineUsers] = useState()

  const [message, setMessage] = useState({
    from: "",
    rtm: Math.ceil(Math.random() * 99999) + `-${room}`,
    message: "",
  });

  var pusher = new Pusher('acb85d327baddb8d2046', {
    cluster: 'us3'
  });

  var channel = null;

  useEffect(async () => {
    channel = pusher.subscribe(room);
    const messagesSaved = await getMessages();
    setMessagesReceived((prevMessage) => [...prevMessage, ...messagesSaved.chats])
  }, [])

  // useEffect(async () => {
  //   if (dataUser) postConexionUser();
  //   setInterval(() => {
  //     updateConexion()
  //   }, 60000)
  // }, [dataUser])

  useEffect(() => {
    channel.bind("chat", function (data) {
      console.log("mensage pusher::::", data.message)
      setMessagesReceived((prevMessage) => [...prevMessage, JSON.parse(data.message)])
    })
    channel.bind("attendee", function (data) {
      console.log("::::se acaba de unir::::datos::::", JSON.parse(data.message))
    })
    //getUserConected()

  }, [channel])

  const messages = useFectGet(
    "https://api.virtuales.io/event/questions?room=e2b07609-auditorio"
  );

  const handleChange = (e) => {
    setMessage({
      ...message,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("boton enviar")
    //post();
    e.target.reset()
  };

  // const post = async () => {
  //   if (dataUser) message.from = dataUser.name
  //   message.message = message.message.replace(/\r?\n/g, "<br>")

  //   await fetch(`https://api.virtuales.io/event/${id}/rooms/${idschedule}/chats`, {
  //     method: "POST",
  //     body: JSON.stringify(message),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  // };
  // const updateConexion = async () => {
  //   if (dataUser) {

  //     const userUpdate = {
  //       id: dataUser.id,
  //       from: dataUser.name
  //     }

  //     await fetch(`https://api.virtuales.io/event/${id}/rooms/${idschedule}/chats`, {
  //       method: "PUT",
  //       body: JSON.stringify(userUpdate),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }).then(() => {
  //       console.log("se actualizo la sesión", userUpdate)
  //     });
  //   }
  // };

  // const getUserConected = async () => {
  //   const res = await fetch(`https://api.virtuales.io/event/${id}/rooms/${idschedule}/atteendes`)
  //   const response = await res.json()
  //   console.log(response)
  //   setOnlineUsers(response)
  // }

  // const postConexionUser = async () => {

  //   const dataUserConexion = {
  //     id: dataUser.id,
  //     from: dataUser.name
  //   }

  //   await fetch(`https://api.virtuales.io/event/${id}/rooms/${idschedule}/atteendes`, {
  //     method: "POST",
  //     body: JSON.stringify(dataUserConexion),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  // };

  const getMessages = async () => {
    const res = await fetch(`https://api.virtuales.io/event/${id}/rooms/${room}/chats`);
    const response = await res.json();
    return response;
  };

  return (
    <div className="chat" style={{ marginTop: "-15px" }}>
      <ul className="chat-list">
        <li
          className={selected === "messages" ? "active" : ""}
          onClick={() => setSelected("messages")}
        >
          Chat
        </li>
        <li>|</li>
        <li
          className={selected === "assistants" ? "active" : ""}
          onClick={() => setSelected("assistants")}
        >
          Asistentes
        </li>

      </ul>
      <div className="messages">
        {selected === "messages" && (
          <div>
            {!messages ? (
              <Loading />
            ) : (
              <div className="messages-container">
                <ReactScrollableFeed>
                  {messagesReceived.map((message, index) => {

                    return <div key={index}>
                      <p
                        style={{ marginBottom: "-20px" }}
                        className={"message-person"}
                      >
                        {message.from}
                      </p>

                      <p dangerouslySetInnerHTML={{ __html: message.message }}></p>
                    </div>
                  })
                  }
                </ReactScrollableFeed>
              </div>
            )}
            <form onSubmit={(e) => handleSubmit(e)}>
              <textarea
                type="text"
                name="message"
                placeholder="Escribe tu mensaje"
                onChange={(e) => handleChange(e)}
              ></textarea>
              <input type="submit"></input>
            </form>
          </div>
        )}
        {selected === "assistants" &&
          <div className="messages-container">
            {onlineUsers &&
              onlineUsers.attendees.map((user) =>
                <div key={user.id} className="conexion">
                  <div className="circle-conexion"></div>
                  <div >{user.name}</div>
                </div>
              )
            }
          </div>}
      </div>

      <CameraDistribution />
    </div>
  );
}

export default ChatComponent;
