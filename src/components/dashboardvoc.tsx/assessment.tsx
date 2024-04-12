"use client"; 
import React, { useState, FC } from 'react';
import { AppBar, Button, Menu, Toolbar } from '@mui/material';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';   
import { Link } from 'react-router-dom';
import {Chart as ChartJS} from 'chart.js';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from '@mui/x-charts/Gauge';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Col, Row } from 'antd';

interface Column {
    id: 'studentName' | 'endlineGrade' | 'baselineGrade' | 'overallGrade';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: string | number) => string;
   }
   
   const columns: readonly Column[] = [
    { id: 'studentName', label: 'Student Name', minWidth: 170 },
    { id: 'endlineGrade', label: 'Endline Grade', minWidth: 170, align: 'right' },
    { id: 'baselineGrade', label: 'Baseline Grade', minWidth: 170, align: 'right' },
    { id: 'overallGrade', label: 'Overall Grade', minWidth: 170, align: 'right' },
   ];

  interface Data {
    studentName: string;
    endlineGrade: number;
    baselineGrade: number;
    overallGrade: number;
   }
   

   function createData(
    studentName: string,
    endlineGrade: number,
    baselineGrade: number,
    overallGrade: number
   ): Data {
    return {
       studentName,
       endlineGrade,
       baselineGrade,
       overallGrade,
    };
   }
   
    const rows = [
        createData('John Doe', 85, 75, 80),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        // Add more rows as needed
    ];


function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={3}
      />
    </g>
  );
}


// interface Data {
//     label: string;
//     value: number;
//   }

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

function Assessment(props:ReactDropdownProps) {
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
  
    // const sourceData= [
    //     {
    //       "label": "Baseline",
    //       "value": 100
    //     },
    //     {
    //       "label": "Endline",
    //       "value": 60
    //     },
     
    //   ]
      
    const statusData=[
        {
            "label": "Baseline",
            "value": 90
          },
         
    ]
      
    const status1Data=[
      {
          "label": "Endline",
          "value": 85
        },
       
  ]

  const gradeData = [
    { label: 'Baseline Grade', value: 60 },
    { label: 'Endline Grade', value: 70 }
  ]


  const sourceData = [
    { label: 'Science', passed: 80, failed: 20, notAttended: 5 },
    { label: 'Maths', passed: 70, failed: 30, notAttended: 10 },
    { label: 'History', passed: 90, failed: 10, notAttended: 3 },
    { label: 'English', passed: 60, failed: 36, notAttended: 4 },
    { label: 'Geo', passed: 80, failed: 18, notAttended: 2 },
    { label: 'Hindi', passed: 70, failed: 27, notAttended: 3 },
    // Add more subjects as needed
  ];
  


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
  setAnchorEl(null);
  };

    return(
        <>
        <div>
        <AppBar position="static" sx={{ bgcolor: '#3485ae', boxShadow: 'none'}}>
          <Toolbar>
          <Button component={Link} to="/mobilization"><p style={{color:"white",textTransform: "capitalize"}}>Mobilization</p></Button>
          <Button component={Link} to="/attendancevoc"><p style={{color:"white",textTransform: "capitalize"}}>Attendance</p></Button>

          <Button component={Link} to="/assessment"><b style={{color:"black",textTransform: "capitalize"}}>Grading</b></Button>
          {/* <Button component={Link} to="/studentgrade"><p style={{color:"white",textTransform: "capitalize"}}>Student Grade</p></Button> */}
          <Button component={Link} to="/placements"><p style={{color:"white",textTransform: "capitalize"}}>Placements</p></Button>
          </Toolbar>
        </AppBar>
        </div>


  <div className="dropdown-container-grading">
  
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

<Row>
<Col span={8}>
<div className='dataCard gauge' style={{width:"70%",height:"320px", marginBottom:'10px', marginLeft:'10px', marginRight:'0px', marginTop:'20px'}}>
<h3 style={{textAlign:'center', marginBottom:'0px', color:'#666770'}}>Percentage Scored in Baseline Assessment</h3>
<Gauge

 innerRadius="60%"
 outerRadius="100%"

 width={260} height={220} 
 value={75}

  startAngle={-100}
  endAngle={100}
  sx={(theme) => ({
    valueArc: {
      // Add your custom styles here
      fill: 'red', // Example: Change the fill color to red
    },
    [`& .${gaugeClasses.valueText}`]: {
      fontSize: 20,
      fontFamily: 'Montserrat, sans-serif',
      transform: 'translate(0px, 50px)',
    },

  })}  
  text={
     ({ value, valueMax }) => `${value} / ${valueMax}`
  }
  
>
<GaugeReferenceArc />
      <GaugeValueArc />
      <GaugePointer />
    </Gauge>
    
</div>
</Col>


<Col span={8}>
<div className="dataCard categoryCard" style={{marginTop:'20px', width:'479px', marginLeft:'-63px'}}>
              <h3 style={{ textAlign: "center",marginTop:'10px' ,color:'#666770'}}>Student Name</h3>
              <div className="dropdown-wrapper-grading1">

                <Dropdown
                  options={options1}
                  value={selectedOption1}
                  onChange={handleChange1} />
              </div>

                {/* <h3 style={{ textAlign: "center" }}>School</h3> */}
                <Bar
                  style={{marginTop:'10px'}}
                  data={{
                    labels: gradeData.map((data) => data.label),
                    datasets: [
                      {
                        label: 'Count',
                        data: gradeData.map((data) => data.value),
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
                        borderRadius: 5,
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
                        display: false,
                        text: "",
                        font: {
                          size: 15,
                        },
                      },
                    },
                  }} />
              </div>
              </Col>
              <Col span={7}>
<div className='dataCard gauge' style={{width:"80%",height:"320px", marginBottom:'10px', marginLeft:'70px', marginRight:'10px', marginTop:'20px'}}>
<h3 style={{textAlign:'center', marginBottom:'0px', color:'#666770'}}>Percentage Scored in Endline Assessment</h3>
<Gauge
 innerRadius="60%"
 outerRadius="100%"

 width={260} height={220} 
 value={60}
  startAngle={-100}
  endAngle={100}
  sx={{
   
    [`& .${gaugeClasses.valueText}`]: {
      fontSize: 20,
      fontFamily: 'Montserrat, sans-serif',
      transform: 'translate(0px, 50px)',
    },
  }}  
  text={
     ({ value, valueMax }) => `${value} / ${valueMax}`
  }
  
>
<GaugeReferenceArc />
      <GaugeValueArc />
      <GaugePointer />
    </Gauge>
    
</div>
</Col>




</Row>

<div className="dataCard" style={{ marginLeft: '10px', marginRight: '14px', marginTop: '15px', width: '' }}>
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

   




{/* <div><h3 style={{textAlign:'center'}}> Student Grades </h3></div> */}

<Paper sx={{ width: '98%', overflow: 'hidden', marginLeft:'10px', marginTop:'20px', borderRadius:'15px'}}>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.endlineGrade}>
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
  
  {/* <div className='grading-main'>
  <div className="dataCard categoryCard-gradingvoc">
    <h1 style={{textAlign:"center"}}>School</h1>
  <Doughnut
    data={{
      labels: statusData.map((data: Data) => data.label),
      datasets: [
        {
          label: 'Count',
          data: statusData.map((data: Data) => data.value),
          backgroundColor: [
            'rgba(151, 40, 145, 0.8)',
            'rgba(255,255,255, 0.3)',   
          ],
          borderColor: [
            'rgba(43, 63, 229, 0.8)',
         
          ],
        },
      ],
    }}
    options={{
        rotation: 270, // start angle in degrees
        circumference: 150, // sweep angle in degrees
      plugins: {
        title: {
          display: true,
          
        },
      },
    }}
  />
</div> */}

