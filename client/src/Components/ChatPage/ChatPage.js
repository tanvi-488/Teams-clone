import { useRef, useState, useEffect } from "react";
import { ChatEngine } from "react-chat-engine";
import Header from "../UI/Header/Header";
import "./ChatPage.scss";
import { useAuth } from "../../Contexts/AuthContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

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
            "project-id": "f033ec00-96bf-4f86-80a9-c860be5b77e5",
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
                "PRIVATE-KEY": "890e6489-b5e4-434d-ac5c-bcdaf8b532b4",
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
          projectID="f033ec00-96bf-4f86-80a9-c860be5b77e5"
          userName={user.email}
          userSecret={user.uid}
        />
      </div>
    </div>
  );
};
export default ChatPage;
