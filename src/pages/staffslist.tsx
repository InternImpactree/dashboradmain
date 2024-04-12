import React, { useEffect, useState } from 'react';
import Staffs from '../interfaces/staffslist';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const StaffsList: React.FC = () => {
  const [staffs, setStaffs] = useState<Staffs[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const staffsPerPage = 20;
  const offset = currentPage * staffsPerPage;
  const currentPageStudents = staffs.slice(offset, offset + staffsPerPage);


  useEffect(() => {
    // Fetch students from the API
    const fetchBatches = async () => {
      try {
        const response = await fetch('http://localhost:4000/teachersdetails');
        const result = await response.json();
        const { data } = result;
        setStaffs(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchBatches();
  }, []);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <h2>Staff List</h2>
      <div>
      <Link to="/staffattendance">
          <button style={{ float: 'left' }}>
            Attendance
          </button>
        </Link>
      <Link to="/addstaff">
          <button style={{ float: 'right' }}>
            Add New Staff
          </button>
        </Link>
      <br />
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Staff Name</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {staffs.map((newstaff, index) => (
            <tr key={newstaff.staffId}>
              <td>{index + 1}</td>
              <td>{newstaff.staffName}</td>
              <td>{newstaff.phoneNumber}</td>
              <td>{newstaff.address}</td>
              </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(staffs.length / staffsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default StaffsList;
