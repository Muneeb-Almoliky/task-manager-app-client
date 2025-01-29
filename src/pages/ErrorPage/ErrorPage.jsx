import React from 'react';
import styles from './ErrorPage.module.css'

const ErrorPage = () => {
    return (
        <div className={styles.errorPage}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
        </div>
    );
};

export default ErrorPage;