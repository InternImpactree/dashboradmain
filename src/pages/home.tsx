import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import StudentList from '../pages/studentlist';
import BatchList from '../pages/batchlist';

const MainPage: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/students">Students</Link>
            </li>
            <li>
              <Link to="/batches">Batches</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Route path="/">
          <Home />
        </Route>
        <Route path="/students">
          <StudentList />
        </Route>
        <Route path="/batches">
          <BatchList />
        </Route>
      </div>
    </Router>
  );
};

const Home: React.FC = () => {
  return <h2>Welcome to Student Batch Tracking System!</h2>;
};

export default MainPage;
