"use client";
import React, { FC } from "react";
import axios from "axios";
import { Bar, Chart, Doughnut, Line, Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import 'chart.js/auto';
// import { Context } from 'chartjs-plugin-datalabels';
import CanvasJSReact from '@canvasjs/react-charts';
// import { GoGoal } from "react-icons/go";
import Plot from "react-plotly.js";


// import  { forwardRef, useRef,  } from 'react';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  Title,
  BarController,
  Colors,
  BarElement,
  LinearScale,
  DoughnutController,
  ArcElement,
  LineController,
  PieController,
  CategoryScale,
  PointElement,
  ChartItem,
} from "chart.js";
import { FunnelController, TrapezoidElement } from "chartjs-chart-funnel";
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";
import Cards from "../Cards";
// import Homepage from '../Homepage';
import { Link } from "react-router-dom";



import {
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  SelectChangeEvent,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Col, Row } from "antd";
import Calendar from "react-calendar";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from 'apexcharts';
import Plotly from "plotly.js";
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
  Colors
);
interface Data {
  label: string;
  value: number;
}
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const MobilizationDashboard: FC = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [totalMobilizedCount, setTotalMobilizedCount] = useState<any>();
  const [totalInductedCount,setTotalInductedCount] = useState<any>();

  useEffect(() => {
    // Function to fetch the total mobilized count from the API
    const fetchTotalMobilizedCount = async () => {
      try {
        // Make a GET request to the API endpoint that returns the total mobilized count
        const response = await axios.get(
          "http://localhost:4000/mobilizationform/mobilizedCount"
        );
        // Check if the request was successful
        if (response.status === 200) {
          // Extract the total mobilized count from the response data
          const { data } = response;
          const mobilizedCount = data.totalCount;
          setTotalMobilizedCount(mobilizedCount);
        } else {
          // Log an error message if the request was not successful
          console.error(
            "Failed to fetch total mobilized count:",
            response.statusText
          );
        }
      } catch (error) {
        // Log any errors that occur during the request
        console.error("Error fetching total mobilized count:", error);
      }
    };

    // Call the function to fetch the total mobilized count
    fetchTotalMobilizedCount();
  }, []);

  useEffect(() => {
    // Function to fetch the total mobilized count from the API
    const fetchTotalInductedCount = async () => {
      try {
        // Make a GET request to the API endpoint that returns the total mobilized count
        const response = await axios.get('http://localhost:4000/batchwisedetails/inductedcount');
        // Check if the request was successful
        if (response.status === 200) {
          // Extract the total mobilized count from the response data
          const {data} = response;
          const inductedCount = data.totalCount;
          setTotalInductedCount(inductedCount);
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
  fetchTotalInductedCount();
  }, []);



  const { CanvasJSChart } = CanvasJSReact;

  const data: Plotly.Data[] = [{
    type: 'funnel' as Plotly.PlotType,
    y: ["Total Mobilized", "Screening", "Total Inducted"],
    x: [100,80,60],
    // hoverinfo: 'x+percent previous+percent initial'  
  
    textfont: {
      family: "Montserrat, sans-serif", // Specify the font family
      size: 16, // Specify the font size
      color: "white" // Specify the font color
  },
   }];

   

 const layout = {
  yaxis: {
    tickfont: {
        family: "Montserrat, sans-serif", // Specify the font family for ticks
        size: 13, // Specify the font size for ticks
        color: "#666666" // Specify the font color for ticks
    }
},
  margin: {l: 90, r:0, t:85,b:40},
  width: 360,
  height: 370,
  title: {
    
    showlegend: false,
    text: "<b>Mobilization Status</b>", // Specify the title text here
    font: {
      size: 18, // Adjust the font size
      color: '#747474', // Adjust the font color
      family: 'Montserrat, sans-serif',
    },
    x: 0.5, // Center the title horizontally
    y: 0.9, // Position the title vertically
 },
 autosize: true, // Enable autosizing
 responsive: true // Enable responsiveness
};


const config = {
  displayModeBar: false,
  displaylogo: false,
 };




  const sourceData = [
    {
      label: "To Mobilize",
      value: 23,
    },
    {
      label: "Total Mobilized",
      value: totalMobilizedCount,
    },
    {
      label: "Induction Target",
      value: 32,
    },
    {
      label: "Total Inducted",
      value: totalInductedCount,
    },
  ];

  const statusData = [
    { label: "Jan", value: 50 },
    { label: "Feb", value: 60 },
    { label: "March", value: 50 },
    { label: "April", value: 70 },
    { label: "May", value: 60 },
    { label: "June", value: 50 },
    { label: "July", value: 70 },
    { label: "August", value: 80 },
    { label: "Sept", value: 60 },
    { label: "Oct", value: 40 },
    { label: "Nov", value: 70 },
    { label: "Dec", value: 60 },

  ];

  const acheivedData = [
    { label: "Jan", value:  40 },
    { label: "Feb", value:   50 },
    { label: "March", value: 40 },
    { label: "April", value: 60 },
    { label: "May", value:   50 },
    { label: "June", value:   40 },
    { label: "July", value:   60 },
    { label: "August", value: 70 },
    { label: "Sept", value: 50 },
    { label: "Oct", value: 30 },
    { label: "Nov", value: 60 },
    { label: "Dec", value: 50 },

  ];


  const mobilizeData=[
    {label: "Source 1 : 70", value: 70},
    {label: "Source 2 : 50", value: 50},
    {label: "Source 3 : 80", value: 80},
    {label: "Source 4 : 90", value: 90}
  ]

  const batchesData=[
    {
      "label": "Completed : 80",
      "value": 80
    },
    {
      "label": "Ongoing : 20",
      "value": 20
    },

  ]

  const teachersData=[
    {
      "label": "Absent",
      "value": 44
    },
    {
      "label": "Present",
      "value": 45
    },

  ]
  const staffData=[
    {
      "label": "Absent",
      "value": 32
    },
    {
      "label": "Present",
      "value": 66
    },

  ]


  
  const labels = mobilizeData.map(data => data.label);
  const values = mobilizeData.map(data => data.value);

  interface DataItem {
    label: string;
    value: number;
  }
  const generateLegendLabels = (data: DataItem[]) => {
    return data.map(({ label, value }) => ({
      text: `${label}: ${value}`,
      fillStyle: '',
      hidden: false
    }));
  };
  
  return (
    <>
    
      <div>
      
        <AppBar
          position="static"
          sx={{ bgcolor: "#3485ae", boxShadow: "none" }}
        >
          <Toolbar>
            <Button component={Link} to="/dashboard">
              <b style={{ color: "black", textTransform: "capitalize" }}>
                Mobilization
              </b>
            </Button>
            <Button component={Link} to="/attendancedashboard">
              <p style={{ color: "white", textTransform: "capitalize" }}>
                Attendance
              </p>
            </Button>
            <Button component={Link} to="/gradingdetails">
              <p style={{ color: "white", textTransform: "capitalize" }}>
                Grading
              </p>
            </Button>
            {/* <Button component={Link} to="/studentsattendance">
              <p style={{ color: "white", textTransform: "capitalize" }}>
                Student Details
              </p>
            </Button> */}
            {/* <Button component={Link} to="/training">
              <p style={{ color: "white", textTransform: "capitalize" }}>
                Training
              </p>
            </Button> */}
          </Toolbar>
        </AppBar>
      </div>
    
    
      <Cards></Cards>


      <Row>  
          <Col span={15}>
          <div className="dataCard categoryCard" style={{marginLeft:'12px',marginBottom:"2%", marginTop:'0px', width:'96%', height:'350px'}}>
 <Chart style={{marginTop:'0px'}}
              data={{
                labels: statusData.map((data: Data) => data.label), 
                datasets: [
                  {
                    type: 'line' as const,
                    label: 'Target',
                    data: statusData.map((data: Data) => data.value),
                    backgroundColor: [
                      "rgb(76, 205, 153)"
                    ],
                    tension: 0.4, 
                    borderColor: [
                      "rgb(76, 205, 153)",
                    ],
                    // fill: true, // This will smoothen the lines
                  },
                  {
                    type: 'bar' as const, // This will add a bar chart
                    label: 'Mobilized',
                    data: acheivedData.map((data: Data) => data.value),
                    backgroundColor: [
                    //   "rgb(76, 205, 153)",
                    // "rgb(0,60,67)",
                    // "rgb(65,201,226)",
                    "rgb(0,141,218)",
                    ],
                    borderColor: [
                      // 'rgba(43, 63, 229, 0.8)',
                      // 'rgba(250, 192, 19, 0.8)',
                      // 'rgba(253, 135, 135, 0.8)',
                      // 'rgba(151, 40, 145, 0.8)',
                      // 'rgba(24, 214, 126, 0.98)',
                      // 'rgba(150, 0, 0, 0.87)',
                      "rgb(0,141,218)",
                    ],
                    borderWidth: 1,
                    datalabels: { // Applying datalabels only to the bar dataset
                      display: true,
                      color: 'white',
                      font: {
                        size: 15
                      }
                    }
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  datalabels: {
                    display: false, 
                    color: 'white',
                    font:{
                      size: 15
                    }
                  },
                  title: {
                    display: true,
                    text: 'Total Mobilized',
                    font: {
                      size: 18,
                      family: 'Montserrat, sans-serif',
                    },
                  },
                },
              }} type={"bar"} />
</div>

     
        </Col>

       
        <Col span={9} >
        <div className="funnelCard" style={{width:'86%', height:'322px',marginBottom:'0px', marginTop:'0px',marginRight: '0px', marginLeft:'25px', paddingRight:'0px',backgroundColor:'rgb(254, 254, 254)'}}>
        
        <Plot 
        style={{marginLeft:'15px', marginRight:'30px', marginTop:'0px', marginBottom:'0px'}}
        data={data}
        layout={layout}
        config={config}
      />
         {/*} <div  
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Chart
              type="funnel"
              data={funnelData}
              options={funnelOptions}
              style={{ width: 300, height: 300 }}
            />
          </div>*/}
          </div>
          {/* <div className="dataCard" style={{width:'85%', height:'370px', marginRight:'10px', marginLeft:'0px'}}>
            <Bar
              className="chart-area"
              data={{
                labels: sourceData.map((data: Data) => data.label),
                datasets: [
                  {
                    label: "Number",
                    data: sourceData.map((data: Data) => data.value),
                    backgroundColor: [
                      "rgb(76, 205, 153)",
                    "rgb(0,60,67)",
                    "rgb(65,201,226)",
                    "rgb(0,141,218)",
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
                    font:{
                      size: 15
                    }
                  },
                  title: {
                    display: true,
                    text: "Target vs Achieved Status",
                    font: {
                      size: 18,
                      family: 'Montserrat, sans-serif',
                    },
                  },
                },
              }}
            />
          </div> */}
        </Col>

   


      <Row>
    <Col span={8}>
    <div className="dataCard" style={{marginLeft:'14px', marginRight:'0px', marginTop:'0px', width:'340px'}}>
            <Bar
              className="chart-area"
              style={{ width: 300, height: 350}}
              data={{
                labels: sourceData.map((data: Data) => data.label),
                datasets: [
                  {
                    label: "Number",
                    data: sourceData.map((data: Data) => data.value),
                    backgroundColor: [
                      "rgb(76, 205, 153)",
                    "rgb(0,60,67)",
                    "rgb(65,201,226)",
                    "rgb(0,141,218)",
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
                    font:{
                      size: 15
                    }
                  },
                  title: {
                    display: true,
                    text: "Target vs Achieved Status",
                    font: {
                      size: 18,
                      family: 'Montserrat, sans-serif',
                    },
                  },
                },
              }}
            />
          </div>

    </Col>  
    <Col span={8}>
          <div className="dataCard" style={{marginLeft:'19px', marginRight:'0px', width:'340px'}}>
            <Pie
              className="chart-area"
              style={{ width: 300, height: 350}}
              data={{
                labels: mobilizeData.map((data: Data) => data.label),
                datasets: [
                  {
                    label: "Count",
                    data: mobilizeData.map((data: Data) => data.value),
                    backgroundColor: [
                      "rgb(76, 205, 153)",
                      "rgb(65,201,226)",
                      "rgb(0,60,67)",
                      "rgb(0,141,218)",
                    ],
                    borderColor: [
                      "rgb(76, 205, 153)",
                      "rgb(65,201,226)",
                      "rgb(0,60,67)",
                      "rgb(0,141,218)",
                    ],
                  },
                ],
              }}
              
              options={{
        
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  datalabels: {
                    color: 'white',
                    font:{
                      size: 15
                    }
                  },
                  title: {
                    display: true,
                    text: "Mobilization Sources",
                    font: {
                      size: 18,
                      family: 'Montserrat, sans-serif',
                    },
                  },
                },
                legend: {
                  labels: {
                    generateLabels: () => generateLegendLabels(mobilizeData)
                  }
                }
              } as any}
            />
          </div>
        </Col> 

        <Col span={8}>
        <div className="charts-training">
        <div className="dataCard customerCard-mobilize" style={{marginLeft:' 23px', marginRight:'0px', width:'330px'}}>
          <Doughnut
          
            data={{
              labels: batchesData.map((data: { label: string }) => data.label),
              datasets: [
                {
                  label: "Number",
                  data: batchesData.map((data: { value: number }) => data.value),
                  backgroundColor: [
                    "rgb(76, 205, 153)",
                    "rgb(0,60,67)",
                    "rgb(65,201,226)",
                    "rgb(0,141,218)",
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
                  font:{
                    size: 15
                  }
                },
                title: {
                  display: true,
                  text: "Status of Batches",
                  font: {
                    size: 18,
                    family: 'Montserrat, sans-serif',
                  },
                },
              },
            }}
          />
        </div>
        </div>
        </Col>

   </Row>

 

        {/* <Col span={8}>
          <div className="funnelCard">
            <CanvasJSChart options={options} />
          </div>
        </Col> */}


    </Row>

    </>
  );
};

export default MobilizationDashboard;


{/* 
    <div className="dataCard">
    <ReactApexChart
  options={funnelChartOptions}
  series={funnelChartOptions.series}
  type="funnel"
  height={350}
/> */}
 
{/* </div> */}
     
         {/* <Col span={8}>
      <div className=" funnelCard">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          
            
          }}
        >
          <Chart
            type="funnel"
            options={options}
            data={data}
            style={{ width: 400, height: 250 }}
          ></Chart>
        </div>
      </div>
      </Col>  */}


{/*       
      <div className="charts-training">
        <div className="dataCard customerCard-mobilize">
          <Doughnut
            data={{
              labels: studentData.map((data: { label: string }) => data.label),
              datasets: [
                {
                  label: "Number",
                  data: studentData.map((data: { value: number }) => data.value),
                  backgroundColor: [
                   
                    "rgba(253, 135, 135, 0.8)",
                    "rgba(151, 40, 145, 0.8)",
                  ],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              // responsive: true,
            
              plugins: {
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
        <div className="dataCard customerCard-mobilize">
          <Doughnut
            data={{
              labels: teachersData.map((data: { label: string }) => data.label),
              datasets: [
                {
                  label: "Number",
                  data: teachersData.map((data: { value: number }) => data.value),
                  backgroundColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                    "rgba(253, 135, 135, 0.8)",
                    "rgba(151, 40, 145, 0.8)",
                    "rgba(24, 214, 126, 0.98)",
                    "rgba(73, 0, 0, 0.87)",
                  ],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
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
        <div className="dataCard customerCard-mobilize">
          <Doughnut
            data={{
              labels: staffData.map((data: { label: string }) => data.label),
              datasets: [
                {
                  label: "Number",
                  data: staffData.map((data: { value: number }) => data.value),
                  backgroundColor: [
                    
                
                    "rgba(253, 135, 135, 0.8)",
                    "rgba(151, 40, 145, 0.8)",
                    "rgba(24, 214, 126, 0.98)",
                    "rgba(73, 0, 0, 0.87)",
                  ],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              // responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Staff Attendance",
                  font: {
                    size: 18,
                  },
                },
              },
            }}
          />
        </div>
      </div> */}

{/*      
        <div className="dataCard customerCard">
          <Bar
            data={{
              labels: sourceData.map((data: Data) => data.label),
              datasets: [
                {
                  label: 'Number',
                  data: sourceData.map((data: Data) => data.value),
                  backgroundColor: [
                    'rgba(43, 63, 229, 0.8)',
                    'rgba(250, 192, 19, 0.8)',
                    'rgba(253, 135, 135, 0.8)',
                    'rgba(151, 40, 145, 0.8)',
                  ],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Target vs Achieved Status',
                  font:{
                    size: 18,
                  },
                },
              },
            }}
          />
        </div> */}
 {/* <Col span={8}>
      <div className=" funnelCard">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Chart
            type="funnel"
            options={options}
            data={data}
            style={{ width: 400, height: 250 }}
          ></Chart>
        </div>
      </div>
      </Col> */}
      {/* </Row> */}
      
     











  // const data = {
  //   labels: ["Total Mobilized", "Screening", "Total Inducted"],
  //   datasets: [
  //     {
  //       display: true,
  //       label: "Total No.of Students",
  //       data: [0.5, 0.4, 0.3],
  //     },
  //   ],
  // };
  // const options = {
  //   responsive: false,
  //   maintainAspectRatio: true,
  //   indexAxis: "y" as const,
  //   plugins: {
  //     title: {
  //       display: true,
  //       color: "#3C3633",
  //       text: "Total No.of Students",
  //       font: {
  //         size: 12,
  //       },
  //     },

  //     datalabels: {
  //       color: "black",
  //       font: {
  //         size: 10,
  //       },
  //     },
  //   },
  // };

  // const funnelChartOptions: ApexOptions = {
  //   chart: {
  //      type: 'funnel',
  //      height: 350,
  //   },
  //   plotOptions: {
  //      funnel: {
  //        isInversed: true,
  //        isSliced: true,
  //        dataLabels: {
  //          enabled: true,
  //         //  formatter: function (val:number, opts) {
  //           //  return opts.w.config.series[opts.seriesIndex][opts.dataPointIndex] + ': ' + val;
  //         //  },
  //        },
  //      },
  //   },
  //   dataLabels: {
  //      enabled: true,
  //      textAnchor: 'middle',
  //      style: {
  //        fontSize: '14px',
  //        colors: ['#000000'],
  //      },
  //   },
  //   series: [
  //      {
  //        name: 'Stages',
  //        data: [
  //          { x: 'Sourced', y: 1380 },
  //          { x: 'Screened', y: 1100 },
  //          { x: 'Assessed', y: 990 },
  //          { x: 'HR Interview', y: 880 },
  //          { x: 'Technical', y: 740 },
  //          { x: 'Verify', y: 548 },
  //          { x: 'Offered', y: 330 },
  //          { x: 'Hired', y: 200 },
  //        ],
  //      },
  //   ],
  //   labels: ['Sourced', 'Screened', 'Assessed', 'HR Interview', 'Technical', 'Verify', 'Offered', 'Hired'],
  //  };