import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface OptionType {
 label: string;
 path: string;
}

interface DropdownProps {
 label: string;
 options: OptionType[]; // Use the OptionType interface here
}

const Dropdown: React.FC<DropdownProps> = ({ label, options }) => {
 const [isOpen, setIsOpen] = useState(false);

 const toggleOpen = () => setIsOpen(!isOpen);

 return (
    <div className="dropdown" onMouseEnter={toggleOpen} onMouseLeave={toggleOpen}>
      <button className="dropdown-button">{label}</button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li key={index}>
              <Link to={option.path}>{option.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
 );
};

export default Dropdown;
