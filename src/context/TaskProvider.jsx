

import React, { createContext, useContext, useReducer, useMemo } from "react";

const TaskContext = createContext();

const initialState = {
  tasks: [],
  isLoading: true,
  error: null,
  searchQuery: '',
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  
    // Derived state for task counts
    const taskCounts = useMemo(() => {
      const archivedTasks = state.tasks.filter((task) => task.archived_status === true);
      const completedCount = state.tasks.filter((task) => task.completion_status === true).length;
      const starredCount = state.tasks.filter((task) => task.starred_status === true).length;
      const pendingCount = state.tasks.filter((task) => task.completion_status === false).length;
      
      const archivedDetails = {
        completed: archivedTasks.filter((task) => task.completion_status === true).length,
        pending: archivedTasks.filter((task) => task.completion_status === false).length,
        starred: archivedTasks.filter((task) => task.starred_status === true).length,
      };

    return { completedCount, starredCount, pendingCount, archivedCount: archivedTasks.length, archivedDetails };
  }, [state.tasks]);



  const contextValue = {
    tasks: state.tasks,
    isLoading: state.isLoading,
    error: state.error,
    searchQuery: state.searchQuery,
    filter: state.filter,
    taskCounts,
    setTasks: (tasks) => dispatch({ type: "SET_TASKS", payload: tasks }),
    setLoading: (isLoading) => dispatch({ type: "SET_LOADING", payload: isLoading }),
    setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
    setSearchQuery: (query) => dispatch({ type: "SET_SEARCH_QUERY", payload: query }),
  };

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
