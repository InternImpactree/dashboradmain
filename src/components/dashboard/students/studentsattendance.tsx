"use client"; 

import { AppBar, Button, Toolbar } from '@mui/material';
import { Select } from "antd";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Link ,useLocation } from 'react-router-dom';
import Batch from '../../../interfaces/batchlist/batchlist';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
interface Option {
  label: React.ReactNode;
  value: string;
  className?: string;
  data?: {
    [dataAttribute: string]: string | number
  };
}
interface Group {
  type: "group";
  name: string;
  items: Option[];
}
interface ReactDropdownProps {
  options: (Group | Option | string)[];
  baseClassName?: string;
  className?: string;
  controlClassName?: string;
  placeholderClassName?: string;
  menuClassName?: string;
  arrowClassName?: string;
  disabled?: boolean;
  arrowClosed?: React.ReactNode,
  arrowOpen?: React.ReactNode,
  onChange?: (arg: Option) => void;
  onFocus?: (arg: boolean) => void;
  value?: Option | string;
  placeholder?: String;
}

function StudentsAttendance(props:ReactDropdownProps) {

  const [batchOptions, setBatchOptions] = useState<any[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<any>('');
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<string>('');
  const [attDetails, setAttDetails] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false); // Track if attendance is already submitted for the day
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate() + 1);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [currentPage, setCurrentPage] = useState<number>(0);
  const studentsPerPage = 10;
  const [batches, setBatches] = useState<any>();
//     { id: 1, name: 'a', status: 'Absent' },
//     { id: 2, name: 'b',status: 'Absent' },
//     { id: 3, name: 'c', status: 'Present'},
//     { id: 4, name: 'd', status: 'Present'},
//     { id: 5, name: 'e', status: 'Present' },
//     { id: 6, name: 'f',status: 'Present' },
//     { id: 7, name: 'g', status: 'Present' },
// ]);


