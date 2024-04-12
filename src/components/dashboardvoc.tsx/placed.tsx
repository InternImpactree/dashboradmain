import { AppBar, Button, Toolbar } from "@mui/material";
// import React from "react";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from 'react-dropdown';
import { Bar, Chart, Pie } from "react-chartjs-2";
import { FunnelController, TrapezoidElement } from 'chartjs-chart-funnel';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, Tooltip, Legend, Title,  BarController, Colors, BarElement, LinearScale, DoughnutController,ArcElement, LineController,  PieController, CategoryScale} from 'chart.js';

import Cards from '../dashboard/Cards';
import { Col, Row } from "antd";
import { FiCheckCircle } from "react-icons/fi";
import { GoGoal } from "react-icons/go";
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
      { label: 'Accenture', value: 40 },
      { label: 'Accenture', value: 30 },
      { label: 'Accenture', value: 80 },
      { label: 'Accenture', value: 10 },
      // Add more companies as needed
    ];
      
    const placedData=[
        { "label": "Super Dream", 
        "value": 30 },
     { "label": "Dream", 
       "value": 20 },
     { "label": "Service",
       "value": 15 },
     { "label": "Non-Technical",
       "value": 10 },
         
    ]
      
    const status1Data=[
      {
          "label": "Endline",
          "value": 85
        },
       
  ]

    return(
        <><h1></h1>
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
            <GoGoal />
            </div>
        
          </div>
          
          <h3 className="card-value">1000</h3>
        </div>
        <div className="card">
          <div className="card-inner" style={{ fontFamily:  "Montserrat, sans-serif"}}>
            <p>Total Placed</p>
            <div className="acheivedicon" style={{fontSize:'38px', }}>
            <FiCheckCircle />
            </div>
       
          </div>
          <h3 className="card-value">700</h3>
        </div>

        <div className="card">
          <div className="card-inner" style={{ fontFamily:  "Montserrat, sans-serif"}}>
            <p>No. Of Companies</p>
            <div className="acheivedicon" style={{fontSize:'38px', }}>
            <FiCheckCircle />
            </div>  
       
          </div>
          <h3 className="card-value">70</h3>
        </div>

        <div className="card">
          <div className="card-inner" style={{ fontFamily:  "Montserrat, sans-serif"}}>
            <p>Average Package</p>
            <div className="acheivedicon" style={{fontSize:'38px', }}>
            <FiCheckCircle />
            </div>
       
          </div>
          <h3 className="card-value">4 CTC</h3>
        </div>

        </div>
      </div>
</div>
</main>




<Row>
  <Col span={15}>
  <div className="dataCard" style={{ marginLeft: '12px', marginRight: '0px', marginTop: '0px', width: '710px' }}>
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
                'rgb(76, 205, 153)',
                'rgb(0,60,67)',
                'rgb(65,201,226)',
                'rgb(0,141,218)',
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
              text: 'Selected Students Placement Status ',
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

    <Col span={8}>
  <div className="dataCard categoryCard-placements" style={{width:"90%", height:"350px", marginLeft:'35px', paddingLeft:'20px', paddingRight:'20px'}}>
          <Pie
            // style={{ width: 300, height: 350 }}
            data={{
              labels: placedData.map((data: Data) => data.label),
              datasets: [
                {
                  label: 'Count',
                  data: placedData.map((data: Data) => data.value),
                  backgroundColor: [
                    'rgb(76, 205, 153)',
                    'rgb(0,60,67)',
                    'rgb(65,201,226)',
                    'rgb(0,141,218)',
                  ],
                  borderColor: [
                    'rgb(76, 205, 153)',
                    'rgb(0,60,67)',
                    'rgb(65,201,226)',
                    'rgb(0,141,218)',
                  ],
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Companies Type',
                  font:{
                    size: 18,
                  },
                },
              },
            }}
          />
        </div>
        </Col>

        </Row>

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