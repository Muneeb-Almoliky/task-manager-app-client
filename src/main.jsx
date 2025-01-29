import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { TaskProvider } from './context/TaskProvider';
import './index.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Router>
      <AuthProvider>
        <TaskProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </TaskProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>

);


