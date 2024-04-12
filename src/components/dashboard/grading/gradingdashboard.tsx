"use client"; 

import { AppBar, Button, Toolbar } from '@mui/material';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


interface Column {
  id: 'studentName' | 'maths' | 'science' | 'history' |'geo';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string | number) => string;
 }
 
 const columns: readonly Column[] = [
  { id: 'studentName', label: 'Student Name', minWidth: 150 },
  { id: 'maths', label: 'Maths', minWidth: 140, align: 'right' },
  { id: 'science', label: 'Science', minWidth: 140, align: 'right' },
  { id: 'history', label: 'History', minWidth: 140, align: 'right' },
  { id: 'geo', label: 'Geo', minWidth: 140, align: 'right' },
 ];
 
interface tableData {
  studentName: string;
  maths: number;
  science: number;
  history: number;
  geo:number;
 }

 function createData(
  studentName: string,
  maths: number,
  science: number,
  history: number,
  geo:number
 ): tableData {
  return {
     studentName,
     maths,
     science,
     history,
     geo
  };
 }
 
 const rows = [
  createData('John Doe', 85, 75, 80,90),
  createData('Jane Smith', 90, 85, 87.5,40),
  createData('Jane Smith', 90, 85, 87.5,40),
  createData('Jane Smith', 90, 85, 87.5,40),
  createData('Jane Smith', 90, 85, 87.5,40),
  createData('Jane Smith', 90, 85, 87.5,40),
  createData('Jane Smith', 90, 85, 87.5,40),
  createData('Jane Smith', 90, 85, 87.5,40),
  createData('Jane Smith', 90, 85, 87.5,40),
  createData('Jane Smith', 90, 85, 87.5,40),
  createData('Jane Smith', 90, 85, 87.5,40),
  createData('Jane Smith', 90, 85, 87.5,40),
  createData('Jane Smith', 90, 85, 87.5,40),
  // Add more rows as needed
];



interface Data {
    label: string;
    value: number;
  }

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

