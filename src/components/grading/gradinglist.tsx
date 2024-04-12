import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, AppBar, MenuItem, Select, Table, TableHead, TableBody, TableRow, TableCell, SelectChangeEvent, TableContainer, Paper, Toolbar } from '@mui/material';
import Batch from '../../interfaces/batchlist/batchlist';
import Student from '../../interfaces/studentlist/studentlist';
import SubjectForm from '../../interfaces/subjectlist/subjectlist';
import { Tabs, Tab, TabList } from 'react-tabs';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import XLSX from 'sheetjs-style';
import ReactPaginate from 'react-paginate';

const GradingListComponent: React.FC = () => {
  const [batchOptions, setBatchOptions] = useState<Batch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<any>('');
  const [students, setStudents] = useState<Student[]>([]);
  const [subject, setSubject] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<any>('');
  const [gradingDetails, setGradingDetails] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [subjectList, setSubjectList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const studentsPerPage = 20;

  useEffect(() => {
    const fetchBatchOptions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/add-batch');
        const { data } = response.data;
        setBatchOptions(data || []);
      } catch (error) {
        console.error('Error fetching batch options:', error);
      }
    };

    fetchBatchOptions();
  }, []);

  const fetchSubjects = async (selectedBatch: string | undefined) => {
    try {
        const response = await axios.get(`http://localhost:4000/add-batch?_id=${selectedBatch}`);
        const { data } = response.data;
        const result = data;
        const subjectNamesArray: string[] = [];
        await Promise.all(result.map(async (newData: any) => {
          const subjectNames = newData.subjectDetails;
          subjectNamesArray.push(subjectNames);
          console.log("subjectNamesArray",subjectNamesArray);
         }));
         setSubject(subjectNamesArray);

         fetchSubjectDetails(subjectNamesArray);
    } catch (error) {
        console.error('Error fetching subjects:', error);
    }
};
const fetchSubjectDetails= async (subjectList:any) => {
  try{
    let subjectArray: string[] = [];
    subjectList.map(async (subjectId:any, index:number) =>{
      subjectId.map((item:any) =>{
        //console.log("item",item);  
        subjectArray.push(item);
      })
    })
    setSubjectList(subjectArray);
    const subjectNamesArray: any[] = [];
    const sub = subjectArray.map(async (item:any, )=>{
      const sId = item.subjectId;
      const res = await axios.get(`http://localhost:4000/subjectdetails?_id=${sId}`)
      const { data } = res.data;
      subjectNamesArray.push(data);  
      //setSubject(subjectNamesArray);
    })
  }catch{

  }
};
  const fetchGradingDetails = async (selectedBatch: any | undefined, subjectId: any) => {
    try {
      //console.log("data12",selectedBatch, subjectId);  
      const response = await axios.get(`http://localhost:4000/studentgrading?batchId=${selectedBatch.id}&subjectId=${subjectId}`);
      const result = response.data;
      const { data } = result;
      //console.log("data",data);  
      setGradingDetails(data);
    } catch (error) {
      console.error('Error fetching grading details:', error);
    }
  };

  const handleSubjectChange = async (e: SelectChangeEvent<string>) => {
    const subjectId = e.target.value as string;
    //console.log('123',subjectId);
    const selectedSubject = subject.find((subjects: any) => subjects.id === subjectId,);
    setSelectedSubject(subjectId);
    if (selectedBatch && subjectId) {
     fetchGradingDetails(selectedBatch,subjectId);
    }
  };

  const handleBatchChange = async (e: SelectChangeEvent<string>) => {
    const batchId = e.target.value as string;
    const selectedBatch = batchOptions.find(batch => batch._id === batchId);
    setSelectedBatch(selectedBatch);
    fetchSubjects(selectedBatch?._id);
  };

  const offset = currentPage * studentsPerPage;
  const currentPageStudents = students.slice(offset, offset + studentsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const downloadExcelFile = async () => {
    try {  
    const response = await axios.get(`http://localhost:4000/studentgrading?batchId=${selectedBatch.id}&subjectId=${selectedBatch.subjectName}`);
    const result = response.data;
    const { data } = result;  
    const filteredData = data.map((student: any) => (
      student.gradingMarks.map((item:any, index: number) => ({
      "S.No": index+1,
      "Batch Name": student.batchName,
      "Subject Name": selectedSubject,
      "Student Name": item.studentId,
      "Mark" : item.mark,
      "Test Date": student.testDate,
      }))
  ));
  //console.log("Filter", filteredData);

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredData.flat());
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Save Excel file
    saveAs(excelBlob, 'Grading.xlsx');
  } catch (error) {
    console.error('Error fetching grading details:', error);
  }
  }

  return (
    <div>
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
      </div>
      <div>
        <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <Button component={Link} to="/grading">Enter Garding Mark</Button>
        <Button component={Link} to="/gradinglist">Batchwise Garding Mark</Button>
      </Toolbar>
    </AppBar>
      </div>
      {/* <Tabs>
        <TabList>
          <Tab>
            <Button component={Link} to="/grading">Enter Garding Mark</Button>
            <Button component={Link} to="/gradinglist">Batchwise Garding Mark</Button>
          </Tab>
        </TabList>
      </Tabs> */}
      <div>
      <div>
        <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }} />
        <label>Select Batch:</label>
        <Select value={selectedBatch?._id} onChange={handleBatchChange}>
          <MenuItem value="">Select Batch</MenuItem>
          {batchOptions.map((batch) => (
            <MenuItem key={batch._id} value={batch._id}>{batch.batchName}</MenuItem>
          ))}
        </Select>
        <label>Select Subject:</label>
        <Select value={selectedSubject} onChange={handleSubjectChange}>
          {subject.flat().map((newSubject) => (
            <MenuItem key={newSubject.id} value={newSubject.subjectId}>{newSubject.subjectName}</MenuItem>
          ))} 
        </Select>
        <button onClick={downloadExcelFile} style={{ float: 'right' }} >Download Excel</button>
        </div>
        <br/>
        {gradingDetails.length >= 0 && (
          <div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Mark</TableCell>
                  <TableCell>Test Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gradingDetails.map((gradingDetail) => (
                    gradingDetail.gradingMarks.map((gradingMarks: any) => (
                        <TableRow key={gradingMarks.studentId}>
                        <TableCell>{gradingMarks.studentId}</TableCell>
                        <TableCell>{gradingMarks.mark}</TableCell>
                        <TableCell>{gradingDetail.testDate}</TableCell>
                  </TableRow>
                    ))
                ))}
              </TableBody>
              
            </Table>
            </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
          </div>
        )}
      </div>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(gradingDetails.length / studentsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default GradingListComponent;