{/* <div className="dropdown-container-grading1">

<h1 style={{textAlign:"center"}}>Student Name</h1>
<div className="dropdown-wrapper-grading1"> */}
{/* 
<Dropdown
options={options1}
value={selectedOption1}
onChange={handleChange1} /> */}
{/* {selectedOption1 && <p>{infoForOption1[selectedOption1]}</p>} */}
{/* </div> */}


{/* <div className=" customerCard-gradingvoc" style={{ width: '400px' }}>
  <Bar
    data={{
      labels: sourceData.map((data: Data) => data.label),
      datasets: [
        {
          label: 'Count',
          data: sourceData.map((data: Data) => data.value),
          backgroundColor: [
            'rgba(43, 63, 229, 0.8)',
            'rgba(250, 192, 19, 0.8)',
          ],
          borderRadius: 5,
        },
      ],
    }}
    options={{
      plugins: {
        title: {
          display: true,
     
        },
      },
    }}
  />
</div>
</div> */}

{/* <div className="dataCard categoryCard-grading">
    <h1 style={{textAlign:"center"}}>Client Center</h1>
  <Doughnut
    data={{
      labels: status1Data.map((data: Data) => data.label),
      datasets: [
        {
          label: 'Count',
          data: status1Data.map((data: Data) => data.value),
          backgroundColor: [
            'rgba(43, 63, 229, 0.8)',
            'rgba(250, 192, 19, 0.8)',
            'rgba(253, 135, 135, 0.8)',
            'rgba(151, 40, 145, 0.8)',
            'rgba(24, 214, 126, 0.98)',
            'rgba(73, 0, 0, 0.87)',
          ],
          borderColor: [
            'rgba(43, 63, 229, 0.8)',
            'rgba(250, 192, 19, 0.8)',
            'rgba(253, 135, 135, 0.8)',
            'rgba(151, 40, 145, 0.8)',
            'rgba(24, 214, 126, 0.98)',
            'rgba(73, 0, 0, 0.87)',
          ],
        },
      ],
    }}
    options={{
        rotation: 270, // start angle in degrees
        circumference: 140, // sweep angle in degrees
      plugins: {
        title: {
          display: true,
          
        },
      },
    }}
  /> */}
{/* </div> */}
{/* </div> */}
</>

    );
}

export default Assessment;