// import { useTaskContext } from "../context/TaskProvider";
// import  useAxiosPrivate  from "./useAxiosPrivate";
// import { useCookies } from "react-cookie";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import { useState } from "react";

// const useTasks = () => {
//     const { tasks, setTasksData, isloading, setLoading, error, setErrorState, filteredTasks, setFilteredTasks, taskCounts, setTaskCounts } = useTaskContext();
//     const axiosPrivate = useAxiosPrivate();
//     const [cookies, setCookie] = useCookies(['email']);
//     const email = cookies.email;
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { status } = useParams();


//     const getTasks = async () => {
//         try {
//             const response = await axiosPrivate.get(`/todos/${email}`);
//             console.log('Response:', response); // Log response
//             console.log(response.data);
//             if (response?.data) {
//                 const filtered = response.data.filter((task) => {
//                     if (status === 'completed') return task.completion_status;
//                     if (status === 'pending') return !task.completion_status;
//                     if (status === 'starred') return task.starred_status;
//                     return true;
//                 });
                
//                 console.log('Filtered Tasks:', filtered); // Log filtered tasks
//                 setTasksData(filtered);
//                 setFilteredTasks(filtered)
//             }    
//         } catch (error) {
//             console.error('Failed to fetch tasks', error);
//             navigate('/login', { state: { from: location}, replace: true });
//         } 
//     };

//     const getTaskCounts = async () => {
//         try {
//           const response = await axiosPrivate.get(`/todos/count/${email}`);
//           setTaskCounts(response.data);
//         } catch (error) {
//           console.error('Failed to fetch task counts', error);
//         }
//       };

//     const searchTasks = (query) => {
//         console.log("Search query:", query); // Debugging
//         if (!tasks || tasks.length === 0) return;
      
//         if (query.trim() === "") {
//           setFilteredTasks(tasks); // Reset to all tasks if query is empty
//         } else {
//           const filtered = tasks.filter((task) =>
//             task.title.toLowerCase().includes(query.toLowerCase())
//           );
//           setFilteredTasks(filtered);
//           console.log("Filtered Tasks:", filtered); // Debugging
//           console.log(filteredTasks);
//         }
//       };
      

//     return { tasks, setTasksData, isloading, setLoading, error, setErrorState, getTasks, searchTasks, filteredTasks, taskCounts, getTaskCounts};
// }

// export default useTasks;

import { useTaskContext } from "../context/TaskProvider";
import useAxiosPrivate from "./useAxiosPrivate";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useMemo} from "react";


const useTasks = () => {
  const { tasks, setTasks, isLoading, setLoading, error, setError, taskCounts, searchQuery, setSearchQuery } = useTaskContext();
  const axiosPrivate = useAxiosPrivate();
  const [cookies, setCookie] = useCookies(['email']); 
  const email = cookies.email; 
  const navigate = useNavigate();
  const location = useLocation();

  const getTasks = async () => {
    try {
        const response = await axiosPrivate.get(`/tasks/${email}`);
        console.log('Response:', response); // Log response
        console.log(response.data);
        setTasks(response.data);
        if(response.status === 404){
          setTasks([]);
        }
    } catch (error) {
        console.error('Failed to fetch tasks', error);
        navigate('/login', { state: { from: location}, replace: true });
    } 
};


  return {
    tasks,
    isLoading,
    error,
    taskCounts,
    searchQuery,
    getTasks,
    setLoading,
    setError,
    setSearchQuery
  };
};

export default useTasks;
