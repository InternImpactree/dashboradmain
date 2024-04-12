import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Select, MenuItem, Table, TableHead, TableBody, TableRow, TableCell, Button, SelectChangeEvent, AppBar, Toolbar, Typography, TextField, Stack, Paper, TableContainer, TablePagination } from '@mui/material';
import { Tab, Tabs, TabList } from 'react-tabs';
import { Link, NavLink } from 'react-router-dom';

const SubjectTrackingReport: React.FC = () => {
  const [batchOptions, setBatchOptions] = useState<any[]>([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [subjectsList, setSubjectList] = useState<any[]>([]);
  const [chapterList, setChapterList] = useState<any[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<string>('');
  const [selectedSubjectName, setSelectedSubjectName] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedChapterName, setSelectedChapterName] = useState('');
  const [chapterCompleted, setchapterCompleted] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<number>(2);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchBatchOptions = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/add-batch`);
        const { data } = response.data;
        setBatchOptions(data);
      } catch (error) {
        console.error('Error fetching batch options:', error);
      }
    };
    fetchBatchOptions();
  }, []);

  useEffect(() => {
    if(selectedBatch.length===0){
      return;
    }
  const fetchSubjects = async (selectedBatch: string) => {
    try {
        const response = await axios.get(`http://localhost:4000/add-batch?_id=${selectedBatch}`);
        const { data } = response.data;
        const result = data;
        let subjectNames: string[] =[];
        await Promise.all(result.map(async (newData: any) => {
          subjectNames = newData.subjectDetails;
         }));
         setSubjectList(subjectNames);
    } catch (error) {
        console.error('Error fetching subjects:', error);
    }
};
fetchSubjects(selectedBatchId);
}, [selectedBatchId]);
  
  useEffect(() => {
    if(selectedSubjectId.length===0){
      return;
    }
  const fetchChapters= async (subjectList:any) => {
    try{
        const sId = subjectList;
        const res = await axios.get(`http://localhost:4000/subjectdetails?_id=${sId}`)
        const { data } = res.data;
        data.map((newData:any) => {
          setChapterList(newData.chapterNames)
        })
    }catch(error){
      console.error('Error submitting attendance:', error);
    }
  };
  fetchChapters(selectedSubjectId)
},[selectedSubjectId]);

  useEffect(() => {
    if(selectedChapterName.length===0 || selectedSubjectId.length===0){
      return;
    }
    const fetchDetails = async (chapName: string) => {
        try{
            const batchId = selectedBatchId;
            const chapterName= chapName;
            const subjectId = selectedSubjectId;
            const res = await axios.get(`http://localhost:4000/subjecttracking?batchId=${batchId}&subjectId=${subjectId}&&chapterName=${chapterName}`)
            const { data } = res.data;
            setchapterCompleted(data);
        }catch(error){
          console.error('Error submitting attendance:', error);
        }
    };
    fetchDetails(selectedChapterName);
  }, [selectedChapterName, selectedSubjectId]);

  const handleBatchChange = (e: SelectChangeEvent<string>): void => {
    const selectedBatch = JSON.parse(e.target.value);
    setSelectedBatch(selectedBatch.batchName);
    setSelectedBatchId(selectedBatch.batchId);
    //fetchSubjects(selectedBatch.batchId);
  };

  const handleSubjectChange = (e: SelectChangeEvent<string>): void => {
    const selectedSubject = JSON.parse(e.target.value);
    //console.log("selectedSubject",selectedSubject)
    setSelectedSubjectName(selectedSubject.subjectName);
    setSelectedSubjectId(selectedSubject.subjectId);
    //fetchChapters(selectedSubject.subjectId);
  };

  const handleChapterChange = (e: SelectChangeEvent<string>): void => {
    const selectedChapter = JSON.parse(e.target.value);
    setSelectedChapterName(selectedChapter.chapterName);
  };

    let prev=0;
    function totalcompletedPercentage(completedPercentage: string): React.ReactNode {
        let current = parseInt(completedPercentage);
        let total = prev + current;
        prev= total;
        return total;
    }

  return (
    <div>
        <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
        <TabList>
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
        </TabList>
      </Tabs>
        <div>
        <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <Button component={Link} to="/subjecttracking">Subjects Tracking</Button>
        <Button component={Link} to="/attendancereports">Subjects Reports</Button>
      </Toolbar>
    </AppBar>
      </div>
      <div>
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
      </div>
      <br/>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Chapter Name</TableCell>
            <TableCell>Completed Date</TableCell>
            <TableCell>Percentage</TableCell>
            <TableCell>Total Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chapterCompleted.map((chapter:any) => (
            <TableRow key={chapter.subjectId}>
              <TableCell>{chapter.chapterName}</TableCell>
              <TableCell>{chapter.Date}</TableCell>
              <TableCell>{chapter.completedPercentage}</TableCell>
              <TableCell>{totalcompletedPercentage(chapter.completedPercentage)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={subjectsList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  );
};

export default SubjectTrackingReport;