// const handleCheckboxChange = (batchId: any) => {
//     setBatches(batches.map(batch => 
//         batch.id === batchId ? { ...batch, selected: !batch.selected } : batch
//     ));
// };

    const handleChangeMonth = (month:any) => {
      setSelectedMonth(month);
      // Perform any other actions based on the selected month if needed
    };

    const handleChangeYear = (year:any) => {
      setSelectedYear(year);
      // Perform any other actions based on the selected year if needed
    };

  const [value, onChange] = useState<Value>(new Date());

  const [selectedOption2, setSelectedOption2] = useState('');
  const [selectedOption3, setSelectedOption3] = useState('');
  const [selectedOption4, setSelectedOption4] = useState('');

  const options1 = ['Option 1', 'Option 2', 'Option 3'];
  const months = [{label:'Jan', value:'1'},
                    {label:'Feb', value:'2'},
                    {label:'March', value:'3'},
                    {label:'April', value:'4'},
                    {label:'May', value:'5'},
                    {label:'June', value:'6'},
                    {label:'July', value:'7'},
                    {label:'Aug', value:'8'},
                    {label:'Sep', value:'9'},
                    {label:'Oct', value:'10'},
                    {label:'Nov', value:'11'},
                    {label:'Dec', value:'12'},
                  ];
  const options3 = ['Apple', 'Banana', 'Orange'];
  const options4 = ['Apple', 'Banana', 'Orange'];

  useEffect(() => {
    const fetchBatchOptions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/add-batch');
        const { data } = response.data;
        setBatchOptions(data || []);
        console.log("batchOptions",batchOptions);
      } catch (error) {
        console.error('Error fetching batch options:', error);
      }
    };

    fetchBatchOptions();
  }, []);

  useEffect(() => {
    const fetchStudentsAttendance = async (id: string) => {
      try {
        console.log("id",id);
        const response = await axios.get(`http://localhost:4000/studentattendancedetails?batchId=${id}`);
        const res = response;
        const { data } = res.data;

        const student = data.map((element: any) => ({
          attendanceStatuses: element.attendance.map((attendanceItem: any) => ({
            studentName: attendanceItem.studentName,
          })),
          }));
          setStudents(student);
         //console.log("students",students);
        const details = data.map((element: any) => ({
          attendanceStatuses: element.attendance.map((attendanceItem: any) => ({
            studentId: attendanceItem.studentId,
            studentName: attendanceItem.studentName,
            attendanceStatus: attendanceItem.attendanceStatus,
          })),
          batchId: element.batchId,
          batchName: element.batchName,
          dateOfAttendance: element.dateOfAttendance,
        }));
        setBatches(details);
        console.log("batches",batches);
        setAttDetails(details);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

     if (selectedBatchId) {
       fetchStudentsAttendance(selectedBatchId);
     }
   }, [selectedBatch]);

  const handleBatchChange = (option: { value: React.SetStateAction<string> }) => {
    setSelectedBatch(option);
    setSelectedBatchId(option.value);
    //fetchStudentsAttendance(selectedBatchId);
  };

  const handleBatchChange1 = (value:any) => {
    const selectedBatch = JSON.parse(value);
    setSelectedBatch(selectedBatch);
    const batchId =  selectedBatch.batchId
    setSelectedBatchId(batchId);
    };

  const handleChange2 = (option: { value: React.SetStateAction<string>; }) => {
    setSelectedOption2(option.value);
  };

  const handleChange3 = (option: { value: React.SetStateAction<string>; }) => {
    setSelectedOption3(option.value);
  };

  const handleChange4 = (option: { value: React.SetStateAction<string>; }) => {
    setSelectedOption4(option.value);
  };

  const infoForOption1 = {
    'Option 1': 'Information for Option 1',
    'Option 2': 'Information for Option 2',
    'Option 3': 'Information for Option 3',
  };

  const infoForOption2 = {
    'Option A': 'Information for Option A',
    'Option B': 'Information for Option B',
    'Option C': 'Information for Option C',
  };

  const infoForOption3 = {
    'Apple': 'Information for Apple',
    'Banana': 'Information for Banana',
    'Orange': 'Information for Orange',
  };

  const infoForOption4 = {
    'Apple': 'Information for Apple',
    'Banana': 'Information for Banana',
    'Orange': 'Information for Orange',
  };

const location = useLocation();
  return (
    <>
      <div>
      <AppBar position="static" sx={{ bgcolor: '#3485ae', boxShadow: 'none'}}>
          <Toolbar>
          <Button component={Link} to="/dashboard"><p style={{color:"white",textTransform: "capitalize"}}>Mobilization</p></Button>
          <Button component={Link} to="/attendancedashboard"><p style={{color:"white",textTransform: "capitalize"}}>Attendance</p></Button>
          <Button component={Link} to="/gradingdetails"><p style={{color:"white",textTransform: "capitalize"}}>Grading</p></Button>
          <Button component={Link} to="/studentsattendance"><b style={{color:"black",textTransform: "capitalize"}}>Student Details</b></Button>
          <Button component={Link} to="/training"><p style={{color:"white",textTransform: "capitalize"}}>Training</p></Button>
          </Toolbar>
        </AppBar>
        </div>
    
        <div className="dropdown-container-students">

        <div className="dropdown-wrapper-students">
            <h1></h1>
            <Dropdown
              options={[...batchOptions.map(batch => ({ value: batch._id, label: batch.batchName }))]}
              value={selectedBatch}
              onChange={handleBatchChange} />
          </div>
          <div className="dropdown-wrapper-students">
            <h1></h1>
            <Dropdown
              //options={[{ value: '', label: 'Month' }, ...Months]}
              options={[...months.map(month => ({ value: month.value, label: month.label }))]}
              value={selectedOption2}
              onChange={handleChange2} />
          </div>
  
          <div className="dropdown-wrapper-students">
            <h1></h1>
            <Dropdown
              options={[{ value: '', label: 'Centre' }, ...months]}
              value={selectedOption2}
              onChange={handleChange2} />
            {/* {selectedOption2 && <p>{infoForOption2[selectedOption2]}</p>} */}
          </div>
  
          <div className="dropdown-wrapper-students">
            <h1></h1>
            <Dropdown
              options={[{ value: '', label: 'Course' }, ...options3]}
              value={selectedOption3}
              onChange={handleChange3} />
            {/* {selectedOption3 && <p>{infoForOption3[selectedOption3]}</p>} */}
          </div>
  
          <div className="dropdown-wrapper-students">
            <h1></h1>
            <Dropdown
              options={[{ value: '', label: 'Batch' }, ...options4]}
              value={selectedOption4}
              onChange={handleChange4} />
            {/* {selectedOption4 && <p>{infoForOption4[selectedOption4]}</p>} */}
          </div>
          </div>

      <h2 style={{textAlign:"center"}}>Attendance</h2>


      <table className='tablestudents'>
        <thead>
          <tr>
            {/* <th><input type="checkbox" checked={batches.every(batch => batch.selected)} onChange={() => handleCheckboxChange('all')} /></th> */}
            <th>Name</th>
            <th>May 1,2023</th>
            <th>May 2,2023</th>
            <th>May 3,2023</th>
            <th>May 4,2023</th>
            <th>May 4,2023</th>
            <th>May 4,2023</th>
            <th>May 4,2023</th>
          </tr>
        </thead>
        <tbody>
          {/* {batches.map((batch:any) => (
            <tr key={batch.id}>
              <td>{batch.name}</td>
              <td>{batch.status}</td>
              <td>{batch.status}</td>
              <td>{batch.status}</td>
              <td>{batch.status}</td>
              <td>{batch.status}</td>
              <td>{batch.status}</td>
              <td>{batch.status}</td>
             
              
            </tr>
          ))} */}
        </tbody>
      </table>
      </>
      
     
  );
}

export default StudentsAttendance;