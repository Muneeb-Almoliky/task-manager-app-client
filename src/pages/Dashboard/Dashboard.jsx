import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import styles from "./Dashboard.module.css";
import TasksTitle from "../../components/TasksHeader/TasksHeader";
import useTasks from "../../hooks/useTasks";

// Register the required components and scales with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { taskCounts } = useTasks();

  const completedData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Tasks",
        data: [taskCounts.completedCount, taskCounts.pendingCount],
        backgroundColor: ["#4caf50", "#ff9800"],
      },
    ],
  };

  const data = {
    labels: ["Starred", "Completed", "Pending", "Archived"],
    datasets: [
      {
        label: "Tasks",
        data: [
          taskCounts.starredCount,
          taskCounts.completedCount,
          taskCounts.pendingCount,
          taskCounts.archivedCount,
        ],
        backgroundColor: ["yellow", "green", "orange", "gray"],
      },
    ],
  };

  return (
    <div className={styles.dashboard}>
      <TasksTitle />
      <div className={styles.container}>
        <div className={styles.tasksTotal}>
          <p>
            Total Number Of Tasks{" "}
            <span>{taskCounts.completedCount + taskCounts.pendingCount}</span>
          </p>
        </div>
        <div className={styles.taskStatistics}>
          <div>
            <Tippy
              content={`Archived Completed: ${taskCounts.archivedDetails.completed}`}
              placement="top"
              className={styles.tippy}
              arrow={false}
            >
              <p>
                Completed <span>{taskCounts.completedCount}</span>
              </p>
            </Tippy>
            <Tippy
              content={`Archived Pending: ${taskCounts.archivedDetails.pending}`}
              placement="top"
              className={styles.tippy}
              arrow={false}
            >
              <p>
                Pending <span>{taskCounts.pendingCount}</span>
              </p>
            </Tippy>
          </div>
          <div>
            <Tippy
              content={`Archived Starred: ${taskCounts.archivedDetails.starred}`}
              placement="top"
              className={styles.tippy}
              arrow={false}
            >
              <p>
                Starred <span>{taskCounts.starredCount}</span>
              </p>
            </Tippy>
            <Tippy
              content={`{Completed: ${taskCounts.archivedDetails.completed}, Pending: ${taskCounts.archivedDetails.pending} Starred: ${taskCounts.archivedDetails.starred}}`}
              placement="top"
              className={styles.tippy}
              arrow={false}
            >
              <p>
                Archived <span>{taskCounts.archivedCount}</span>
              </p>
            </Tippy>
          </div>
        </div>
        <div className={styles.chartContainer}>
          <Bar data={data} options={{ responsive: true }} />
        </div>

        <div className={styles.chartContainer}>
          <Doughnut data={completedData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
