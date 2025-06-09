import React, { useState } from "react";
import "./VerticalNavbar.css";

const CustomDropdown = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="custom-dropdown">
      <div
        className="dropdown-header"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {label}
        <span className={`arrow ${isOpen ? "open" : ""}`}>&#9662;</span>
      </div>
      <div className={`dropdown-body ${isOpen ? "open" : ""}`}>
        {items.map((item, index) => (
          <div key={index} className="dropdown-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const VerticalNavbar = () => {
  return (
    <div className="vertical-navbar">
      <h1>Header</h1>
      <div className="dropdown-stack">
        <CustomDropdown label="Drop menu 1" items={["1", "2", "3"]} />
        <CustomDropdown label="Drop menu 2" items={["1", "2", "3"]} />
        <CustomDropdown label="Drop menu 3" items={["1", "2", "3"]} />
      </div>
    </div>
  );
};

export default VerticalNavbar;
