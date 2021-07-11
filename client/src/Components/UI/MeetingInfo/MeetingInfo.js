import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCopy } from "@fortawesome/free-solid-svg-icons";
import "./MeetingInfo.scss";

const MeetingInfo = ({ setMeetInfoPopup, url }) => {
  return (
    <div className="meeting-info-block">
      <div className="meeting-header">
        <h3>Your meeting is ready</h3>
        <FontAwesomeIcon
          className="icon"
          icon={faTimes}
          onClick={() => {
            setMeetInfoPopup(false);
          }}
        />
      </div>
      <p className="info-text">Share the meeting link with others.</p>
      <div className="meet-link">
        <span>{url}</span>
        <FontAwesomeIcon
          className="icon"
          icon={faCopy}
          onClick={() => navigator.clipboard.writeText(url)}
        />
      </div>
    </div>
  );
};
export default MeetingInfo;
