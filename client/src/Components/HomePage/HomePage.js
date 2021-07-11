import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import Header from "../UI/Header/Header";
import "./HomePage.scss";
import teamsLayout from "./microsoftteamslayout.jpg";
import { v1 as uuid } from "uuid";
const HomePage = (props) => {
  const [meetLink, setMeetLink] = useState("");

  const startCall = () => {
    const id = uuid();
    props.history.push(`/${id}#init`);
  };

  const handleChangeMsg = (e) => {
    setMeetLink(e.target.value);
  };
  const handleJoin = (e) => {
    console.log(meetLink);
  };

  return (
    <div className="home-page">
      <Header />
      <div className="body">
        <div className="left-side">
          <div className="content">
            <h2>Virtual conferences and webinars redefined.</h2>
            <p>
              With interactive meetings, hassle-free sharing, data friendly
              features all in a easy-to-use layout, we aim to redefine the
              online conferencing experience to cater to all your needs.
            </p>
            <div className="action-btn">
              <button className="btn" onClick={startCall}>
                <FontAwesomeIcon className="icon-block" icon={faVideo} />
                New Meeting
              </button>
              <div className="input-block">
                <div className="input-section">
                  <FontAwesomeIcon className="icon-block" icon={faKeyboard} />
                  <input
                    placeholder="Enter Meeting Link"
                    value={meetLink}
                    onChange={(e) => handleChangeMsg(e)}
                  />
                </div>
                <button className="btn no-bg" onClick={handleJoin}>
                  <a href={meetLink}>Join</a>
                </button>
              </div>
            </div>
            <div className="help-text">
              <a href="/home">Learn More</a>
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="content">
            <img src={teamsLayout} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
