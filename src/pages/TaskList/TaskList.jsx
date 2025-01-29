import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import Task from "../../components/Task/Task";
import useTasks from "../../hooks/useTasks";
import styles from "./TaskList.module.css";
import TasksTitle from "../../components/TasksHeader/TasksHeader";

const TaskList = () => {
  const { status } = useParams();
  const { tasks, searchQuery } = useTasks(); 

  // Derived state for filtered tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    switch (status) {
      case "completed":
        filtered = tasks.filter(
          (task) => task.completion_status && !task.archived_status
        );
        break;
      case "starred":
        filtered = tasks.filter(
          (task) => task.starred_status && !task.archived_status
        );
        break;
      case "pending":
        filtered = tasks.filter(
          (task) => !task.completion_status && !task.archived_status
        );
        break;
      case "archived":
        filtered = tasks.filter((task) => task.archived_status);
        break;
      case "all":
        filtered = tasks.filter((task) => !task.archived_status);
        break;

      default:
        filtered = tasks; // Default to showing all tasks
    }

    if (searchQuery) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [tasks, status, searchQuery]);

  return (
    <>
      <TasksTitle />
      <div className={styles.tasksContainer}>
        {filteredTasks && filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <Task key={task.id} task={task} />)
        ) : (
          <p className={styles.noTasks}>
            No {status === "all" ? "" : status} tasks found!
          </p>
        )}
      </div>
    </>
  );
};

export default TaskList;
