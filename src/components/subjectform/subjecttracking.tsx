import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Select, MenuItem, Table, TableHead, TableBody, TableRow, TableCell, Button, SelectChangeEvent, AppBar, Toolbar, Typography, TextField, Stack } from '@mui/material';
import { Tab, Tabs, TabList } from 'react-tabs';
import { Link, NavLink } from 'react-router-dom';

const SubjectTracking: React.FC = () => {
  const [batchOptions, setBatchOptions] = useState<any[]>([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [subjectsList, setSubjectList] = useState<any[]>([]);
  const [chapterList, setChapterList] = useState<any[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<string>('');
  const [selectedSubjectName, setSelectedSubjectName] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedChapterName, setSelectedChapterName] = useState('');
  const [selectedTestDate, setSelectedTestDate] = useState<string>('');
  const [chapterCompleted, setchapterCompleted] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const subjectNamesArray: any[] = [];
  const [activeTab, setActiveTab] = useState<number>(2); // Track if attendance is already submitted for the day

  useEffect(() => {
    const fetchBatchOptions = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/add-batch`);
        const { data } = response.data;
        setBatchOptions(data);
        //console.log("data",data)
      } catch (error) {
        console.error('Error fetching batch options:', error);
      }
    };

    fetchBatchOptions();
  }, []);

  const fetchSubjects = async (selectedBatch: string) => {
    //console.log("selectedBatch",selectedBatch)
    try {
        const response = await axios.get(`http://localhost:4000/add-batch?_id=${selectedBatch}`);
        const { data } = response.data;
        const result = data;
        //const subjectNamesArray: string[] = [];
        let subjectNames: string[] =[];
        await Promise.all(result.map(async (newData: any) => {
          subjectNames = newData.subjectDetails;
         }));
         setSubjectList(subjectNames);
         fetchSubjectDetails(subjectNames);
         
    } catch (error) {
        console.error('Error fetching subjects:', error);
    }
};

  const fetchSubjectDetails= async (subjectList:any) => {
    try{
      console.log("sId",subjectList);
      let chapNames: string[] =[];
      subjectList.flat().map(async (item:any, )=>{
        const sId = item.subjectId;
        const res = await axios.get(`http://localhost:4000/subjectdetails?_id=${sId}`)
        const { data } = res.data;
        // data.map((chap:any) =>{
        //   chap.chapterNames.map((cName:any, index:number) =>{
        //     chapNames.push(cName[index])
        //   })
        //   setChapterList(chapNames);
            console.log("Array",data);
        //})
      })
    }catch(error){
      console.error('Error submitting attendance:', error);
    }
  };
  
  const fetchChapters= async (subjectList:any) => {
    try{
        const sId = subjectList;
        const res = await axios.get(`http://localhost:4000/subjectdetails?_id=${sId}`)
        const { data } = res.data;
        subjectNamesArray.push(data);
        data.map((newData:any) => {
          console.log("chapter1233",newData.chapterNames)
          setChapterList(newData.chapterNames)
        })
    }catch(error){
      console.error('Error submitting attendance:', error);
    }
  };
//   if (selectedBatch) {
//     fetchSubjectDetails(subjectList);
// }
// }, []);

  const handleBatchChange = (e: SelectChangeEvent<string>): void => {
    const selectedBatch = JSON.parse(e.target.value);
    setSelectedBatch(selectedBatch.batchName);
    setSelectedBatchId(selectedBatch.batchId);
    fetchSubjects(selectedBatch.batchId);
  };

  const handleSubjectChange = (e: SelectChangeEvent<string>): void => {
    const selectedSubject = JSON.parse(e.target.value);
    //console.log("selectedSubject",selectedSubject)
    setSelectedSubjectName(selectedSubject.subjectName);
    setSelectedSubjectId(selectedSubject.subjectId);
    fetchChapters(selectedSubject.subjectId);
  };

  const handleChapterChange = (e: SelectChangeEvent<string>): void => {
    const selectedChapter = JSON.parse(e.target.value);
    //console.log("selectedSubject",selectedChapter);
    setSelectedChapterName(selectedChapter.chapterName);
  };

  // const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   const percentageCompleted = e.target;
  //   setchapterCompleted(percentageCompleted);
  // };

  const submitSubject = async () => {
    try {
      const payload = {
        batchId: selectedBatchId,
        batchName: selectedBatch,
        subjectId: selectedSubjectId,
        subjectName: selectedSubjectName,
        chapterName: selectedChapterName,
        Date: selectedTestDate,
        completedPercentage: chapterCompleted, 
      };
      console.log("payload",payload);
      const response = await axios.post('http://localhost:4000/subjecttracking', payload);
      console.log(response);
      setSubmitted(true);
      if(response.status===201){
        alert("Successfully added!!")
        window.location.reload();
      }else{
        alert("Please enter the correct details");
      }
    } catch (error) {
      console.error('Error submitting attendance:', error);
    }
  };

  return (
    <div>
        <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
        {/* <TabList>
            <Tab>
              <Button component={Link} to="/studentattendance">Attendance Reports</Button>
            </Tab>
            <Tab>
               <Button component={Link} to="/grading">Grading</Button>
            </Tab>
            <Tab>
            <Button component={Link} to="/subjecttracking">Subject Tracking</Button>
        </Tab>
        <Tab>
            <Button component={Link} to="/batchwisedetails">Batch Details</Button>
        </Tab>
        </TabList> */}
      </Tabs>
        <div>
        <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <Button component={Link} to="/subjecttracking">Subjects Tracking</Button>
        <Button component={Link} to="/subjecttrackingreports">Subjects Reports</Button>
      </Toolbar>
    </AppBar>
      </div>
      <Stack spacing={3}>
      <label>Select Batch:</label>
      <Select value={JSON.stringify({ batchId: selectedBatchId, batchName: selectedBatch })} onChange={handleBatchChange}>
        <MenuItem value="">Select Batch</MenuItem>
        {batchOptions.map((batch) => (
          <MenuItem key={batch._id} value={JSON.stringify({ batchId: batch._id, batchName: batch.batchName })}>{batch.batchName}</MenuItem>
        ))}
      </Select>
      <label>Select Subject:</label>
      <Select value={JSON.stringify({ subjectId: selectedSubjectId, subjectName: selectedSubjectName })} onChange={handleSubjectChange}>
        <MenuItem value="">Select Batch</MenuItem>
        {subjectsList.map((subject) => (
          <MenuItem key={subject._id} value={JSON.stringify({ subjectId: subject.subjectId, subjectName: subject.subjectName })}>{subject.subjectName}</MenuItem>
        ))}
      </Select>
      <label>Select Chapter:</label>
      <Select value={JSON.stringify({ chapterName: selectedChapterName })} onChange={handleChapterChange}>
         {chapterList.flat().map((chapter) => (
          <MenuItem key={chapter} value={JSON.stringify({ chapterName: chapter })}>{chapter}</MenuItem>
        ))} 
      </Select>
      <label> Test Date </label>
      <TextField
            //label="Test Date"
            type="date"
            style= {{width : 700}}
            value={selectedTestDate}
            onChange={(e) => setSelectedTestDate(e.target.value)}
          />
          
            <TextField
              label="Percentage of Chapter Completed"
              id="chaptercompleted"
              type="number"
              variant="outlined"
              name="chaptercompleted"
              style= {{width : 700}}
              value={chapterCompleted}
              onChange={(e) => setchapterCompleted(e.target.value)}
              //onChange={handleChange}
              required
            />
        </Stack>
      <Button onClick={submitSubject} disabled={!chapterCompleted.length ||!selectedBatch.length||!selectedSubjectName.length || !selectedChapterName.length||!selectedTestDate.length|| submitted}>
        Submit
      </Button>
      {submitted}
    </div>
  );
};

export default SubjectTracking;
