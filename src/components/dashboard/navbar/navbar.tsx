"use client";
import React, { FC } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
}

const CustomLink: FC<CustomLinkProps> = ({ to, children, ...props }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};

const Navbar: FC = () => {
  return (
    <nav className="nav">
      <ul>
        <CustomLink to="/home">Home</CustomLink>
        <CustomLink to="/mobilization">Mobilization</CustomLink>
        <CustomLink to="/training">Training</CustomLink>
        <CustomLink to="/admissions">Admissions</CustomLink>
        <CustomLink to="/placements">Placements</CustomLink>
        <CustomLink to="/attendance">Attendance</CustomLink>
      </ul>
    </nav>
  );
};

export default Navbar;