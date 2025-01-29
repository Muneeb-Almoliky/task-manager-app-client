import React from "react";
import styles from "./ConfirmBox.module.css";

const ConfirmBox = ({ isVisible, message, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.confirmBox}>
        <p>{message}</p>
        <div className={styles.buttons}>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Yes
          </button>
          <button className={styles.cancelBtn} onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
