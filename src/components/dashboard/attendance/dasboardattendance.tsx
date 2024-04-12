"use client"; 

import { AppBar, Button, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Col, Row } from 'antd';
import { GoGoal } from 'react-icons/go';
import { FiCheckCircle, FiGrid } from 'react-icons/fi';
import { SiBookstack } from 'react-icons/si';
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaGraduationCap } from 'react-icons/fa';
import { LiaGraduationCapSolid } from "react-icons/lia";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

const columns: GridColDef[] = [
  { field: 'batch', headerName: 'Batch', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'noOfStudents', headerName: 'No of Students', width: 130, type: 'number' },
  { field: 'averageAttendance', headerName: 'Average Attendance', width: 130, type: 'number' },
  { field: 'dropouts', headerName: 'Dropouts', width: 130, type: 'number' },
 ];
 

const rows = [
  { id: 1, batch: 'Batch 1', status: 'Active', noOfStudents: 25, averageAttendance: 85, dropouts: 2 },
  { id: 2, batch: 'Batch 2', status: 'Inactive', noOfStudents: 30, averageAttendance: 75, dropouts: 5 },
  { id: 3, batch: 'Batch 3', status: 'Active', noOfStudents: 20, averageAttendance: 90, dropouts: 1 },
  // Add more rows as needed
 ];
 
 const studentData=[
  {
    "label": "Absent",
    "value": 44
  },
  {
    "label": "Present",
    "value": 45
  },

]

 const teachersData=[
  {
    "label": "Absent",
    "value": 30
  },
  {
    "label": "Present",
    "value": 80
  },

]
const courseData=[
  {
    "label": "Absent",
    "value": 32
  },
  {
    "label": "Present",
    "value": 66
  },

]

const batchData=[
  {
    "label": "Absent",
    "value": 40
  },
  {
    "label": "Present",
    "value": 60
  },

]

const classData=[
  {
    "label": "Absent",
    "value": 40
  },
  {
    "label": "Present",
    "value": 60
  },

]


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

