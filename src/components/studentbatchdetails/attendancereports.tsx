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
  Paper,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import XLSX from "sheetjs-style";
import { Tab, TabList, Tabs } from "react-tabs";
import ReactPaginate from "react-paginate";
import { groupBy } from "lodash";

const AttendanceReport: React.FC = () => {
  const [batchOptions, setBatchOptions] = useState<any[]>([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [students, setStudents] = useState<any[]>([]);
  const [studentsList, setUniqueStudents] = useState<any[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<string>("");
  const [attDetails, setAttDetails] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false); // Track if attendance is already submitted for the day
  const [selectedDate, setSelectedDate] = useState<number>(
    new Date().getDate() + 1
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1);

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
    const fetchStudentsAttendance = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/studentattendancedetails/batchId/${selectedBatchId}`
        );
        const { data } = response.data;

        // Filter the data based on selected month and year
        const filteredData = data.filter((element: any) => {
          const date = new Date(element.dateOfAttendance);
          return (
            date.getMonth() + 1 === selectedMonth &&
            date.getFullYear() === selectedYear
          );
        });

        let studentArray: {
          studentId: string;
          studentName: string;
          attendanceStatus: string;
        }[] = [];
        filteredData.forEach((element: any) => {
          const studentId = element.studentId;
          const studentName = element.studentName;
          const attendanceStatus = element.attendanceStatus;
          const studentObject = {
            studentId,
            studentName,
            attendanceStatus,
          };
          studentArray.push(studentObject);
        });

        const groupedStudents = groupBy(studentArray, "studentId");
        const uniqueStudents = Object.entries(groupedStudents).map(
          ([studentId, studentList]: [string, any[]]) => {
            const combinedStatus = studentList.reduce(
              (acc, student) => {
                acc.studentId = student.studentId;
                acc.studentName = student.studentName;
                acc.attendanceStatus.push(student.attendanceStatus);
                return acc;
              },
              { studentId: "", studentName: "", attendanceStatus: [] }
            );

            return combinedStatus;
          }
        );

        setUniqueStudents(uniqueStudents);

        const students = filteredData.map((element: any) => ({
          studentName: element.studentName,
          studentId: element.studentId,
        }));
        setStudents(students);

        const details = filteredData.map((element: any) => ({
          studentId: element.studentId,
          studentName: element.studentName,
          attendanceStatus: element.attendanceStatus,
          dateOfAttendance: element.dateOfAttendance,
          batchId: selectedBatchId,
          batchName: selectedBatch,
        }));

        setAttDetails(details);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    if (selectedBatchId) {
      fetchStudentsAttendance();
    }
  }, [selectedBatchId, selectedMonth, selectedYear]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleBatchChange = (e: SelectChangeEvent<string>): void => {
    const selectedBatch = JSON.parse(e.target.value);
    setSelectedBatch(selectedBatch.batchName);
    setSelectedBatchId(selectedBatch.batchId);
  };

  const renderAttendanceStatus = (student: any, attDetails: any) => {
    const attendanceStatus = [];
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    let dataFound = false;

    for (let i = 1; i <= daysInMonth; i++) {
      const attendanceDetail = attDetails.find(
        (detail: any) =>
          detail.studentName === student &&
          new Date(detail.dateOfAttendance).getDate() === i
      );

      // If attendance detail is found, display the attendance status, otherwise display '-'
      if (attendanceDetail) {
        dataFound = true;
        attendanceStatus.push(
          <TableCell key={i}>{attendanceDetail.attendanceStatus}</TableCell>
        );
      } else {
        attendanceStatus.push(<TableCell key={i}>-</TableCell>);
      }
    }
    if (!dataFound) {
      return <TableCell colSpan={daysInMonth}>No Data Found</TableCell>;
    }
    return attendanceStatus;
  };

  const downloadExcelFile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/studentattendancedetails/batchId/${selectedBatchId}`
      );
      const data = response.data.data;
      //console.log("data",data);

      // const details = data.map((element: any) => ({
      //   attendanceStatuses: element.attendance.map((attendanceItem: any) => ({
      //     studentId: attendanceItem.studentId,
      //     studentName: attendanceItem.studentName,
      //     attendanceStatus: attendanceItem.attendanceStatus,
      //   })),
      //   batchId: element.batchId,
      //   batchName: element.batchName,
      //   dateOfAttendance: element.dateOfAttendance,
      // }));
      const filteredData = data.map((student: any) =>
        student.attendance.map((item: any, index: number) => ({
          "Batch Name": student.batchName,
          "Student Name": item.studentName,
          "Attendance Status": item.attendanceStatus,
          Date: student.dateOfAttendance,
        }))
      );
      //console.log("Filter", filteredData);

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(filteredData.flat());
      XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const excelBlob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Save Excel file
      saveAs(excelBlob, "Attendance.xlsx");
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate(); // Get the number of days in the selected month

  const headerCells: any = []; // Array to hold the header cells for each date in the selected month

  for (let day = 1; day <= daysInMonth; day++) {
    const formattedDate = `${day}`; // Format the date as YYYY-MM-DD
    headerCells.push(
      <TableCell key={formattedDate}>{formattedDate}</TableCell>
    );
  }

  return (
    <div>
        <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
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
              batchId: batch.id,
              batchName: batch.batchName,
            })}
          >
            {batch.batchName}
          </MenuItem>
        ))}
      </Select>
      <label>Select Month:</label>
      <Select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(Number(e.target.value))}
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
          <MenuItem key={month} value={month}>
            {month}
          </MenuItem>
        ))}
      </Select>
      <label>Select Year:</label>
      <Select
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
      >
        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(
          (year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          )
        )}
      </Select>
      {/* <label>Select Date:</label>
      <Select value={selectedDate} onChange={(e) => setSelectedDate(Number(e.target.value))}>
        {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
          <MenuItem key={date} value={date}>{date}</MenuItem>
        ))}
      </Select> */}
      <button onClick={downloadExcelFile} style={{ float: "right" }}>
        Download Excel
      </button>
    </div>
      <br/>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                {/* Display the header with dates of the selected month and year */}
                {headerCells}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Map through students */}
              {studentsList.map((student) => (
                <TableRow key={student.studentId}>
                  <TableCell>{student.studentName}</TableCell>
                  {renderAttendanceStatus(student.studentName, attDetails)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1, 25, 100]}
          component="div"
          count={studentsList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(attDetails.length / studentsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      /> */}
    </div>
  );
};

export default AttendanceReport;
