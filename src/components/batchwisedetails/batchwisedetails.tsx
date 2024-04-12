import React, { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import Student from '../../interfaces/studentlist/studentlist';
import Batch from '../../interfaces/batchlist/batchlist';
import { saveAs } from 'file-saver';
import XLSX from 'sheetjs-style';
import { Tab, TabList, Tabs } from 'react-tabs';
import ReactPaginate from 'react-paginate';


const BatchWiseDetails: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [batches, setBatches] = useState<Batch[]>([]);
    const [selectedBatch, setSelectedBatch] = useState<string>('');
    const [staffs, setStaffs] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<number>(3);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const studentsPerPage = 20;
    const offset = currentPage * studentsPerPage;
    const currentPageStudents = students.slice(offset, offset + studentsPerPage);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    useEffect(() => {
        fetchBatches();
    }, [selectedBatch]);

    useEffect(() => {
        if (selectedBatch) {
            fetchBatchWiseStudents(selectedBatch);
        }
    }, [selectedBatch]);

    const fetchBatches = async () => {
        try {
            const response = await fetch(`http://localhost:4000/add-batch`);
            const result = await response.json();
            const { data } = result;
            setBatches(data);
        } catch (error) {
            console.error('Error fetching batches:', error);
        }
    };

    const openModal = (student: Student) => {
        //console.log("student", student);
        setSelectedStudent(student);
        setIsModalOpen(true);
      };

    const fetchBatchWiseStudents = async (batchId: string) => {
        try {
            const response = await fetch(`http://localhost:4000/batchwisedetails?batchId=${batchId}`);
            const result = await response.json();
            const { data } = result;
            const studentPromises = data.map(async (student: any) => {
                //console.log("SId",student.studentId);
                const studentResponse = await fetch(`http://localhost:4000/mobilizationform?studentId=${student.studentId}`);
                const studentResult = await studentResponse.json();
                //console.log("results",studentResult);
                return studentResult.data;
            });

            const studentDetails = await Promise.all(studentPromises);
            setStudents(studentDetails);
            console.log("Students",students);

        } catch (error) {
            console.error('Error fetching batch-wise students:', error);
        }
    };

    const handleBatchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBatchId = e.target.value;
        console.log("selectedBatchId",selectedBatchId);
        setSelectedBatch(selectedBatchId);
        fetchBatchWiseStudents(selectedBatch);
        //fetchStaffs(selectedBatchId);
    };

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
      };

    const downloadExcelFile = async () => {
        try {
            const response = await fetch(`http://localhost:4000/batchwisedetails?batchId=${selectedBatch}`);
            const result = await response.json();
            const { data } = result;

            const studentPromises = data.map(async (student: any) => {
                const studentResponse = await fetch(`http://localhost:4000/mobilizationform?studentId=${student.studentId}`);
                const studentResult = await studentResponse.json();
                return studentResult.data;

            });
            const filteredData = await Promise.all(studentPromises);
            //console.log("stdudent ", filteredData);
            const filtered = filteredData.flat().map((student: any, index) => ({
              "S.No" : index+1,
              "Student Name": student.studentName,
              "Qualification": student.qualification,
              "Program Type": student.programType,
              
            }));
          //console.log("Filter", filtered);
      
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(filtered.flat());
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
      
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
            saveAs(excelBlob, 'BatchDetails.xlsx');
          } catch (error) {
            console.error('Error downloading Excel file:', error);
          }
    }

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
            <button onClick={downloadExcelFile} style={{ float: 'right' } }>Download Excel</button>
            <div>
                <label>Select Batch: </label>
                <select value={selectedBatch} onChange={handleBatchChange} className='select-program'>
                    <option value="">Select Batch</option>
                    {batches.map(batch => (
                        <option key={batch._id} value={batch._id}>
                            {batch.batchName}
                        </option>
                    ))}
                </select>
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden'}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>S.No</TableCell>
                        <TableCell>Student Name</TableCell>
                        <TableCell>Qualification</TableCell>
                        <TableCell>Program Type</TableCell>
                        <th>Profile</th>
                        {/* <th>Staff Name</th> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.flat().map((student, index) => (
                            <tr key={student.studentId}>
                                <td>{index + 1}</td>
                                <td>{student.studentName}</td>
                                <td>{student.qualification}</td>
                                <td>{student.programType}</td>
                                <td>
                                <button onClick={() => openModal(student)}>View profile</button>
                                </td>
                            </tr>
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
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={Math.ceil(students.length / studentsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
             {isModalOpen && selectedStudent && (
            <div className="modal-container">
              <div className="modal-content">
                <span className="close" onClick={() => setIsModalOpen(false)}>
                  &times;
                    </span>
                      <h2>Student Details</h2>
                      <p>Student ID: {selectedStudent.studentId}</p>
                      <p>Name: {selectedStudent.studentName}</p>
                      <p>Date of Birth: {selectedStudent.dateOfBirth}</p>
                      <p>Phone Number: {selectedStudent.phoneNumber}</p>
                      <p>Type: {selectedStudent.programType}</p>
                      <p>Email: {selectedStudent.email}</p>
                      <p>Aadhaar Number: {selectedStudent.aadharNumber}</p>
                      <p>City: {selectedStudent.cityName}</p>
                      <p>Father Name: {selectedStudent.fatherName}</p>
                      <p>Mother Name: {selectedStudent.motherName}</p>
                      <p>Qualification: {selectedStudent.qualification}</p>
                      <p>Family Annual Income: {selectedStudent.annualIncome}</p>
                       {/* Add other details as needed */}
                </div>
              </div>
        )}
        </div>
    );
};

export default BatchWiseDetails;
