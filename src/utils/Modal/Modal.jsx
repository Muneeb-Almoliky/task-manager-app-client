import styles from "./Modal.module.css";

const Modal = ({ children }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
};

export default Modal;
