import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends, faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import "./CallPageHeader.scss";
import { formatDate } from "../../../utils/helpers";
import { SidebarData } from "../Header/SidebarData";
import { Link } from "react-router-dom";
const CallPageHeader = ({
  isMessenger,
  setIsMessenger,
  messageAlert,
  setMessageAlert,
}) => {
  let interval = null;
  const [currentTime, setCurrentTime] = useState(() => {
    return formatDate();
  });

  useEffect(() => {
    interval = setInterval(() => setCurrentTime(formatDate()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="frame-header">
      <div className="header-items icon-block">
        <currentTime />
        <FontAwesomeIcon className="icon" icon={faUserFriends} />
      </div>
      <div
        className="header-items icon-block"
        onClick={() => {
          setIsMessenger(true);
          setMessageAlert({});
        }}
      >
        <FontAwesomeIcon className="icon" icon={faCommentAlt} />
        {!isMessenger && messageAlert.alert && (
          <span className="alert-circle-icon"></span>
        )}
      </div>
      <nav className="nav-menu active">
        <ul className="nav-menu-items">
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>{item.icon}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default CallPageHeader;
