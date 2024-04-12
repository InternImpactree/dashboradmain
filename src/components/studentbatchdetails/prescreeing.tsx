import React, { useEffect, useState } from 'react';
import '../../components/mobilizationform/tablestyle.css';
import Student from '../../interfaces/studentlist/studentlist';
//import Batch from '../../interfaces/batchlist/batchlist';
import { Tab, Tabs, TabList } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ReactPaginate from 'react-paginate';

const PreScreeningList: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
    const [programType, setProgramType] = useState<string>('');
    const [studentStatus, setStudentStatus] = useState<{ [studentId: string]: boolean }>({});
    const [selectedTypes, setSelectedTypes] = useState<{ [studentId: string]: string[] }>({});
    const [activeTab, setActiveTab] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const studentsPerPage = 20;

    useEffect(() => {
        // Fetch students from the API
        let status = "";
        const fetchStudents = async () => {
            try {
                const response = await fetch(`http://localhost:4000/studentdetails?selectedType=${status}&programType=${programType}`);
                const result = await response.json();
                const { data } = result;
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        Promise.all([fetchStudents()]);
    }, [programType]);

    useEffect(() => {
        // Initialize student status
        const initialStatus: { [studentId: string]: boolean } = {};
        students.forEach(student => {
            initialStatus[student.studentId] = false;
        });
        setStudentStatus(initialStatus);
    }, [students]);

    // const handleTypeChange = (studentId: string, type: string): void => {
    //     setSelectedTypes(prevTypes => ({
    //         ...prevTypes,
    //         [studentId]: prevTypes[studentId] ? [...prevTypes[studentId], type] : [type],
    //     }));

    //     setSelectedStudents(prevSelected => {
    //         const studentIndex = prevSelected.findIndex(student => student.studentId === studentId);

    //         // If a type is selected and the student is not already selected, add it to the list
    //         if (studentIndex === -1) {
    //             const updatedStudent: Student = students.find(student => student.studentId === studentId)!;
    //             return [...prevSelected, updatedStudent];
    //         }
    //         // Return the previous selected students if no change is needed
    //         return prevSelected;
    //     });
    // };
    const offset = currentPage * studentsPerPage;
    const currentPageStudents = students.slice(offset, offset + studentsPerPage);

    const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    };

    const handleCheckboxChange = (studentId: string, type: string): void => {
        setSelectedTypes(prevTypes => ({
            ...prevTypes,
            [studentId]: prevTypes[studentId]?.includes(type)
                ? prevTypes[studentId]?.filter(selectedType => selectedType !== type)
                : prevTypes[studentId] ? [...prevTypes[studentId], type] : [type],
        }));
        setSelectedStudents(prevSelected => {
                  const studentIndex = prevSelected.findIndex(student => student.studentId === studentId);
      
                  // If a type is selected and the student is not already selected, add it to the list
                  if (studentIndex === -1) {
                      const updatedStudent: Student = students.find(student => student.studentId === studentId)!;
                      return [...prevSelected, updatedStudent];
                  }
                  // Return the previous selected students if no change is needed
                  return prevSelected;
              });
              console.log("Selected Student", selectedStudents)
    };

    const handleSubmit = async (): Promise<void> => {
        if (selectedStudents.length === 0) {
            alert('Please select at least one student and a batch');
            return;
        }

        try {
            const requests = selectedStudents.map(async (student) => {
              console.log("1",selectedStudents);
                const response = await fetch('http://localhost:4000/studentbatchdetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        studentId: student.studentId,
                        studentName: student.studentName,
                        phoneNumber: student.phoneNumber,
                        programType: student.programType,
                        email: student.email,
                        aadharNumber: student.aadharNumber,
                        cityName: student.cityName,
                        fatherName: student.fatherName,
                        motherName: student.motherName,
                        qualification: student.qualification,
                        annualIncome: student.annualIncome,
                        preScreening: student.preScreening,
                        aadharDocument: student.aadharDocument,
                        selectedTypes: selectedTypes[student.studentId],
                    }),
                });

                if (!response.ok) {
                    console.error(`Failed to add selected student ${student.studentId}`);
                }
            });

            await Promise.all(requests);

            const updateRequests = selectedStudents.map(async (student) => {
              const response = await fetch(`http://localhost:4000/studentdetails/${student.studentId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  selectedType: selectedTypes[student.studentId],
                }),
              });
        
              if (!response.ok) {
                console.error(`Failed to update selected type for student ${student.studentId}`);
              }
            });
        
            await Promise.all(updateRequests);

            alert('Selected students added successfully!');
            setSelectedTypes({});
        } catch (error) {
            console.error('Error adding selected students:', error);
            alert('Failed to add selected students');
        }
        window.location.reload();
    };

    return (
        <div>
            <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
                {/* <TabList>
                    <Tab>
                        <Button component={Link} to="/students">Pre Screening</Button>
                    </Tab>
                    <Tab>
                        <Button component={Link} to="/prescreening">Screening</Button>
                    </Tab>
                    <Tab>
                        <Button component={Link} to="/selectedstudents">Final Induction List</Button>
                    </Tab>
                </TabList> */}
            </Tabs>
            <div>
                <button onClick={handleSubmit} style={{ float: 'right' }}>
                    Add Selected Students
                </button>
            </div>
            <br/>
            <div>
                <label>Select Type: </label>
                <select value={programType} onChange={(e) => setProgramType(e.target.value)} className='select-program'>
                    <option value="">Select Type</option>
                    <option value="Educational">Educational</option>
                    <option value="Vocational">Vocational</option>
                    <option value="Other Trainings">Other Trainings</option>
                </select>
            </div>
            <br />
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Qualification</th>
                        <th>Program Type</th>
                        <th>Pre Screening Status</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {students
                        .filter(student => !studentStatus[student.studentId]) // Filter out students already added
                        .map((student, index) => (
                            <tr key={student.id}>
                                <td>{index + 1}</td>
                                <td>{student.studentName}</td>
                                <td>{student.phoneNumber}</td>
                                <td>{student.qualification}</td>
                                <td>{student.programType}</td>
                                <td>{student.preScreening}</td>
                                <td>
                                    <div>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={selectedTypes[student.studentId]?.includes('Exam/Test')}
                                                onChange={() => handleCheckboxChange(student.studentId, 'Exam/Test')}
                                                disabled={student.preScreening === 'Rejected'}
                                            />
                                            Exam/Test
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={selectedTypes[student.studentId]?.includes('Interview')}
                                                onChange={() => handleCheckboxChange(student.studentId, 'Interview')}
                                                disabled={student.preScreening === 'Rejected'}
                                            />
                                            Interview
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={selectedTypes[student.studentId]?.includes('Others')}
                                                onChange={() => handleCheckboxChange(student.studentId, 'Others')}
                                                disabled={student.preScreening === 'Rejected'}
                                            />
                                            Others
                                        </label>
                                    </div>
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

export default PreScreeningList;
