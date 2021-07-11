import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdScreenShare, MdStopScreenShare } from "react-icons/md";
import {
  faVideo,
  faMicrophone,
  faVideoSlash,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import { TelephoneXFill } from "react-bootstrap-icons";
import "./CallPageFooter.scss";

const CallPageFooter = ({
  isPresenting,
  stopScreenShare,
  screenShare,
  isAudio,
  isVideo,
  toggleVideo,
  status,
  mediaBlobUrl,
  toggleAudio,
  disconnectCall,
  // isRecording,
}) => {
  return (
    <div className="footer-item">
      <div className="center-item">
        {isPresenting ? (
          <div className="icon-block icon-red" onClick={stopScreenShare}>
            <MdStopScreenShare className="icon" fontSize="20px" />
          </div>
        ) : (
          <div className="icon-block" onClick={screenShare}>
            <MdScreenShare className="icon" />
          </div>
        )}
        <div
          className={`icon-block ${!isAudio ? "red-bg" : null}`}
          onClick={() => toggleAudio(!isAudio)}
        >
          <FontAwesomeIcon
            className="icon"
            icon={isAudio ? faMicrophone : faMicrophoneSlash}
          />
        </div>
        <div
          className={`icon-block ${!isVideo ? "red-bg" : null}`}
          onClick={() => toggleVideo(!isVideo)}
        >
          <FontAwesomeIcon
            className="icon"
            icon={isVideo ? faVideo : faVideoSlash}
          />
        </div>
        <div className="icon-block icon-red" onClick={disconnectCall}>
          <TelephoneXFill className="icon" />
        </div>
      </div>
    </div>
  );
};

export default CallPageFooter;
