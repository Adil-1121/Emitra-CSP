// 📂 src/components/LanguageDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "primereact/tooltip";
import "./languageDropdown.scss";

const LanguageDropdown = () => {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const boxRef = useRef();

  // Close dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (lang) => {
    setLanguage(lang);
    setOpen(false);
  };

  return (
    <div className="language-wrapper" ref={boxRef}>
      <div className="item" onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faGlobe} className="icon" />
        {language}
        <Tooltip
          target=".language-wrapper .item"
          content="Language"
          position="bottom"
        />
      </div>

      {open && (
        <div className="language-box">
          <ul>
            <li onClick={() => handleSelect("English")}>English</li>
            <li onClick={() => handleSelect("हिन्दी")}>हिन्दी</li>
            <li onClick={() => handleSelect("ગુજરાતી")}>ગુજરાતી</li>
            <li onClick={() => handleSelect("اردو")}>اردو</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
