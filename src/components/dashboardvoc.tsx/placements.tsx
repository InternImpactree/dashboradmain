import { AppBar, Button, Toolbar } from "@mui/material";
// import React from "react";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from 'react-dropdown';
import { Bar, Chart, Line, Pie } from "react-chartjs-2";
import { FunnelController, TrapezoidElement } from 'chartjs-chart-funnel';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, Tooltip, Legend, Title,  BarController, Colors, BarElement, LinearScale, DoughnutController,ArcElement, LineController,  PieController, CategoryScale} from 'chart.js';

import Cards from '../dashboard/Cards';
import { Col, Row } from "antd";
import { FiCheckCircle } from "react-icons/fi";
import { GoGoal } from "react-icons/go";
import { PiStudentFill } from "react-icons/pi";
import { FaMoneyCheck } from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { LuGoal } from "react-icons/lu";
import { CiMoneyCheck1 } from "react-icons/ci";
ChartJS.register(
    BarController, 
    BarElement,
    DoughnutController, 
    ArcElement,
    LineController, 
    PieController,
    CategoryScale,
    LinearScale,
    LineController, 
    Tooltip,
    Legend,
    Title,
    FunnelController, 
    TrapezoidElement,
    ChartDataLabels,
    Colors,
)
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

const Placements: FC = () =>{

    // const [value, onChange] = useState<Value>(new Date());
    const data = {
        labels:["Jan","Feb","March","April"],
        datasets:[
            {
                display:true,
                label:"Total No.of Students",
                data:[0.5,0.4,0.3,0.2],
            
            }
        ]
    }
    const options = {
        responsive:false,
        maintainAspectRatio:true,
        indexAxis: "y" as const,
        plugins: {
          title: {
            display: true,
            color: '#3C3633',
          text: 'Total No.of Students',
          font:{
            size:12
          }
        },
        
            datalabels: {
              color: 'black',
              font:{
                size:10,
              }
            }
          }
    }

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
      { label: 'Amazon', value: 50 },
      { label: 'Wipro', value: 30 },
      { label: 'TCS', value: 70 },
      { label: 'Accenture', value: 60 },
      { label: 'Impactree', value: 40 },
      { label: 'Newgen', value: 30 },
      { label: 'HCL', value: 80 },
      { label: 'Infosys', value: 10 },
      // Add more companies as needed
    ];
      
    const placedData=[
        { "label": "Total Placed", 
        "value": 700 },
     { "label": "Not Placed ", 
       "value": 300  },
 
         
    ]
      
    const status1Data=[
      {
          "label": "Endline",
          "value": 85
        },
       
  ]

  const yearlyplacedData = [
    { year: 2018, placed: 60, notPlaced: 40 },
    { year: 2019, placed: 65, notPlaced: 35 },
    { year: 2020, placed: 55, notPlaced: 45 },
    { year: 2021, placed: 75, notPlaced: 25 },
    { year: 2022, placed: 80, notPlaced: 20 },
    { year: 2023, placed: 75, notPlaced: 25 }, 
    { year: 2024, placed: 70, notPlaced: 30 }, 
    // { year: 2025, placed: 75, notPlaced: 25 },
   
  ];


