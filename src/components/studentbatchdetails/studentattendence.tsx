import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Typography,
  TextField,
  Paper,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { Tab, Tabs, TabList } from "react-tabs";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const AttendanceManagement: React.FC = () => {
  const [batchOptions, setBatchOptions] = useState<any[]>([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<string>("");
  const [attDetails, setAttDetails] = useState([]);
  const [selectedTestDate, setSelectedTestDate] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const studentsPerPage = 20;
  const [activeTab, setActiveTab] = useState<number>(0); // Track if attendance is already submitted for the day

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

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/batchwisedetails?batchName=${selectedBatch}`
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
        //console.log("studentsDetails",studentsDetails);
        // Reset attendance when batch changes
        setAttendance([]);
        setSubmitted(false);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    if (selectedBatch) {
      fetchStudents();
    }
  }, [selectedBatch]);

  useEffect(() => {
    const fetchStudentsAttendance = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/studentattendancedetails`
        );
        const res = response;
        const { data } = res.data;

        const details = data.map((element: any) => ({
          attendanceStatuses: element.attendance.map((attendanceItem: any) => ({
            batchId: attendanceItem.batchId,
            batchName: attendanceItem.batchName,
            studentId: attendanceItem.studentId,
            studentName: attendanceItem.studentName,
            attendanceStatus: attendanceItem.attendanceStatus,
          })),
          dateOfAttendance: element.dateOfAttendance,
        }));
        setAttDetails(details);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudentsAttendance();
  }, []);

  const handleBatchChange = (e: SelectChangeEvent<string>): void => {
    const selectedBatch = JSON.parse(e.target.value);
    setSelectedBatch(selectedBatch.batchName);
    setSelectedBatchId(selectedBatch.batchId);
  };

  const offset = currentPage * studentsPerPage;
  const currentPageStudents = students.slice(offset, offset + studentsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const markAttendance = (
    studentId: string,
    studentName: string,
    status: string
  ) => {
    const updatedAttendance = attendance.map((entry) => {
      if (entry.studentId === studentId) {
        if (status === "Present" || status === "Absent") {
          return { ...entry, status };
        } else {
          alert("Please select the attendance Present or Absent");
        }
      }
      return entry;
    });
    const existingEntry = updatedAttendance.find(
      (entry) => entry.studentId === studentId
    );
    if (!existingEntry) {
      updatedAttendance.push({ studentId, studentName, status });
    }
    setAttendance(updatedAttendance);
  };

  const submitAttendance = async () => {
    if (students.length !== attendance.length) {
      alert("Please select attendance status for all students.");
      return;
    }
    try {
      // Construct the payload with attendance data
      const payload = {
        dateOfAttendance: selectedTestDate,
        batchId: selectedBatchId,
        batchName: selectedBatch,
        attendance: attendance.map((entry: any) => ({
          studentId: entry.studentId,
          studentName: entry.studentName,
          attendanceStatus: entry.status,
        })),
      };
      const response = await axios.post(
        "http://localhost:4000/studentattendancedetails",
        payload
      );
      const { success, message, data } = response.data;
      console.log("response", { success, message, data });
      if (success) {
        // If success is true, show an alert with a success message
        alert(message);
        window.location.reload();
      } else {
        // If success is false, show the data in the alert
        alert(JSON.stringify(message));
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
    }
  };
  return (
    <div>
      <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
        <TabList>
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
        </TabList>
      </Tabs>
      <div>
        <AppBar
          position="static"
          sx={{ bgcolor: "transparent", boxShadow: "none" }}
        >
          <Toolbar>
            <Button component={Link} to="/studentattendance">
              Daily Attendance
            </Button>
            <Button component={Link} to="/attendancereports">
              Attendance Reports
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <label>Select Batch:</label>
        <Select
          value={JSON.stringify({
            batchId: selectedBatchId,
            batchName: selectedBatch,
          })}
          onChange={handleBatchChange}
        >
          <MenuItem value="">Select Batch</MenuItem>
          {batchOptions.map((batch) => (
            <MenuItem
              key={batch._id}
              value={JSON.stringify({
                batchId: batch._id,
                batchName: batch.batchName,
              })}
            >
              {batch.batchName}
            </MenuItem>
          ))}
        </Select>
        <label> Date of Attendance</label>
        <TextField
          // label="Test Date"
          type="date"
          value={selectedTestDate}
          onChange={(e) => setSelectedTestDate(e.target.value)}
        />
      </div>
      <br />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table"></Table>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Attendance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.flat().map((student) => (
                <TableRow key={student.studentId}>
                  <TableCell>{student.studentName}</TableCell>
                  {/* <TableCell>{student.phoneNumber}</TableCell>
              <TableCell>{student.qualification}</TableCell> */}
                  <TableCell>
                    <select
                      value={
                        attendance.find(
                          (entry: any) => entry.studentId === student.studentId
                        )?.status || ""
                      }
                      onChange={(e) =>
                        markAttendance(
                          student.studentId,
                          student.studentName,
                          e.target.value as string
                        )
                      }
                    >
                      <option>select...</option>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </TableCell>
                </TableRow>
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
      <Button
        onClick={submitAttendance}
        disabled={
          !attendance.length ||
          !selectedBatch.length ||
          !selectedTestDate.length
        }
        style={{ float: "right" }}
      >
        Submit Attendance
      </Button>
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

export default AttendanceManagement;
