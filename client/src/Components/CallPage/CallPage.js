import { useEffect, useReducer, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getRequest, postRequest } from "./../../utils/apiRequests";
import {
  BASE_URL,
  GET_CALL_ID,
  SAVE_CALL_ID,
} from "./../../utils/apiEndpoints";
import io from "socket.io-client";
import Peer from "simple-peer";
import "./CallPage.scss";
import Messenger from "./../UI/Messenger/Messenger";
import MessageListReducer from "../../reducers/MessageListReducer";
import Alert from "../UI/Alert/Alert";
import MeetingInfo from "../UI/MeetingInfo/MeetingInfo";
import CallPageFooter from "../UI/CallPageFooter/CallPageFooter";
import axios from "axios";
import CallPageHeader from "../UI/CallPageHeader/CallPageHeader";
import { useAuth } from "../../Contexts/AuthContext";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
let peer = null;
const socket = io.connect("http://localhost:4000");
const initialState = [];

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.9);
`;

const Row = styled.div`
  height: 100%;
  display: flex;
`;

const UserInfo = styled.div`
  position: absolute;
  top: 82%;
  left: 5%;
  z-index: 1;
  font-size: 20px;
`;

const PartnerInfo = styled.div`
  position: absolute;
  top: 82%;
  left: 55%;
  z-index: 1;
  font-size: 20px;
`;

const Video = styled.video`
  width: 50%;
  height: auto;
