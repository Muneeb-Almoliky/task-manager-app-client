import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrash,
  faEdit,
  faStar,
  faArchive,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Task.module.css";
import TaskModal from "../TaskModal/TaskModal";
import useTasks from "../../hooks/useTasks";
import Toast from "../../utils/Toast";
import ConfirmBox from "../../utils/ConfirmBox/ConfirmBox";

const Task = ({ task }) => {
  const [showModal, setShowModal] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { getTasks } = useTasks();
  const [isCompleted, setIsCompleted] = useState(task.completion_status);
  const [isStarred, setIsStarred] = useState(task.starred_status);
  const [isArchived, setIsArchived] = useState(task.archived_status);
  const [showConfirm, setShowConfirm] = useState(false);

  const deleteTask = async () => {
    try {
      await axiosPrivate.delete(`/tasks/${task.id}`);
      getTasks();
      Toast.success("Task have been deleted successfully!");
    } catch (error) {
      console.error("Failed to delete task", error);
      Toast.error("Error: could not delete task");
    }
  };

  const toggleCompleteTask = async (newStatus) => {
    try {
      await axiosPrivate.put(`/tasks/${task.id}/complete`, {
        isCompleted: newStatus,
      });
      setIsCompleted(newStatus);
      getTasks();
      Toast.success(
        `Task have been ${
          isCompleted ? "uncompleted" : "completed"
        } successfully!`
      );
    } catch (error) {
      console.error("Failed to mark task as completed", error);
      Toast.error(
        `Error: could not ${isCompleted ? "uncomplete" : "complete"} task`
      );
    }
  };

  const toggleStarTask = async (newStatus) => {
    try {
      await axiosPrivate.put(`/tasks/${task.id}/star`, {
        isStarred: newStatus,
      });
      setIsStarred(newStatus);
      getTasks();
      Toast.success(
        `Task have been ${isStarred ? `unstarred` : "starred"} successfully!`
      );
    } catch (error) {
      console.error("Failed to mark task as starred", error);
      Toast.error(`Error: could not ${isStarred ? `unstar` : "star"} task`);
    }
  };

  const toggleArchiveTask = async (newStatus) => {
    try {
      await axiosPrivate.put(`/tasks/${task.id}/archive`, {
        isArchived: newStatus,
      });
      getTasks(); // Refresh the tasks
      setIsArchived(newStatus);
      Toast.success(
        `Task ${newStatus ? "archived" : "unarchived"} successfully!`
      );
    } catch (error) {
      console.error("Failed to update archive status", error);
      Toast.error("Failed to update archive status");
    }
  };

  return (
    <li className={styles.listItem}>
      <div className={styles.infoContainer}>
        <div className={styles.taskDetails}>
          <p className={styles.taskTilte}>{task.title}</p>
          <p
            className={`${styles.taskStatus} ${
              task.completion_status
                ? styles.taskStatusCompleted
                : styles.taskStatusPending
            }`}
          >
            {task.completion_status ? "completed" : "pending"}
          </p>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.editBtn}
          title="Edit task"
          onClick={() => setShowModal(true)}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          className={styles.deleteBtn}
          title="Delete task"
          onClick={() => {
            setShowConfirm(true);
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button
          className={styles.completeBtn}
          title="Complete/Uncomplete task"
          style={{ backgroundColor: `${isCompleted ? " #4caf50" : "gray"}` }}
          onClick={() => {
            toggleCompleteTask(!isCompleted);
          }}
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
        <button
          className={styles.starBtn}
          title="Star/Unstar task"
          onClick={() => {
            toggleStarTask(!isStarred);
          }}
        >
          <FontAwesomeIcon
            icon={faStar}
            style={{ color: `${isStarred ? "gold" : "black"}` }}
          />
        </button>
        <button
          className={`${styles.archiveBtn} ${
            task.archived_status ? styles.archived : ""
          }`}
          title="Archive/Unarchive task"
          onClick={() => {
            toggleArchiveTask(!isArchived);
          }}
        >
          <FontAwesomeIcon icon={faArchive} />
        </button>
      </div>
      {showModal && (
        <TaskModal
          mode={"edit"}
          setShowModal={setShowModal}
          getTasks={getTasks}
          task={task}
        />
      )}

      <ConfirmBox
        isVisible={showConfirm}
        message="Are you sure you want to delete this task?"
        onConfirm={deleteTask}
        onCancel={() => setShowConfirm(false)}
      />
    </li>
  );
};

export default Task;
