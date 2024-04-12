import React, { useEffect, useState } from 'react';
import Student from '../../interfaces/studentlist/studentlist';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

const BatchStudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [options, setBatchOptions] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [activeTab, setActiveTab] = useState<number>(2);

  useEffect(() => {
    const fetchStudentsDetails = async () => {
      try {
        fetch(`http://localhost:4000/mobilizationform?batchName=${selectedBatch}`)
        .then(response => response.json())
        .then((res) =>{
          const {data} = res;
          setStudents(data);
        })
        //setStudents(response.data); // Assuming the API returns an array of students
        console.log("details",students)

      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudentsDetails();
  }, [selectedBatch]);
  useEffect(() => {
  const fetchBatchOptions = async () => {
    try {
      fetch('http://localhost:4000/add-batch')
        .then(response => response.json())
        .then((res) => {
          const {data} = res;
          setData(data); 
          //console.log("students",data)
        })
      if( data && data.length > 0){
        const result = await data.map((value) => ({
          value: value.batchId,
          lable: value.batchName,
        }));
        setBatchOptions(result);
        console.log("console",options)
      }

    } catch (error) {
      console.error('Error fetching batch options:', error);
    }
   
  };
  fetchBatchOptions();
},[students]);

  return (
    <div>
      <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
        <TabList>
        <Tab>
            <Button component={Link} to="/students">Mobilization List</Button>
        </Tab>
        <Tab>
            <Button component={Link} to="/prescreening">Pre Screening Students</Button>
        </Tab>
        <Tab>
            <Button component={Link} to="/batchwisedetails">Selected Students</Button>
        </Tab>
        {/* <Tab>
            <Button component={Link} to="/studentattendance">Attendance Reports</Button>
        </Tab>
        <Tab>
            <Button component={Link} to="/subjecttracking">Subject Tracking</Button>
        </Tab> */}
        </TabList>
      </Tabs>
      <h2>Student List</h2>
      <label>Select Batch:</label>
      <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
        <option value="">Select Batch</option>
        {options && options.map((batch) => (
          <option key={batch.value} value={batch.lable}>
            {batch.lable}
          </option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Phone Number</td>
            <td>Qualification</td>
            {/* Add more table headers if needed */}
          </tr>
        </thead>
        {students.length > 0 ? (
        <tbody>
          {Array.isArray(students) && students.map(student => (
            <tr key={student.id}>
              <td>{student.studentName}</td>
              <td>{student.phoneNumber}</td>
              <td>{student.qualification}</td>
              {/* Render more table cells if needed */}
            </tr>
          ))}
        </tbody>
        ) : ( 
          <tbody>
          <tr>
            <td colSpan={3}>No students found</td>
          </tr>
        </tbody>
        )}
      </table>
    </div>
  );
};

export default BatchStudentList;
