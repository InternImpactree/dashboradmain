import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, MenuItem, Table, TableHead, TableBody, TableRow, TableCell, Button, SelectChangeEvent, AppBar, Toolbar, Typography, Paper, TableContainer, TablePagination } from '@mui/material';
import { Tab, Tabs, TabList } from 'react-tabs';
import { Link, NavLink } from 'react-router-dom';
import Staffs from '../../interfaces/staffslist';

const StaffAttendanceManagement: React.FC = () => {
  const [staffs, setStaffs] = useState<Staffs[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [attDetails, setAttDetails] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // Track if attendance is already submitted for the day


  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/teachersdetails`);
        const staffsData = response.data.data || [];
        setStaffs(staffsData);
        setAttendance([]);
        setSubmitted(false);
      } catch (error) {
        console.error('Error fetching staffs details:', error);
      }
    };
        fetchStaffs();
  }, []);

  useEffect(() => {
    const fetchStaffsAttendance = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/teachersdetails`);
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
        
      }
    };
    fetchStaffsAttendance();
  }, []);

  const markAttendance = (staffId: string, staffName: string, status: string) => {
    const updatedAttendance = attendance.map(entry => {
      if (entry.staffId === staffId) {
        return { ...entry, status };
      }
      return entry;
    });
    const existingEntry = updatedAttendance.find(entry => entry.staffId === staffId);
    if (!existingEntry) {
      updatedAttendance.push({ staffId, staffName, status });
    }
    setAttendance(updatedAttendance);
  };

  const submitAttendance = async () => {
    try {
      // Construct the payload with attendance data
      const payload = {
        dateOfAttendance: new Date().toISOString().split('T')[0],
        attendance: attendance.map((entry: any) => ({
          staffId: entry.staffId,
          staffName: entry.staffName,
          attendanceStatus: entry.status // Assuming status is either 'Present' or 'Absent'
        })),
        
      };
      //console.log("payload",payload);
      await axios.post('http://localhost:4000/staffsattendancedetails', payload);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting attendance:', error);
    }
  };
  return (
    <div>
        <div>
        <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <Button component={Link} to="/staffattendance">Daily Attendance</Button>
        <Button component={Link} to="/staffattendancereports">Attendance Reports</Button>
      </Toolbar>
    </AppBar>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
          <TableCell>Staff Id</TableCell>
            <TableCell>Staff Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Attendance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {staffs.flat().map((staff) => (
            <TableRow key={staff.staffId}>
              <TableCell>{staff.staffId}</TableCell>
              <TableCell>{staff.staffName}</TableCell>
              <TableCell>{staff.phoneNumber}</TableCell>
              <TableCell>
                <select
                  value={attendance.find((entry: any) => entry.staffId === staff.staffId)?.status || ''}
                  onChange={(e) => markAttendance(staff.staffId, staff.staffName, e.target.value as string)}
                >
                  <option >select any...</option>
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
        count={staffs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
      <Button onClick={submitAttendance} disabled={!staffs.length || submitted}>
        Submit Attendance
      </Button>
      {submitted && <p>Attendance submitted for today.</p>}
    </div>
  );
};

export default StaffAttendanceManagement;
