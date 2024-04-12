import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, MenuItem, Table, TableHead, TableBody, TableRow, TableCell, Button, SelectChangeEvent, AppBar, Toolbar, TableContainer, Paper, TablePagination } from '@mui/material';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { groupBy, uniqBy } from 'lodash';
import { log } from 'console';

const StaffAttendanceReport: React.FC = () => {
  const [staffs, setStaffs] = useState<any[]>([]);
  const [filteredStaffs, setFilteredStaffs] = useState<any[]>([]);
  const [uniqueStaffs, setUniqueStaffs] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [currentPage, setCurrentPage] = useState<number>(0);
  const staffsPerPage = 20;

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/staffsattendancedetails`);
        const { data } = response.data;
        setStaffs(data || []);
        console.log("data", staffs);
      } catch (error) {
        console.error('Error fetching staffs:', error);
      }
    };
    fetchStaffs();
    //filterStaffsByMonthAndYear();
  }, []);

    useEffect(() => {
       filterStaffsByMonthAndYear();
     }, [selectedMonth, selectedYear]);

  const filterStaffsByMonthAndYear = () => {
    const filtered = staffs.filter((staff) => {
      const date = new Date(staff.dateOfAttendance);
      return date.getMonth() + 1 === selectedMonth && date.getFullYear() === selectedYear;
    });
    setFilteredStaffs(filtered);
    let staffArray: { staffId: string, staffName: string, attendanceStatus: string }[] = [];
    filteredStaffs.map((element: any) => {
      element.attendance.map((mapData: any) => {
        const staffId = mapData.staffId;
        const staffName = mapData.staffName;
        const attendanceStatus = mapData.attendanceStatus;
        const staffObject = {
          staffId,
          staffName,
          attendanceStatus
        };
        staffArray.push(staffObject);
      })
    })
    const groupedStaffs = groupBy(staffArray, "staffId");
    const uniqueStaffs = Object.entries(groupedStaffs).map(([staffId, staffList]: [string, any[]]) => {
      const combinedStatus = staffList.reduce((acc, staff) => {
        acc.staffId = staff.staffId;
        acc.staffName = staff.staffName;
        acc.attendanceStatus.push(staff.attendanceStatus);
        return acc;
      }, { staffId: '', staffName: '', attendanceStatus: [] });

      return combinedStatus;
    });
    setUniqueStaffs(uniqueStaffs);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const handleMonthChange = (e: SelectChangeEvent<string | number>) => {
    setSelectedMonth(Number(e.target.value));
  };

  const handleYearChange = (e: SelectChangeEvent<string | number>) => {
    setSelectedYear(Number(e.target.value));
  };

  const offset = currentPage * staffsPerPage;
  const currentPageStudents = staffs.slice(offset, offset + staffsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const renderHeaderCells = () => {
    const numDaysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const headerCells = [];
    for (let i = 1; i <= numDaysInMonth; i++) {
      headerCells.push(<TableCell key={i}>{i}</TableCell>);
    }
    return headerCells;
  };

  const renderAttendanceStatus = (staff: any, filteredStaffs: any) => {
    const attendanceStatus = [];
    for (let i = 1; i <= 31; i++) {
      let found = '-';
      filteredStaffs.forEach((item: any) => {
        const match = item.attendance.find((data: any) => {
          if (new Date(item.dateOfAttendance).getDate() === i) {
          }
          return data.staffName === staff && new Date(item.dateOfAttendance).getDate() === i;
        });
        if (match) {
          found = match.attendanceStatus;
        }
      });
      attendanceStatus.push(<TableCell key={i}>{found}</TableCell>);
    }
    return attendanceStatus;
  };

  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <Button component={Link} to="/staffattendance">Daily Attendance</Button>
          <Button component={Link} to="/staffattendancereports">Attendance Reports</Button>
        </Toolbar>
      </AppBar>
      <div>
        <label>Select Month:</label>
        
        <Select value={selectedMonth} onChange={handleMonthChange}>
        <MenuItem value=''>Select month</MenuItem>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <MenuItem key={month} value={month}>{month}</MenuItem>
          ))}
        </Select>
        <label>Select Year:</label>
        <Select value={selectedYear} onChange={handleYearChange}>
        <MenuItem value=''>Select year</MenuItem>
          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
            <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
        </Select>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Staff Name</TableCell>
            {renderHeaderCells()}
            {/* {Array.from({ length: 31 }, (_, index) => (
          <TableCell key={index + 1}>{index + 1}</TableCell>
          ))} */}
          </TableRow>
        </TableHead>
        <TableBody>
          {uniqueStaffs.map((staff) => (
            <TableRow key={staff.staffId}>
              <TableCell>{staff.staffName}</TableCell>
              {renderAttendanceStatus(staff.staffName, filteredStaffs)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={staffs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(staffs.length / staffsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default StaffAttendanceReport;