function DashboardAttendance(props:ReactDropdownProps) {


  const [value, onChange] = useState<Value>(new Date());
  const [batchOptions, setBatchOptions] = useState<any>();

  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [selectedOption3, setSelectedOption3] = useState('');
  const [selectedOption4, setSelectedOption4] = useState('');

  const options1 = ['Option 1', 'Option 2', 'Option 3'];
  const options2 = ['Option A', 'Option B', 'Option C'];
  const options3 = ['Apple', 'Banana', 'Orange'];
  const options4 = ['Apple', 'Banana', 'Orange'];

  useEffect(() => {
    // Function to fetch the total mobilized count from the API
    const fetchTotalMobilizedCount = async () => {
      try {
        // Make a GET request to the API endpoint that returns the total mobilized count
        const response = await axios.get('http://localhost:4000/add-batch');
        // Check if the request was successful
        if (response.status === 200) {
          // Extract the total mobilized count from the response data
          const {data} = response;
          const mobilizedCount = data.totalCount;
          setBatchOptions(mobilizedCount);
        } else {
          // Log an error message if the request was not successful
          console.error('Failed to fetch total mobilized count:', response.statusText);
        }
      } catch (error) {
        // Log any errors that occur during the request
        console.error('Error fetching total mobilized count:', error);
      }
    };

// Call the function to fetch the total mobilized count
fetchTotalMobilizedCount();
}, []);


  const handleChange1 = (option: { value: React.SetStateAction<string>; }) => {
    setSelectedOption1(option.value);
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

  
  return (
    <>
      <div>
        <AppBar position="static" sx={{ bgcolor: '#3485ae', boxShadow: 'none' }}>
          <Toolbar>
            <Button component={Link} to="/dashboard"><p style={{ color: "white", textTransform: "capitalize" }}>Mobilization</p></Button>
            <Button component={Link} to="/attendancedashboard"><b style={{ color: "black", textTransform: "capitalize" }}>Attendance</b></Button>
            <Button component={Link} to="/gradingdetails"><p style={{ color: "white", textTransform: "capitalize" }}>Grading</p></Button>
            {/* <Button component={Link} to="/studentsattendance"><p style={{ color: "white", textTransform: "capitalize" }}>Student Details</p></Button> */}
            {/* <Button component={Link} to="/training"><p style={{ color: "white", textTransform: "capitalize" }}>Training</p></Button> */}
                      </Toolbar>
        </AppBar>
      </div>
      {/* <div className="calendar-container">
        <div className="custom-calendar">
          <div >
            <Calendar onChange={onChange} value={value} />
          </div>
        </div>
      </div> */}



      


      <div className="dropdown-container">


        <div className="dropdown-wrapper">
          <h1></h1>
          <Dropdown
           options={[{ value: '', label: 'Vertical' }, ...options1]}
            value={selectedOption1}
            onChange={handleChange1} />
          {/* {selectedOption1 && <p>{infoForOption1[selectedOption1]}</p>} */}
        </div>


        <div className="dropdown-wrapper">
          <h1></h1>
          <Dropdown
            options={[{ value: '', label: 'Centre' }, ...options2]}
            value={selectedOption2}
            onChange={handleChange2} />
          {/* {selectedOption2 && <p>{infoForOption2[selectedOption2]}</p>} */}
        </div>

        <div className="dropdown-wrapper">
          <h1></h1>
          <Dropdown
            options={[{ value: '', label: 'Course' }, ...options3]}
            value={selectedOption3}
            onChange={handleChange3} />
          {/* {selectedOption3 && <p>{infoForOption3[selectedOption3]}</p>} */}
        </div>

        <div className="dropdown-wrapper">
          <h1></h1>
          <Dropdown
           options={[{ value: '', label: 'Batch' }, ...options4]}
            value={selectedOption4}
            onChange={handleChange4} />
          {/* {selectedOption4 && <p>{infoForOption4[selectedOption4]}</p>} */}
        </div>

      </div>

      <main className="main-container"> 
    <div className="flex-container">
    <div className="cards-container">
      <div className="main-cards">
      
        <div className="card">
          <div className="card-inner" style={{ fontFamily:  "Montserrat, sans-serif"}}>
            <p>Total Students </p>
            <div className="targeticon" style={{fontSize: '38px'}}>
            <PiStudentFill />
            </div>
        
          </div>
          
          <h3 className="card-value">200</h3>
        </div>
        <div className="card">
          <div className="card-inner" style={{ fontFamily:  "Montserrat, sans-serif"}}>
            <p>Total Teachers</p>
            <div className="acheivedicon" style={{fontSize:'38px', }}>
            <FaChalkboardTeacher />
            </div>
       
          </div>
          <h3 className="card-value">200</h3>
        </div>

        <div className="card">
          <div className="card-inner" style={{ fontFamily:  "Montserrat, sans-serif"}}>
            <p>Student's Attendance</p>
            <div className="acheivedicon" style={{fontSize:'38px', }}>
            <LiaGraduationCapSolid />
            </div>  
       
          </div>
          <h3 className="card-value">200</h3>
        </div>

        <div className="card">
          <div className="card-inner" style={{ fontFamily:  "Montserrat, sans-serif"}}>
            <p>Teacher's Attendance</p>
            <div className="acheivedicon" style={{fontSize:'38px', }}>
            <LiaChalkboardTeacherSolid />
            </div>
       
          </div>
          <h3 className="card-value">200</h3>
        </div>

        </div>
      </div>
</div>
</main>


<div className="charts-training">
  
<Row>




{/* <div className="charts-training"> */}

  <Col span={5}>
        <div className="dataCard customerCard-attendance">
          <Doughnut
            data={{
              labels: studentData.map((data: { label: string }) => data.label),
              datasets: [
                {
                  label: "Number",
                  data: studentData.map((data: { value: number }) => data.value),
                  backgroundColor: [
                    "rgb(41, 173, 178)",
                    "rgb(105, 98, 173)",
                 
                 
                  ],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            
              plugins: {
                datalabels: {
                  color: 'white',
                  font: {
                    size: 15
                  }
                },
                title: {
                  display: true,
                  text: "Student Attendance ",
                  font: {
                    size: 18,
                  },
                },
              },
            }}
          />
        </div>
        </Col>

<Col span={5}>
        <div className="dataCard customerCard-attendance"style={{marginLeft:'60px'}}>
          <Doughnut
            data={{
              labels: teachersData.map((data: { label: string }) => data.label),
              datasets: [
                {
                  label: "Number",
                  data: teachersData.map((data: { value: number }) => data.value),
                  backgroundColor: [
                    "rgb(52, 104, 192)",
                    "rgb(255, 152, 67)",
                 
                  ],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                datalabels: {
                  color: 'white',
                  font: {
                    size: 15
                  }
                },
                title: {
                  display: true,
                  text: "Teachers Attendance",
                  font: {
                    size: 18,
                  },
                },
              },
            }}
          />
        </div>
        </Col>

        <Col span={5}>
        <div className="dataCard customerCard-attendance" style={{marginLeft:'108px'}}>
          <Doughnut
            data={{
              labels: courseData.map((data: { label: string }) => data.label),
              datasets: [
                {
                  label: "Number",
                  data: courseData.map((data: { value: number }) => data.value),
                  backgroundColor: [
                    "rgb(41, 173, 178)",
                    "rgb(105, 98, 173)",
                
                  ],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                datalabels: {
                  color: 'white',
                  font: {
                    size: 15
                  }
                },
                title: {
                  display: true,
                  text: "Attendance % Course wise" ,
                  font: {
                    size: 18,
                  },
                },
              },
            }}
          />
        </div>
        </Col>

        <Col span={5}>
        <div className="dataCard customerCard-attendance" style={{marginLeft:'155px'}}>
          <Doughnut
            data={{
              labels: batchData.map((data: { label: string }) => data.label),
              datasets: [
                {
                  label: "Number",
                  data: batchData.map((data: { value: number }) => data.value),
                  backgroundColor: [
                    "rgb(52, 104, 192)",
                    "rgb(255, 152, 67)",
                 
                  ],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              responsive: true,
            maintainAspectRatio: false,
              plugins: {
                datalabels: {
                  color: 'white',
                  font: {
                    size: 15
                  }
                },
                title: {
                  display: true,
                  text: "Attendance % Batch wise ",
                  font: {
                    size: 18,
                  },
                },
              },
            }}
          />
        </div>
        </Col>


        </Row>
      </div> 
   








<Row>
  <Col span={16}>
      <div style={{ width: '97%', marginLeft:'10px', marginRight:'0px', backgroundColor:"white" , borderRadius:'10px'}}>
      <h3 style={{color: '#6A6A6A', paddingLeft:'10px', paddingTop:'10px'}}>Batch-Wise Attendance</h3>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection />
      </div>
      </Col>

<Col span={7}>
<div className="dataCard customerCard-attendance" style={{width:'345px', height:'285px',marginTop:'15px',marginRight:'30px', marginLeft:'0px', marginBottom:'30px'}}>
          <Doughnut
            data={{
              labels: batchData.map((data: { label: string }) => data.label),
              datasets: [
                {
                  label: "Number",
                  data: batchData.map((data: { value: number }) => data.value),
                  backgroundColor: [
                    "rgb(210, 69, 69)",
                    "rgb(55, 152, 67)",
                 
                  ],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              responsive: true,
            maintainAspectRatio: false,
              plugins: {
                datalabels: {
                  color: 'white',
                  font: {
                    size: 15
                  }
                },
                title: {
                  display: true,
                  text: "Class wise performance ",
                  font: {
                    size: 18,
                  },
                },
              },
            }}
          />
        </div>

</Col>


      </Row>
      </>
      
  );
}

export default DashboardAttendance;
