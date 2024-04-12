import React, { useEffect, useState } from 'react';
import Batch from '../interfaces/batchlist/batchlist';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Staffs from '../interfaces/staffslist';
import { Tab, TabList, Tabs } from 'react-tabs';
import ReactPaginate from 'react-paginate';
import SubjectForm from '../interfaces/subjectlist/subjectlist';

const BatchList: React.FC = () => {
  const [batch, setBatches] = useState<Batch[]>([]);
  const [ staffs, setStaffs] = useState<Staffs[]>([]);
  const [ subjects, setSubjects] = useState<SubjectForm[]>([]);
  const [activeTab, setActiveTab] = useState<number>(2);
  const [currentPage, setCurrentPage] = useState<number>(10);
  const batchesPerPage = 20;
  const offset = currentPage * batchesPerPage;
  const currentPageStudents = batch.slice(offset, offset + batchesPerPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch('http://localhost:4000/add-batch');
        const result = await response.json();
        const { data } = result;
        setBatches(data);
        //console.log("Batch",data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
  
    fetchBatches();
    //fetchStaffs();
    //fetchSubjects();
  }, []);

  const openModal = (batch: Batch) => {
    //console.log("batch", batch)
    setSelectedBatch(batch);
    setIsModalOpen(true);
  };

  useEffect(() => {
  const fetchStaffs = async (staffId:any) => {
    try {
      console.log("staff Id", staffId);
      const response = await fetch(`http://localhost:4000/teachersdetails?_id=${staffId}`);
      const result = await response.json();
      const { data } = result;
      setStaffs(data);
    } catch (error) {
      console.error('Error fetching staffs:', error);
    }
  };
}, []);

  async function fecthStaffs(staffId: any) {
  try {
    console.log("staff Id", staffId);
    const response = await fetch(`http://localhost:4000/teachersdetails?_id=${staffId}`);
    const result = await response.json();
    const { data } = result;
    setStaffs(data);
  } catch (error) {
    console.error('Error fetching staffs:', error);
  }
  return Response;
}

  useEffect(() => {
  const fetchSubjects = async () => {
    try {
      const response = await fetch('http://localhost:4000/subjectdetails');
      const result = await response.json();
      const { data } = result;
      setSubjects(data);
    } catch (error) {
      console.error('Error fetching staffs:', error);
    }
  };
}, []);
  
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
      
  return (
    <div>
      <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
        {/* <TabList> */}
        {/* <Tab>
            <Button component={Link} to="/centrelist">Center</Button>
        </Tab>
        <Tab>
            <Button component={Link} to="/courses">Course</Button>
        </Tab>
        <Tab>
            <Button component={Link} to="/batchdetails">Batch</Button>
        </Tab>
        </TabList>  */}
      </Tabs>
      
      <div style ={{ width:'400px', display:'flex', float: 'right', justifyContent:'space-around'}}>
        <Link to="/addbatch">
          <button style={{ float: 'right', marginBottom:"2%" }}>
            Add New Batch
          </button>
        </Link>
        <Link to="/addsubject">
          <button style={{ float: 'right' }}>
            Add New Subject
          </button>
        </Link>
        <Link to="/addstaff">
          <button style={{ float: 'right' }}>
            Add New Staff
          </button>
        </Link>
        <br/>
      </div>
     {/* <br/>
      <br/>  */}
      <h2>Batch List</h2>
      {/* <div> */}
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Batch Name</th>
            <th>Program Name</th>
            <th> View </th>
          </tr>
        </thead>
        <tbody>
          {batch.map((newbatch, index) => (
            <tr key={newbatch._id}>
              <td>{index + 1}</td>
              <td>{newbatch.batchName}</td>
              <td>{newbatch.programType}</td>
              <td>
                <button onClick={() => openModal(newbatch)}>View</button>
              </td>
              </tr>
          ))}
        </tbody>
      </table>
     {/* </div>  */}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(batch.length / batchesPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      {isModalOpen && selectedBatch && (
            <div className="modal-container">
              <div className="modal-content">
                <span className="close" onClick={() => setIsModalOpen(false)}>
                  &times;
                    </span>
                      <h2>Batch Details</h2>
                      <p>Batch ID: {selectedBatch.batchId}</p>
                      <p>Batch Name: {selectedBatch.batchName}</p>
                      <p>Program Type: {selectedBatch.programType}</p>
                      <p>Course Name: {selectedBatch.courseName}</p>
                      <p>Number of Students: {selectedBatch.numberOfStudents}</p>
                      <p>Start Date: {selectedBatch.batchStartDate}</p>
                      <p>End Date: {selectedBatch.batchEndDate}</p>
                      <p>Staff Name: {selectedBatch.staffId}</p>
                      <p>Subject Name: {selectedBatch.subjectName} </p>
                       {/* Add other details as needed */}
                </div>
              </div>
        )}
    </div>
  );
};

export default BatchList;
