import { useParams } from "react-router-dom";
import styles from './TasksHeader.module.css';
import AddTaskBtn from "../AddTaskBtn/AddTaskBtn";


const TasksTitle = () => {
    const { status } = useParams();
    return(
        <div className={styles.tasksHeader}>
            <h2 >{status==undefined? 'Dashboard':  `${status} tasks`} </h2>
            <AddTaskBtn />
        </div>
    )
}

export default TasksTitle;