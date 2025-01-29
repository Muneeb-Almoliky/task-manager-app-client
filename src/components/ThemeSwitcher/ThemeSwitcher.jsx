import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/ThemeContext";
import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={styles.themeSwitcher}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "1.5rem",
      }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title="Switch theme"
    >
      <FontAwesomeIcon
        icon={theme === "light" ? faMoon : faSun}
        color={`${theme === "light" ? "black" : "white"}`}
      />
    </button>
  );
};

export default ThemeSwitcher;
