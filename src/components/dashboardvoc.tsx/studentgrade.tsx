import { AppBar, Button, Menu, MenuItem, Select, Toolbar } from "@mui/material";
// import React,{useEffect, useState} from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import * as React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
    id: 'studentName' | 'endlineGrade' | 'baselineGrade' | 'overallGrade';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: string | number) => string;
   }
   
   const columns: readonly Column[] = [
    { id: 'studentName', label: 'Student Name', minWidth: 170 },
    { id: 'endlineGrade', label: 'Endline Grade', minWidth: 170, align: 'right' },
    { id: 'baselineGrade', label: 'Baseline Grade', minWidth: 170, align: 'right' },
    { id: 'overallGrade', label: 'Overall Grade', minWidth: 170, align: 'right' },
   ];
   
  interface Data {
    studentName: string;
    endlineGrade: number;
    baselineGrade: number;
    overallGrade: number;
   }
   

   function createData(
    studentName: string,
    endlineGrade: number,
    baselineGrade: number,
    overallGrade: number
   ): Data {
    return {
       studentName,
       endlineGrade,
       baselineGrade,
       overallGrade,
    };
   }
   
    const rows = [
        createData('John Doe', 85, 75, 80),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        createData('Jane Smith', 90, 85, 87.5),
        // Add more rows as needed
    ];


export default function PositionedMenu() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
const open = Boolean(anchorEl);
const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};


    return(
    
        <><h1></h1><div>
            <AppBar position="static" sx={{ bgcolor: '#3485ae', boxShadow: 'none' }}>
                <Toolbar>
          <Button component={Link} to="/mobilization"><p style={{color:"white",textTransform: "capitalize"}}>Mobilization</p></Button>
         
          <Button component={Link} to="/assessment"><p style={{color:"white",textTransform: "capitalize"}}>Assessment</p></Button>
          <Button component={Link} to="/studentgrade"><b style={{color:"black",textTransform: "capitalize"}}>Student Grade</b></Button>
          <Button component={Link} to="/placements"><p style={{color:"white",textTransform: "capitalize"}}>Placements</p></Button>
        <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      


      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
 <MenuItem component={Link} to="/grading" onClick={handleClose}>Grading</MenuItem>
 <MenuItem component={Link} to="/account" onClick={handleClose}>My account</MenuItem>
 <MenuItem component={Link} to="/logout" onClick={handleClose}>Logout</MenuItem>
      </Menu>
                </Toolbar>
            </AppBar>
        </div>

        <div><h3 style={{textAlign:'center'}}> Student Grades </h3></div>

<Paper sx={{ width: '80%', overflow: 'hidden', marginLeft:'10%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.endlineGrade}>
                    {columns.map((column) => {
                      const value = row[column.id as keyof typeof row];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
 rowsPerPageOptions={[10, 25, 100]}
 component="div"
 count={rows.length}
 rowsPerPage={rowsPerPage}
 page={page}
 onPageChange={handleChangePage}
 onRowsPerPageChange={handleChangeRowsPerPage}
/>

    </Paper>
    

</>
                )
                }

                // export default StudentGrade;