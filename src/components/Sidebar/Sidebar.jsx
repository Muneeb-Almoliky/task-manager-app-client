import React, {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import styles from './Sidebar.module.css';
import Profile from '../Profile/Profile';

const Sidebar = ({isAuthenticating}) => {
  const [isOpen, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;


  const sidebarData = [
    {
      to: '/dashboard',
      title: 'Dashboard'
    },
    {
      to: '/tasks/all',
      title: 'All Tasks'
    },
    {
      to: '/tasks/completed',
      title: 'Completed Tasks'
    },
    {
      to: '/tasks/pending',
      title: 'Pending Tasks'
    },
    {
      to: '/tasks/starred',
      title: 'Starred Tasks'
    },
    {
      to: '/tasks/archived',
      title: 'Archived Tasks'
    }
  ]

  const handleClick = () => {
    if (window.innerWidth <= 1000){
      setOpen(false)
    }
  }

  useEffect(() => {
    // Detect screen size and update sidebar state
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setOpen(false); 
      } else {
        setOpen(true); 
      }
    };

    handleResize(); // Set initial state based on current screen size
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
    <div  className={`${isOpen ? styles.sidebarActive : ''} ${styles.sidebar}`}>
      <Profile isAuthenticating={isAuthenticating} isOpen={isOpen} setOpen={setOpen}/>
      <div className={styles.hamburger}>
      <Hamburger toggled={isOpen} toggle={setOpen} className={styles.hamburgerIcon}/>
      </div>
      <nav className={isOpen ? styles.active : ''}>
        <ul>
          {sidebarData.map((item, index) => {
              return (
                <li key={index} onClick={handleClick} className={isActive(item.to) ? styles.active:''}><Link to={item.to}>{item.title}</Link></li>
              )
          })}
       </ul>
      </nav>
      
    </div>
    <div className={styles.overlay}></div>

    </>
  );
};

export default Sidebar;