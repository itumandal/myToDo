import PropTypes from "prop-types";

const Notification = ({ message, color, showNotification }) => {
  return (
    <div className={`notification-main ${color}`}>
      <div>
        <span className="title">{message}</span>
        <span className="cross" onClick={() => showNotification()}>
          &#10006;
        </span>
      </div>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.func.isRequired,
  color: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
};

export default Notification;