// const retention = [60,80,100];

  const retentionData = [
    { label: 'After 1 Year', value: 60 },
    { label: 'After 6 Months', value: 80 },
    { label: 'After 3 Months', value: 100 },
   

  ];

  // retentionData.forEach(data => {
  //   data.value = data.value * 1;
  //  });



  const batchData = [
    { label: 'Jan', batch1: 30, batch2: 25 },
    { label: 'Feb', batch3: 35, batch4: 20, batch5:37 },
    { label: 'Mar', batch6: 40, batch7: 15 },
    // Add more months and batches as needed
  ];
  


  const halfValues = retentionData.map(data => Math.ceil(data.value / 2));


    return(
        <>
        <div>
            <AppBar position="static" sx={{ bgcolor: '#3485ae', boxShadow: 'none' }}>
                <Toolbar>
          <Button component={Link} to="/mobilization"><p style={{color:"white",textTransform: "capitalize"}}>Mobilization</p></Button>
          <Button component={Link} to="/attendancevoc"><p style={{color:"white",textTransform: "capitalize"}}>Attendance</p></Button>

          <Button component={Link} to="/assessment"><p style={{color:"white",textTransform: "capitalize"}}>Grading</p></Button>

          {/* <Button component={Link} to="/studentgrade"><p style={{color:"white",textTransform: "capitalize"}}>Student Grade</p></Button> */}
          <Button component={Link} to="/placements"><b style={{color:"black",textTransform: "capitalize"}}>Placements</b></Button>
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
          
          <h3 className="card-value">1000</h3>
        </div>
        <div className="card">
          <div className="card-inner" style={{ fontFamily:  "Montserrat, sans-serif"}}>
            <p>Total Placed</p>
            <div className="acheivedicon" style={{fontSize:'38px', }}>
            <LuGoal />
            </div>
       
          </div>
          <h3 className="card-value">700</h3>
        </div>

        <div className="card">
          <div className="card-inner" style={{ fontFamily:  "Montserrat, sans-serif"}}>
            <p>No. Of Companies</p>
            <div className="acheivedicon" style={{fontSize:'38px', }}>
            <HiOutlineBuildingOffice2 />
            </div>  
       
          </div>
          <h3 className="card-value">70</h3>
        </div>

        <div className="card">
          <div className="card-inner" style={{ fontFamily:  "Montserrat, sans-serif"}}>
            <p>Average Package</p>
            <div className="acheivedicon" style={{fontSize:'38px', }}>
            <FaMoneyCheck />
            {/* <CiMoneyCheck1 /> */}
            </div>
       
          </div>
          <h3 className="card-value">4 CTC</h3>
        </div>

        </div>
      </div>
</div>
</main>




<Row>

<Col span={8}>

<div className="dataCard" style={{ marginLeft: '10px', marginRight: '0px', marginTop: '0px', width: '355px' }}>
      <Bar
        className="chart-area"
        style={{ height: 350 }}
        data={{
          labels: ['Total Students'],
          datasets: [
            {
              label: 'Placed',
              data: [placedData[0].value],
              backgroundColor: 'rgb(65, 105, 150)',
              barThickness: 140,
              borderRadius: 5,
            },
            {
              label: 'Not Placed',
              data: [placedData[1].value],
              backgroundColor: 'rgb(255, 99, 132)',
              barThickness: 140,
              borderRadius: 5,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'x', // This makes the bars stack horizontally
          plugins: {
            datalabels: {
              color: 'white',
              font: {
                size: 15
              }
            },
            title: {
              display: true,
              text: 'Placement Status',
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
                text: '',
                color: '#666670',
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
</Col>


  <Col span={15}>
  <div className="dataCard" style={{ marginLeft: '18px', marginRight: '0px', marginTop: '0px', width: '720px' }}>
      <Bar
        className="chart-area"
        style={{ width: 300, height: 350 }}
        data={{
          labels: sourceData.map(data => data.label),
          datasets: [
            {
              label: 'Number of Students',
              data: sourceData.map(data => data.value),
              backgroundColor: [
                // 'rgb(76, 205, 153)',
                  // 'rgb(208, 72, 72)',
                  // 'rgb(255, 199, 0)',
                  // 'rgb(0, 127, 115)',
                  // 'rgb(104, 149, 210)',
                  // 'rgb(238, 66, 102)',
                  // 'rgb(188, 127, 205)'
                  'rgb(255, 164, 71)'
                // Add more colors as needed
              ],
              borderRadius: 5,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'x', // This makes the bars stack vertically
          plugins: {
            datalabels: {
              color: 'white',
              font: {
                size: 15
              }
            },
            title: {
              display: true,
              text: 'Company Wise Selected Students ',
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
                text: '',
                color: '#666670',
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
    </Col>

    

        </Row>

<Row>
<Col>
        <div className="dataCard" style={{ marginLeft: '12px', marginRight: '0px', marginTop: '10px', width: '710px' }}>
      <Bar
        className="chart-area"
        style={{ width: 300, height: 350 }}
        data={{
          labels: retentionData.map(data => data.label),
          datasets: [
            {
              label: 'Number of Students',
              data: retentionData.map(data => data.value),
              backgroundColor: [
                'rgb(242, 133, 133)',
                'rgb(255, 164, 71)',
                'rgb(65,201,226)',
                // Add more colors as needed
              ],
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
              text: 'Selected Students Placement Status',
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
                text: '',
                color: '#666670',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            },
            y: {
              stacked: true, // stack bars on y-axis
            }
          }
        }}
      />
    </div>
    </Col>



    <Col span={8}>

    <div className="dataCard" style={{ marginLeft: '13px', marginRight: '0px', marginTop: '10px', width: '360px' }}>
      <Bar
        className="chart-area"
        style={{ width: 300, height: 350 }}
        data={{
          labels: batchData.map(data => data.label),
          datasets: [
            {
              label: 'Batch 1',
              data: batchData.map(data => data.batch1),
              backgroundColor: 'rgb(155, 207, 83)', // Light Green
              borderRadius: 5,
            },
            {
              label: 'Batch 2',
              data: batchData.map(data => data.batch2),
              backgroundColor: 'rgb(0,60,67)', // Dark Blue
              borderRadius: 5,
            },
            {
              label: 'Batch 3',
              data: batchData.map(data => data.batch3),
              backgroundColor: 'rgb(65,201,226)', // Light Blue
              borderRadius: 5,
            },
            {
              label: 'Batch 4',
              data: batchData.map(data => data.batch4),
              backgroundColor: 'rgb(0,141,218)', // Blue
              borderRadius: 5,
            },
            {
              label: 'Batch 5',
              data: batchData.map(data => data.batch5),
              backgroundColor: 'rgb(255, 99, 132)', // Red
              borderRadius: 5,
            },
            {
              label: 'Batch 6',
              data: batchData.map(data => data.batch6),
              backgroundColor: 'rgb(255, 159, 64)', // Orange
              borderRadius: 5,
            },
            {
              label: 'Batch 7',
              data: batchData.map(data => data.batch6),
              backgroundColor: 'rgb(155, 100, 120)', // Orange
              borderRadius: 5,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'x', // This makes the bars stack vertically
          plugins: {
            datalabels: {
              color: 'white',
              font: {
                size: 15
              }
            },
            title: {
              display: true,
              text: 'Batch Wise Selected Students',
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
                text: 'Months',
                color: '#666670',
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
</Col>


</Row>


        <div className="dataCard" style={{ marginLeft: '14px', marginRight: '0px', marginTop: '20px',marginBottom:'20px', width: '95%' }}>
      <Line
        className="chart-area"
        style={{ width: 300, height: 350 }}
        data={{
          labels: yearlyplacedData.map(data => data.year),
          datasets: [
            {
              label: 'Percentage Placed',
              data: yearlyplacedData.map(data => data.placed),
              fill: false,
              borderColor: 'rgb(76, 205, 153)',
              tension: 0.1,
            },
            {
              label: 'Percentage Not Placed',
              data: yearlyplacedData.map(data => data.notPlaced),
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Placement Status Over Years',
              font: {
                size: 18,
                family: 'Montserrat, sans-serif',
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Year',
                color: '#666770',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            },
            y: {
              title: {
                display: true,
                text: 'Percentage (%)',
                color: '#666770 ',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            }
          }
        }}
      />
    </div>

        

        {/* <div className=' funnelCard-placements'>
            <div style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
            <Chart
                 type="funnel" 
                 options={options} 
                 data={data} 
                style={{width:400, height:250}}>
                 
                 </Chart>
            </div>   */}
            {/* </div> */}
        </>
    )
}

export default Placements;