function GradingDashboard(props:ReactDropdownProps) {
    const [value, onChange] = useState<Value>(new Date());

    const [selectedOption1, setSelectedOption1] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    const [selectedOption3, setSelectedOption3] = useState('');
    const [selectedOption4, setSelectedOption4] = useState('');
  
    const options1 = ['Option 1', 'Option 2', 'Option 3'];
    const options2 = ['Option A', 'Option B', 'Option C'];
    const options3 = ['Apple', 'Banana', 'Orange'];
    const options4 = ['Apple', 'Banana', 'Orange'];
  
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
  


    const sourceData = [
      { label: 'Science', passed: 80, failed: 20, notAttended: 5 },
      { label: 'Maths', passed: 70, failed: 30, notAttended: 10 },
      { label: 'History', passed: 90, failed: 10, notAttended: 3 },
      { label: 'English', passed: 60, failed: 36, notAttended: 4 },
      { label: 'Geo', passed: 80, failed: 18, notAttended: 2 },
      { label: 'Hindi', passed: 70, failed: 27, notAttended: 3 },
      // Add more subjects as needed
    ];
    
    const statusData=[
      { "label": "Science", 
         "value": 30 },
      { "label": "Maths", 
        "value": 20 },
      { "label": "Physics",
        "value": 15 },
      { "label": "Chem",
        "value": 10 },
      { "label": "Bio",
        "value": 8 },
      { "label": "Geo", 
        "value": 17 }
    ]

    const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };




    return (
      
                 <><div>
        <AppBar position="static" sx={{ bgcolor: '#3485ae', boxShadow: 'none' }}>
          <Toolbar>
            <Button component={Link} to="/dashboard"><p style={{ color: "white", textTransform: "capitalize" }}>Mobilization</p></Button>
            <Button component={Link} to="/attendancedashboard"><p style={{ color: "white", textTransform: "capitalize" }}>Attendance</p></Button>
            <Button component={Link} to="/gradingdetails"><b style={{ color: "black", textTransform: "capitalize" }}>Grading</b></Button>
            {/* <Button component={Link} to="/studentsattendance"><p style={{ color: "white", textTransform: "capitalize" }}>Student Details</p></Button> */}
            {/* <Button component={Link} to="/training"><p style={{ color: "white", textTransform: "capitalize" }}>Training</p></Button> */}

          </Toolbar>
        </AppBar>
      </div><div className="dropdown-container-grading">


          <div className="dropdown-wrapper-grading">
            <h1></h1>
            <Dropdown
              options={[{ value: '', label: 'Vertical' }, ...options1]}
              value={selectedOption1}
              onChange={handleChange1} />
            {/* {selectedOption1 && <p>{infoForOption1[selectedOption1]}</p>} */}
          </div>


          <div className="dropdown-wrapper-grading">
            <h1></h1>
            <Dropdown
              options={[{ value: '', label: 'Centre' }, ...options2]}
              value={selectedOption2}
              onChange={handleChange2} />
            {/* {selectedOption2 && <p>{infoForOption2[selectedOption2]}</p>} */}
          </div>

          <div className="dropdown-wrapper-grading">
            <h1></h1>
            <Dropdown
              options={[{ value: '', label: 'Course' }, ...options3]}
              value={selectedOption3}
              onChange={handleChange3} />
            {/* {selectedOption3 && <p>{infoForOption3[selectedOption3]}</p>} */}
          </div>

          <div className="dropdown-wrapper-grading">
            <h1></h1>
            <Dropdown
              options={[{ value: '', label: 'Batch' }, ...options4]}
              value={selectedOption4}
              onChange={handleChange4} />
            {/* {selectedOption4 && <p>{infoForOption4[selectedOption4]}</p>} */}
          </div>
        </div>
            <div className='grading-main'>
            <Row>
          <Col span={8}>
              <div className="dataCard categoryCard-grading" style={{marginTop:'20px'}}>
              <h3 style={{ textAlign: "center",marginTop:'10px' , color:'#666666'}}>Student Name</h3>
              <div className="dropdown-wrapper-grading1">

                <Dropdown
                  options={options1}
                  value={selectedOption1}
                  onChange={handleChange1} />
              </div>

                {/* <h3 style={{ textAlign: "center" }}>School</h3> */}
                <Doughnut
                  style={{marginTop:'10px'}}
                  data={{
                    labels: statusData.map((data: Data) => data.label),
                    datasets: [
                      {
                        label: 'Count',
                        data: statusData.map((data: Data) => data.value),
                        backgroundColor: [
                          "rgb(70, 200, 150)",
                          "rgb(65,201,226)",
                          "rgb(0,60,67)",
                          "rgb(52, 104, 192)",
                          "rgb(41, 173, 178)",
                          "rgb(245, 221, 97)",
                        ],
                        borderColor: [
                          "rgb(70, 200, 150)",
                          "rgb(65,201,226)",
                          "rgb(0,60,67)",
                          "rgb(52, 104, 192)",
                          "rgb(41, 173, 178)",
                          "rgb(245, 221, 97)",
                        ],
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      datalabels: {
                        color: 'white',
                        font: {
                          size: 15
                        }
                      },
                      title: {
                        display: true,
                        text: "Grades",
                        font: {
                          size: 15,
                        },
                      },
                    },
                  }} />
              </div>
            </Col>


<Col span={16}>
            {/* <div><h3 style={{textAlign:'center'}}> Student Grades </h3></div> */}

<Paper sx={{height:'484px', width: '98%', overflow: 'hidden', marginLeft:'0px', borderRadius:'15px', marginBottom:'0px', marginTop:'20px' }}>
<h3 style={{textAlign:'center', marginBottom:'0px', color:'#666666'}}> Student Grades </h3>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.science}>
                    {columns.map((column) => {
                      const value = row[column.id as keyof typeof row];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
 rowsPerPageOptions={[10, 25, 100]}
 component="div"
 count={rows.length}
 rowsPerPage={rowsPerPage}
 page={page}
 onPageChange={handleChangePage}
 onRowsPerPageChange={handleChangeRowsPerPage}
/>

    </Paper>
    </Col>
            </Row>

          </div>
       



          <div className="dataCard" style={{ marginLeft: '10px', marginRight: '14px', marginTop: '15px', width: '', marginBottom:'20px' }}>
      <Bar
        className="chart-area"
        style={{ width: 300, height: 350 }}
        data={{
          labels: sourceData.map(data => data.label),
          datasets: [
            {
              label: 'Passed',
              data: sourceData.map(data => data.passed),
              backgroundColor: 'rgb(76, 205, 153)',
              borderRadius: 5,
            },
            {
              label: 'Failed',
              data: sourceData.map(data => data.failed),
              backgroundColor: 'rgb(255, 99, 132)',
              borderRadius: 5,
            },
            {
              label: 'Not Attended',
              data: sourceData.map(data => data.notAttended),
              backgroundColor: 'rgb(255, 206, 86)',
              borderRadius: 5,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y', // This makes the bars stack vertically
          plugins: {
            datalabels: {
              color: 'white',
              font: {
                size: 15
              }
            },
            title: {
              display: true,
              text: 'Examination Results By Batch',
              font: {
                size: 18,
                family: 'Montserrat, sans-serif',
              },
            },
          },
          scales: {
            x: {
              stacked: true, // stack bars on x-axis
              title: {
                display: true,
                text: 'Number of Students',
                color: '#666666',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            },
            y: {
              stacked: true // stack bars on y-axis
            }
          }
        }}
      />
    </div>










        </>
          );
}

export default GradingDashboard;