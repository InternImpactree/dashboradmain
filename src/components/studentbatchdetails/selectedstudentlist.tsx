import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Tab, Tabs, TabList } from 'react-tabs';
import { Link } from 'react-router-dom';
import Batch from '../../interfaces/batchlist/batchlist';
import Student from '../../interfaces/studentlist/studentlist';
import ReactPaginate from 'react-paginate';

const SelectedStudentList: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedProgramType, setSelectedProgramType] = useState<string>('');
    const [batchOptions, setBatchOptions] = useState<Batch[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [selectedStudents, setSelectedStudents] = useState<{ [studentId: string]: { batchId: string, batchName: string, studentId: string } }>({});
    const studentsPerPage = 20;

    useEffect(() => {
        fetchBatchOptions();
        fetchStudents();
    }, [selectedProgramType]);

    const fetchStudents = async () => {
        try {
            //console.log("1S",selectedProgramType);
            const preScreening = 'Selected';    
            const response = await fetch(`http://localhost:4000/studentdetails?programType=${selectedProgramType}&preScreening=${preScreening}&batchStatus=${false}`);
            const result = await response.json();
            const { data } = result;
            setStudents(data);
            console.log("1D",data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchBatchOptions = async () => {
        try {
            //console.log("2S",selectedProgramType);
            const response = await fetch(`http://localhost:4000/add-batch?programType=${selectedProgramType}`);
            const result = await response.json();
            const { data } = result;
            setBatchOptions(data);
            //console.log("2D",data);
        } catch (error) {
            console.error('Error fetching batch options:', error);
        }
    };

    const handleBatchChange = (studentId: string, e: React.ChangeEvent<HTMLSelectElement>): void => {
        const selectedBatchString = e.target.value;
        const selectedBatch = JSON.parse(selectedBatchString);
        setSelectedStudents(prevState => ({
            ...prevState,
            [studentId]: {
                batchId: selectedBatch.batchId,
                batchName: selectedBatch.batchName,
                studentId: studentId,
            }
        }));
    };

    const offset = currentPage * studentsPerPage;
    const currentPageStudents = students.slice(offset, offset + studentsPerPage);

    const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    };

    const sendStudentDetails = async (studentId:string): Promise<void> => {
        try {
          const response = await fetch(`http://localhost:4000/studentdetails/studentId/${studentId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              batchStatus: true, 
            }),
          });
    
          if (response.ok) {
            console.log(`Student ${studentId} details sent successfully!`);
          } else {
            console.error(`Failed to send details of student ${studentId}`);
          }
        } catch (error) {
          console.error('Error sending student details:', error);
        }
      };
    

    const handleSubmit = async (): Promise<void> => {
        try {
            const requests = Object.values(selectedStudents).map(async (studentData) => {
                const response = await fetch('http://localhost:4000/batchwisedetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        batchId: studentData.batchId,
                        batchName: studentData.batchName,
                        studentId: studentData.studentId,
                    }),
                });
                if (!response.ok) {
                    console.error(`Failed to add selected student ${studentData.studentId}`);
                    return;
                }
                await sendStudentDetails(studentData.studentId);
            });
            await Promise.all(requests);
            if(requests.length===0){
                alert('Please Select the students');
                return;    
            }else{
                alert('Selected students added successfully!');
            }
        } catch (error) {
            console.error('Error adding selected students:', error);
            alert('Failed to add selected students');
        }
        window.location.reload(); // Refresh the page after submission
    };

    return (
        <div>
            <Tabs selectedIndex={2}>
                {/* <TabList>
                    <Tab>
                        <Button component={Link} to="/students">Pre Screening</Button>
                    </Tab>
                    <Tab>
                        <Button component={Link} to="/prescreening">Screening</Button>
                    </Tab>
                    <Tab>
                        <Button component={Link} to="/batchwisedetails">Final Induction List</Button>
                    </Tab> */}
                    {/* <Tab>
                        <Button component={Link} to="/studentattendance">Attendance Reports</Button>
                    </Tab>
                    <Tab>
                        <Button component={Link} to="/subjecttracking">Subject Tracking</Button>
                    </Tab> */}
                {/* </TabList> */}
            </Tabs>
            <br/>
            <div>
                Select Program Type:
                <select value={selectedProgramType} onChange={(e) => setSelectedProgramType(e.target.value)} className='select-program'>
                    <option value="">Select Program Type</option>
                    <option value="Educational">Educational</option>
                    <option value="Vocational">Vocational</option>
                    <option value="Other Trainings">Other Trainings</option>
                </select>
                <button onClick={handleSubmit} style={{ float: 'right' }}>Assign Batch</button>
            </div>
            <br />
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Qualification</th>
                        <th>Batch</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.studentId}>
                            <td>{index + 1}</td>
                            <td>{student.studentName}</td>
                            <td>{student.phoneNumber}</td>
                            <td>{student.qualification}</td>
                            <td>
                                <select onChange={(e) => handleBatchChange(student.studentId, e)}>
                                    <option value="">Select Batch</option>
                                    {batchOptions.map(batch => (
                                        <option key={batch._id} value={JSON.stringify({ batchId: batch._id, batchName: batch.batchName })}>
                                            {batch.batchName}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
        </div>
    );
};

export default SelectedStudentList;
