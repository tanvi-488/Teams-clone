import { useRef, useState, useEffect } from "react";
import { ChatEngine } from "react-chat-engine";
import Header from "../UI/Header/Header";
import "./ChatPage.scss";
import { useAuth } from "../../Contexts/AuthContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
require("dotenv").config();

const ChatPage = () => {
  const didMountRef = useRef(false);
  const { currentUser } = useAuth();
  const user = currentUser;
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  console.log(user.uid);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      if (!user || user === null) {
        history.push("/");
        return;
      }

      //Create or Get User

      axios
        .get("https://api.chatengine.io/users/me/", {
          headers: {
            "project-id": process.env.CHAT_ENGINE_PROJECT_ID,
            "user-name": user.email,
            "user-secret": user.uid,
          },
        })

        .then((response) => {
          console.log(response);
          setLoading(false);
        })

        .catch((e) => {
          console.log("e", e.response);
          let formdata = new FormData();
          formdata.append("email", user.email);
          formdata.append("username", user.email);
          formdata.append("secret", user.uid);

          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "PRIVATE-KEY": process.env.CHAT_ENGINE_PRIVATE_KEY,
              },
            })
            .then((response) => {
              console.log(response);
              setLoading(false);
            })
            .catch((e) => console.log("e", e.response));
        });
    }
  }, [user, history]);

  if (!user || loading) return "Loading..";

  return (
    <div>
      <Header />
      <div className="body">
        <ChatEngine
          height="92vh"
          projectID={process.env.CHAT_ENGINE_PROJECT_ID}
          userName={user.email}
          userSecret={user.uid}
        />
      </div>
    </div>
  );
};
export default ChatPage;

