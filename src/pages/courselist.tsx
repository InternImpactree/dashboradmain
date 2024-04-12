import React, { useEffect, useState } from 'react';
import Course from '../interfaces/courselist/courselist';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Tabs, TabList, Tab } from 'react-tabs';
import ReactPaginate from 'react-paginate';

const CourseList: React.FC = () => {
  const [course, setCourse] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(10);
  const studentsPerPage = 20;
  const offset = currentPage * studentsPerPage;
  const currentPageStudents = course.slice(offset, offset + studentsPerPage);

  useEffect(() => {
    // Fetch students from the API
    const fetchCourse = async () => {
      try {
        const response = await fetch('http://localhost:4000/addcourse');
        const result = await response.json();
        const { data } = result;
        setCourse(data);
        //console.log(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchCourse();
  }, []);
  
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
        <TabList>
        {/* <Tab>
            <Button component={Link} to="/centrelist">Center</Button>
        </Tab> */}
        {/* <Tab>
            <Button component={Link} to="/courses">Course</Button>
        </Tab>
        <Tab>
            <Button component={Link} to="/batchdetails">Batch</Button>
        </Tab> */}
        </TabList> 
      </Tabs>
      <div style ={{ width:'150px', display:'flex', float: 'right', justifyContent:'space-between'}}>
        <Link to="/addcourse">
          <button style={{ float: 'right' }}>
            Add New course
          </button>
        </Link>
        {/* <Link to="/addbatch">
          <button style={{ float: 'right' }}>
            Add New Batch
          </button>
        </Link> */}
        <br />
        </div>
        <h2>Course List</h2>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Course Name</th>
            <th>Category Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {course.map((newCourse, index) => (
            <tr key={newCourse.id}>
              <td>{index + 1}</td>
              <td>{newCourse.courseName}</td>
              <td>{newCourse.categoryName}</td>
              <td>{newCourse.location}</td>
              </tr>
          ))}
        </tbody>
      </table>
            <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(course.length / studentsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default CourseList;