`;

var x = 1;

const CallPage = () => {
  const { currentUser } = useAuth();
  const user = currentUser;
  const history = useHistory();
  let { id } = useParams();
  const isAdmin = window.location.hash === "#init" ? true : false;
  const url = `${window.location.origin}${window.location.pathname}`;
  let alertTimeout = null;

  const userVideo = useRef();
  const partnerVideo = useRef();

  const [messageList, messageListReducer] = useReducer(
    MessageListReducer,
    initialState
  );

  const [streamObj, setStreamObj] = useState();
  const [screenCastStream, setScreenCastStream] = useState();
  const [meetInfoPopup, setMeetInfoPopup] = useState(false);
  const [isPresenting, setIsPresenting] = useState(false);
  const [isMessenger, setIsMessenger] = useState(false);
  const [messageAlert, setMessageAlert] = useState({});
  const [isAudio, setIsAudio] = useState(true);
  const [isVideo, setIsVideo] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      setMeetInfoPopup(true);
    }
    initWebRTC();
    socket.on("code", (data) => {
      if (data.url === url) {
        peer.signal(data.code);
      }
    });
  }, [isAdmin, url]);

  const getRecieverCode = async () => {
    const response = await getRequest(`${BASE_URL}${GET_CALL_ID}/${id}`);
    if (response.code) {
      peer.signal(response.code);
    }
  };

  //WebRTC

  const initWebRTC = async () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(async (stream) => {
        setStreamObj(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }

        peer = new Peer({
          initiator: isAdmin,
          trickle: false,
          stream: stream,
        });

        if (!isAdmin) {
          getRecieverCode();
        }

        peer.on("signal", async (data) => {
          if (isAdmin) {
            let payload = {
              id,
              signalData: data,
            };
            await postRequest(`${BASE_URL}${SAVE_CALL_ID}`, payload);
          } else {
            socket.emit("code", { code: data, url }, (cbData) => {
              console.log("code sent");
            });
          }
        });

        let chatid = "";

        if (isAdmin) {
          let formdata = new FormData();
          formdata.append("title", "MeetingID: " + id);
          formdata.append("is-direct-chat", false);
          async function status() {
            try {
              const { data: response } = await axios.post(
                "https://api.chatengine.io/chats/",
                formdata,
                {
                  headers: {
                    "project-id": "f033ec00-96bf-4f86-80a9-c860be5b77e5",
                    "user-name": user.email,
                    "user-secret": user.uid,
                  },
                }
              );
              return response.id;
            } catch (e) {
              console.log("e", e.response);
            }
          }
          chatid = await status();
        }
        peer.on("connect", () => {
          // wait for 'connect' event before using the data channel
          if (!isAdmin) {
            x = 0;
            peer.send(user.email);
          }
        });

        peer.on("stream", (stream) => {
          // got remote video stream, now let's show it in a video tag
          if (partnerVideo.current) {
            partnerVideo.current.srcObject = stream;
          }
        });

        peer.on("data", (data) => {
          if (x === 1) {
            const username = data.toString();
            const chatID = chatid;
            console.log(chatID);
            x = 0;
            let formdata = new FormData();
            formdata.append("username", username);

            axios
              .post(
                `https://api.chatengine.io/chats/${chatID}/people/`,
                formdata,
                {
                  headers: {
                    "project-id": "f033ec00-96bf-4f86-80a9-c860be5b77e5",
                    "user-name": user.email,
                    "user-secret": user.uid,
                  },
                }
              )
              .catch((e) => console.log("e", e.response));
          } else if (x === 0) {
            clearTimeout(alertTimeout);
            messageListReducer({
              type: "addMessage",
              payload: {
                user: "other",
                msg: data.toString(),
                time: Date.now(),
              },
            });

            setMessageAlert({
              alert: true,
              isPopup: true,
              payload: {
                user: "other",
                msg: data.toString(),
              },
            });

            alertTimeout = setTimeout(() => {
              setMessageAlert({
                ...messageAlert,
                isPopup: false,
                payload: {},
              });
            }, 10000);
          }
        });
      })
      .catch(() => {});
  };

  //Video Streams

  let UserVideo = <Video playsInline muted ref={userVideo} autoPlay />;

  let PartnerVideo = <Video playsInline ref={partnerVideo} autoPlay />;

  //Messages

  const sendMsg = (msg) => {
    peer.send(msg);
    messageListReducer({
      type: "addMessage",
      payload: {
        user: "you",
        msg: msg,
        time: Date.now(),
      },
    });
  };

  //ScreenShare

  const screenShare = () => {
    navigator.mediaDevices
      .getDisplayMedia({ cursor: true })
      .then((screenStream) => {
        peer.replaceTrack(
          streamObj.getVideoTracks()[0],
          screenStream.getVideoTracks()[0],
          streamObj
        );
        setScreenCastStream(screenStream);
        screenStream.getTracks()[0].onended = () => {
          peer.replaceTrack(
            screenStream.getVideoTracks()[0],
            streamObj.getVideoTracks()[0],
            streamObj
          );
        };
        setIsPresenting(true);
      });
  };

  const stopScreenShare = () => {
    screenCastStream.getVideoTracks().forEach(function (track) {
      track.stop();
    });
    peer.replaceTrack(
      screenCastStream.getVideoTracks()[0],
      streamObj.getVideoTracks()[0],
      streamObj
    );
    setIsPresenting(false);
  };

  //Toggle Streams

  const toggleAudio = (value) => {
    streamObj.getAudioTracks()[0].enabled = value;
    setIsAudio(value);
  };

  const toggleVideo = (value) => {
    streamObj.getVideoTracks()[0].enabled = value;
    setIsVideo(value);
  };

  //Disconnect

  const disconnectCall = () => {
    peer.destroy();
    history.push("/home");
    window.location.reload();
  };

  return (
    <Container>
      <div className="callpage-container">
        <Row>
          {UserVideo}
          <UserInfo>
            <FontAwesomeIcon icon={faMapPin} className="pin-icon" />
            You
          </UserInfo>
          {PartnerVideo}
          <PartnerInfo>
            <FontAwesomeIcon icon={faMapPin} className="pin-icon" />
            Other
          </PartnerInfo>
          <CallPageHeader
            isMessenger={isMessenger}
            setIsMessenger={setIsMessenger}
            messageAlert={messageAlert}
            setMessageAlert={setMessageAlert}
          />
          <CallPageFooter
            isPresenting={isPresenting}
            stopScreenShare={stopScreenShare}
            screenShare={screenShare}
            isAudio={isAudio}
            toggleAudio={toggleAudio}
            isVideo={isVideo}
            toggleVideo={toggleVideo}
            disconnectCall={disconnectCall}
          />

          {isAdmin && meetInfoPopup && (
            <MeetingInfo setMeetInfoPopup={setMeetInfoPopup} url={url} />
          )}
          {isMessenger ? (
            <Messenger
              setIsMessenger={setIsMessenger}
              sendMsg={sendMsg}
              messageList={messageList}
              url={url}
            />
          ) : (
            messageAlert.isPopup && <Alert messageAlert={messageAlert} />
          )}
        </Row>
      </div>
    </Container>
  );
};
export default CallPage;
