import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, TableContainer, TablePagination } from '@mui/material';

const MonthlyAttendanceReport: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/staffsattendancedetails/get-staff-attendance?month=3&year=2024');
        const results = response.data;
        const { data } = results;
        console.log(data);
        setAttendanceData(data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchData();
  }, []);

  // Extract unique staff names
  const staffNames = Array.from(new Set(attendanceData.map((data) => data.attendance.map((item: any) => item.staffName))));
  console.log("staffNames",staffNames)
  return (
    <div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Staff Name</TableCell>
            {attendanceData.map((data) => (
              <TableCell key={data._id}>{new Date(data.dateOfAttendance).getDate()}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {staffNames.map((staffName) => (
            staffName.map((staff:any, index:number) => (
            <TableRow key={staff}>
              <TableCell>{staffName[index]}</TableCell>
              {attendanceData.map((data) => {
                const attendance = data.attendance.find((item: any) => item.staffName === staffName);
                return <TableCell key={data._id}>{attendance ? attendance.attendanceStatus : '-'}</TableCell>;
              })}
            </TableRow>
            ))
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 25, 100]}
        component="div"
        count={staffNames.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  );
};

export default MonthlyAttendanceReport;
