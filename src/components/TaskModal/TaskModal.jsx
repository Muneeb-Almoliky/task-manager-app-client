import { useState } from "react";
import { useCookies } from "react-cookie";
// import axios from "../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useTasks from "../../hooks/useTasks";
import styles from "./TaskModal.module.css";
import Modal from "../../utils/Modal/Modal";
import Toast from "../../utils/Toast";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TaskModal = ({ mode, setShowModal, task }) => {
  const [cookies] = useCookies(null);
  const axiosPrivate = useAxiosPrivate();
  const { getTasks } = useTasks();

  const editMode = mode === "edit" ? true : false;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.email,
    title: editMode ? task.title : "",
    completionStatus: editMode ? task.completion_status : false,
    starredStatus: editMode ? task.starred_status : false,
    date: editMode ? task.date : new Date(),
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(`/tasks`, data, {
        headers: { "Content-type": "application/json" },
      });
      if (response.status === 201) {
        setShowModal(false);
        Toast.success("Task have been created successfully!");
      }
      getTasks();
    } catch (error) {
      console.log(error);
      Toast.error("Error: could not create task");
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.put(`/tasks/${task.id}`, data, {
        headers: { "Content-type": "application/json" },
      });

      if (response.status === 200) {
        setShowModal(false);
        Toast.success("Task have been edited successfully!");
      }
      setShowModal(false);
      getTasks();
    } catch (error) {
      console.log(error);
      Toast.error("Error: could not edit task");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  return (
    <Modal>
      <div className={styles.formTitleContainer}>
        <h3>Let's {mode} your task</h3>
        <button onClick={() => setShowModal(false)}>
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      <form>
        <input
          type="text"
          required
          maxLength={30}
          placeholder="Type Your Task"
          name="title"
          value={data.title}
          onChange={handleChange}
        ></input>
        <input
          className={mode}
          type="submit"
          onClick={editMode ? editData : postData}
        ></input>
      </form>
    </Modal>
  );
};

export default TaskModal;
