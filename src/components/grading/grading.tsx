import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  AppBar,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  SelectChangeEvent,
  Paper,
  TableContainer,
  Toolbar,
} from "@mui/material";
import Batch from "../../interfaces/batchlist/batchlist";
import Student from "../../interfaces/studentlist/studentlist";
import SubjectForm from "../../interfaces/subjectlist/subjectlist";
import { Tabs, Tab, TabList } from "react-tabs";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const GradingComponent: React.FC = () => {
  const [batchOptions, setBatchOptions] = useState<Batch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<any>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [subject, setSubject] = useState<any[]>([]);
  const [subjectList, setSubjectList] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedTestDate, setSelectedTestDate] = useState<string>("");
  const [chapterList, setChapterList] = useState<any[]>([]);
  const [selectedChapterName, setSelectedChapterName] = useState<string>("");
  const [marks, setMarks] = useState<{ [studentId: string]: number }>({});
  const [activeTab, setActiveTab] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const studentsPerPage = 20;

  useEffect(() => {
    const fetchBatchOptions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/add-batch");
        const { data } = response.data;
        setBatchOptions(data || []);
      } catch (error) {
        console.error("Error fetching batch options:", error);
      }
    };
    fetchBatchOptions();
  }, []);

  const fetchSubjects = async (selectedBatch: string | undefined) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/add-batch?_id=${selectedBatch}`
      );
      const { data } = response.data;
      const result = data;
      const subjectNamesArray: string[] = [];
      await Promise.all(
        result.map(async (newData: any) => {
          const subjectNames = newData.subjectDetails;
          console.log("subaject Name", subjectNames);
          subjectNamesArray.push(subjectNames);
        })
      );
      //setSubjectList(subjectNamesArray);
      fetchSubjectDetails(subjectNamesArray);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchSubjectDetails = async (subjectList: any) => {
    try {
      let subjectArray: string[] = [];
      subjectList.map(async (subjectId: any, index: number) => {
        subjectId.map((item: any) => {
          subjectArray.push(item);
        });
      });
      setSubjectList(subjectArray);
      const subjectNamesArray: any[] = [];
      subjectArray.map(async (item: any) => {
        const sId = item.subjectId;
        const res = await axios.get(
          `http://localhost:4000/subjectdetails?_id=${sId}`
        );
        const { data } = res.data;
        subjectNamesArray.push(data);
        setSubject(subjectNamesArray);
      });
    } catch {}
  };

  useEffect(() => {
    const fetchChapterNames = async (subId: string) => {
      try {
        if (subId.length === 0) {
          return;
        } else {
          const response = await axios.get(
            `http://localhost:4000/subjectdetails?_id=${subId}`
          );
          const { data } = response.data;
          data.map((newData: any) => {
            setChapterList(newData.chapterNames);
          });
        }
      } catch (error) {
        console.error("Error fetching batch options:", error);
      }
    };
    fetchChapterNames(selectedSubject);
  }, [selectedSubject]);

  const handleSubjectChange = async (e: SelectChangeEvent<string>) => {
    const subjectId = e.target.value as string;
    //console.log("subjectId",subjectId )
    const selectedSubject = subject.find(
      (subjects: { id: string }) => subjects.id === subjectId
    );
    //console.log("subject",selectedSubject )
    setSelectedSubject(subjectId);
  };

  const handleBatchChange = async (e: SelectChangeEvent<string>) => {
    const batchId = e.target.value as string;
    const selectedBatch = batchOptions.find((batch) => batch._id === batchId);
    //console.log("selectedBatch",selectedBatch?._id);
    setSelectedBatch(selectedBatch);
    fetchSubjects(selectedBatch?._id);
    if (selectedBatch) {
      try {
        const response = await axios.get(
          `http://localhost:4000/batchwisedetails?batchId=${selectedBatch?._id}`
        );
        const studentsData = response.data.data || [];
        const studentDetailsPromises = studentsData.map(
          async (student: any) => {
            const studentId = student.studentId;

            const studentResponse = await axios.get(
              `http://localhost:4000/studentdetails?studentId=${studentId}`
            );

            return studentResponse.data.data;
          }
        );
        const studentsDetails = await Promise.all(studentDetailsPromises);
        setStudents(studentsDetails);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }
  };
  const offset = currentPage * studentsPerPage;
  const currentPageStudents = students.slice(offset, offset + studentsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleChapterChange = (e: SelectChangeEvent<string>): void => {
    const selectedChapter = e.target.value;
    setSelectedChapterName(selectedChapter);
  };

  const handleSubmit = async () => {
    if (
      !selectedBatch ||
      !selectedSubject ||
      !selectedTestDate ||
      !selectedChapterName
    ) {
      alert("Please select the batch, subject, test date, and chapter name");
      return;
    }
    // console.log("Marks:", marks);
    // console.log("Students:", students);
    // const allStudentsMarked1 = students.flat().every(student => {
    //   console.log(`Student ID: ${student.studentId}, Mark: ${marks[student.studentId]}, Type: ${typeof marks[student.studentId]}`);
    //   return typeof marks[student.studentId] === 'number' && marks[student.studentId] !== undefined;
    // });
    // console.log("All students marked1:", allStudentsMarked1);

    const allStudentsMarked = students
      .flat()
      .every((student) => typeof marks[student.studentId] === "number");
    console.log("All students marked:", allStudentsMarked);
    if (!allStudentsMarked) {
      console.log("allStudentsMarked", allStudentsMarked);
      console.log(
        "Object",
        Object.entries(marks).map(([studentId, mark]) => ({ studentId, mark }))
      );
      alert("Please enter marks for all students.");
      return;
    }
    try {
      const payload = {
        batchId: selectedBatch?._id,
        batchName: selectedBatch?.batchName,
        subjectId: selectedSubject,
        gradingMarks: Object.entries(marks).map(([studentId, mark]) => ({
          studentId,
          mark,
        })),
        chapterName: selectedChapterName,
        testDate: selectedTestDate,
      };
      console.log("pay", payload);
      await axios.post("http://localhost:4000/studentgrading", payload);
      alert("Marks successfully updated");
      //setMarks({});
      window.location.reload();
    } catch (error) {
      console.error("Error submitting grades:", error);
    }
  };

  return (
    <div>
      <div>
      <div>
        <Tabs
          selectedIndex={activeTab}
          onSelect={(index) => setActiveTab(index)}
        >
          {/* <TabList>
            <Tab>
              <Button component={Link} to="/studentattendance">
                Attendance Reports
              </Button>
            </Tab>
            <Tab>
              <Button component={Link} to="/grading">
                Grading
              </Button>
            </Tab>
            <Tab>
              <Button component={Link} to="/subjecttracking">
                Subject Tracking
              </Button>
            </Tab>
            <Tab>
              <Button component={Link} to="/batchwisedetails">
                Batch Details
              </Button>
            </Tab>
          </TabList> */}
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
      <div>
        <AppBar
          position="static"
          sx={{ bgcolor: "transparent", boxShadow: "none" }}
        />
        <label> Select Batch: </label>
        <Select value={selectedBatch?._id} onChange={handleBatchChange}>
          <MenuItem value="">Select Batch</MenuItem>
          {batchOptions.map((batch) => (
            <MenuItem key={batch._id} value={batch._id}>
              {batch.batchName}
            </MenuItem>
          ))}
        </Select>
        <label> Select Subject: </label>
        <Select value={selectedSubject} onChange={handleSubjectChange}>
          {subject.flat().map((newSubject: any) => (
            <MenuItem key={newSubject.id} value={newSubject.id}>
              {newSubject.subjectName}
            </MenuItem>
          ))}
        </Select>
        <label> Chapter Name: </label>
        <Select
          label="Chapter Name"
          value={selectedChapterName}
          onChange={handleChapterChange}
        >
          {chapterList.flat().map((newChapter: any) => (
            <MenuItem value={newChapter}>{newChapter}</MenuItem>
          ))}
        </Select>
        <label> Test Date:</label>
        <TextField
          // label="Test Date"
          type="date"
          value={selectedTestDate}
          onChange={(e) => setSelectedTestDate(e.target.value)}
        />
        </div>
        <br/>
        {selectedBatch && (
          <div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Mark</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.flat().map((student) => (
                  <TableRow key={student.studentId}>
                    <TableCell>{student.studentName}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={marks[student.studentId]}
                        onChange={(e) =>
                          setMarks((prevMarks) => ({
                            ...prevMarks,
                            [student.studentId]: parseInt(e.target.value),
                          }))
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </TableContainer>
            </Paper>
            <Button
              onClick={handleSubmit}
              disabled={
                !marks ||
                !selectedTestDate ||
                !selectedBatch ||
                !selectedSubject
              }
              style={{ float: "right" }}
            >
              Submit
            </Button>
          </div>
        )}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={Math.ceil(students.length / studentsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default GradingComponent;
