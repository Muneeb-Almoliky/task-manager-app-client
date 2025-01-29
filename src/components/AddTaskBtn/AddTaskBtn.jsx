import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from './AddTaskBtn.module.css';
import { useState } from "react";
import useTasks from "../../hooks/useTasks";
import TaskModal from "../TaskModal/TaskModal";

const AddTaskBtn = ({top, left}) => {
    const [showModal, setShowModal] = useState(false);
    const { getTasks, getTaskCounts } = useTasks();

    return(
        <>
            <button className={styles.addTask} style={{top: top, left: left}} onClick={() => setShowModal(true)}>
                    <FontAwesomeIcon icon={faPlus} /> Add Task
            </button>
            {showModal && <TaskModal mode={'create'}   setShowModal={setShowModal} getTasks={getTasks} getTaskCounts={getTaskCounts}/>}
        </>
    );
}

export default AddTaskBtn;