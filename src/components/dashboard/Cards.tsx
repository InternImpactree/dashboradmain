"use client";

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { GoGoal } from "react-icons/go";
import { FiCheckCircle } from "react-icons/fi";
import { FiGrid } from "react-icons/fi";
import { SiBookstack } from "react-icons/si";
// import {BsFillArchiveFill} from react;
const Cards= () => {
  const [totalMobilizedCount,setTotalMobilizedCount] = useState<any>();
  const [totalInductedCount,setTotalInductedCount] = useState<any>();
  
  useEffect(() => {
    // Function to fetch the total mobilized count from the API
    const fetchTotalMobilizedCount = async () => {
      try {
        // Make a GET request to the API endpoint that returns the total mobilized count
        const response = await axios.get('http://localhost:4000/mobilizationform/mobilizedCount');
        // Check if the request was successful
        if (response.status === 200) {
          // Extract the total mobilized count from the response data
          const {data} = response;
          const mobilizedCount = data.totalCount;
          setTotalMobilizedCount(mobilizedCount);
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
  return (
    <><main className="main-container"> 
    <div className="flex-container">
    <div className="cards-container">
      <div className="main-cards">
        {/* <div className="card"> */}
        {/* <div className="card-inner"> */}
        {/* <p>To Mobilize</p> */}
        {/* <BsPeopleFill className='card_icon'/> */}
        {/* </div> */}
        {/* <h3 className="card-value">300</h3> */}
        {/* </div> */}
        <div className="card">
          <div className="card-inner" style={{ fontFamily:  "Montserrat, sans-serif"}}>
            <p>Induction Target</p>
            <div className="targeticon" style={{fontSize: '38px'}}>
            <GoGoal />
            </div>
            {/* <BsFillBellFill className='card_icon'/> */}
          </div>
          <h3 className="card-value">{totalMobilizedCount}200</h3>
        </div>
        <div className="card">
          <div className="card-inner" style={{ fontFamily:  "Montserrat, sans-serif"}}>
            <p>Total Acheived</p>
            <div className="acheivedicon" style={{fontSize:'38px', }}>
            <FiCheckCircle />
            </div>
            {/* <BsFillArchiveFill className='card_icon'/> */}
          </div>
          <h3 className="card-value">200</h3>
        </div>
        {/* <div className="card"> */}
        {/* <div className="card-inner"> */}
        {/* <p>Total Inducted</p> */}
        {/* <BsFillGrid3X3GapFill className='card_icon'/> */}
        {/* </div> */}
        {/* <h3 className="card-value">{totalInductedCount}</h3> */}
        {/* </div> */}
        <div className="card">
          <div className="card-inner" style={{ fontFamily:  "Montserrat, sans-serif"}}>
            <p>No. of Batches</p>
            <div className="iconbatch" style={{fontSize:'38px', }}>
            <FiGrid />
            </div>
            {/* <BsFillArchiveFill className='card_icon'/> */}
          </div>
          <h3 className="card-value">200</h3>
        </div>
        <div className="card">
          <div className="card-inner" style={{ fontFamily:  "Montserrat, sans-serif"}}>
            <p>No. of Courses</p>
            <div className="iconcourse" style={{fontSize:'38px'}}>
            <SiBookstack />
            </div>
            {/* <BsFillArchiveFill className='card_icon'/> */}
          </div>
          <h3 className="card-value">200</h3>
        </div>
        </div>
      </div>
      {/* <div className="calendar-container">
 

 <LocalizationProvider dateAdapter={AdapterDayjs}>
   <DateCalendar />
 </LocalizationProvider>

 </div> */}
 </div>
    </main>
 
      
      </>
  );
};

export default Cards;