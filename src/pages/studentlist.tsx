import React, { useEffect, useState } from 'react';
import '../components/mobilizationform/tablestyle.css';
import Student from '../interfaces/studentlist/studentlist';
import { Tab, Tabs, TabList } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { saveAs } from 'file-saver';
import XLSX from 'sheetjs-style';

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [programType, setProgramType] = useState<string>('');
  //const [selectedProgramType, setSelectedType] = useState<string>('');
  const [activeTab, setActiveTab] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const studentsPerPage = 20;

  useEffect(() => {
    // Fetch students from the API
    const fetchStudents = async () => {
      const status = "Select";
      try {
        const response = await fetch(`http://localhost:4000/mobilizationform?preScreening=${status}&programType=${programType}`);
        const result = await response.json();
        const { data } = result;
        console.log("selectedType",data);
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [programType]);

  const openModal = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleTypeChange = (studentId: string, selectedType: string): void => {
    // Find the student to update
    const updatedStudents = students.map(student => {
      if (student.studentId === studentId) {
        // Disable the dropdown after selection
        student.disabled = true;
        // Update the preScreening status
        student.preScreening = selectedType;
        // Send the student details to the server individually
        //sendStudentDetails(student.studentId, student);
      }
      return student;
    });

    setStudents(updatedStudents);
  };

  const sendStudentDetails = async (studentId:string, student: Student): Promise<void> => {
    try {
      console.log(studentId, student);
      const response = await fetch(`http://localhost:4000/mobilizationform/${studentId}`, { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preScreening: student.preScreening,
          selectedType: student.selectedType, 
        }),
      });

      if (response.ok) {
        console.log(`Student ${student.studentId} details sent successfully!`);
      } else {
        console.error(`Failed to send details of student ${student.studentId}`);
      }
    } catch (error) {
      console.error('Error sending student details:', error);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    console.log("students",students)
    const selectedStudentsDetails = students.filter(student => student.disabled);

    if (selectedStudentsDetails.length === 0) {
      alert('Please select at least one student');
      return;
    }

     try {
       const response = await fetch('http://localhost:4000/studentdetails', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(selectedStudentsDetails),
       });
       if (response.ok) {
        selectedStudentsDetails.forEach(student => {
          sendStudentDetails(student.studentId, student);
        });
        alert('Selected students updated successfully!');
       } else {
         alert('Failed to update selected students');
       }
     } catch (error) {
       console.error('Error updating selected students:', error);
       alert('Failed to update selected students');
     }
     window.location.reload();
   };

  const offset = currentPage * studentsPerPage;
  const currentPageStudents = students.slice(offset, offset + studentsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // const downloadCsvFile = async () => {
  //   try {
  //     const response = await fetch('http://localhost:4000/mobilizationform/');
  //     const result = await response.json();
  //     const  { data }= result;
  //     const csvContent = convertToCsv(data);

  //     const blob = new Blob([csvContent], { type: 'text/csv' });

  //     const link = document.createElement('a');
  //     link.href = window.URL.createObjectURL(blob);
  //     link.download = 'mobilizationdata.csv';

  //     link.click();

  //     window.URL.revokeObjectURL(link.href);
  //   } catch (error) {
  //     console.error('Error downloading Excel file:', error);
  //   }
  // };

  // const convertToCsv = (data: Student[]) => {
  //   const header = Object.keys(data[0]).join(',');
  //   const rows = data.map(student => Object.values(student).join(','));
  //   return header + '\n' + rows.join('\n');
  // };

  const downloadExcelFile = async () => {
    try {
      let data=[];
      if(programType.length===0){
        const response = await axios.get(`http://localhost:4000/mobilizationform`);
      data = response.data.data;

      }else{
        const response = await axios.get(`http://localhost:4000/mobilizationform?programType=${programType}`);
       data = response.data.data;
      }
      

      const filteredData = data.map((student: any, index: number) => ({
        "S.No": index+1,
        "Student Id": student.studentId,
        "Student Name": student.studentName,
        "Program Type": student.programType,
        "Email Id": student.email,
        "Phone Number": student.phoneNumber,
        "Dateof Birth": student.dateOfBirth,
        "Aadhar Number": student.aadharNumber,
        "City Name": student.cityName,
        "Father Name": student.fatherName,
        "Mother Name": student.motherName,
        "Qualification": student.qualification,
        "Family Annual Income": student.annualIncome
      }));

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Save Excel file
      saveAs(excelBlob, 'students.xlsx');
    } catch (error) {
      console.error('Error downloading Excel file:', error);
    }
  };

  const downloadDocument = async (documentName: any) => {
    try {
      console.log("documentName",documentName);
      const response = await axios({
        url: `http://localhost:4000/mobilizationform/documents/${documentName}`, // Replace with your backend route
        method: 'GET',
        responseType: 'blob', // Important for downloading files
      });
      //console.log("img", response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', documentName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  // const convertToExcel = (data: Student[]) => {
  //   const header = Object.keys(data[0]).join(',');
  //   const rows = data.map(student => Object.values(student).join(','));
  //   return header + '\n' + rows.join('\n');
  // };


//   const handleProgramTypeChange = (e: SelectChangeEvent<string>) => {
//     const selectedType = e.target.value;
//     setProgramType(selectedType);
//     //fetchBatchWiseStudents(selectedBatch);
// };

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
        </TabList>  */}
      </Tabs>
      <div style ={{ width:'500px', display:'flex', float: 'right', justifyContent:'space-around'}}>
        {/* <Button component={Link} to="/mobilizationform" style={{ float: 'right' }}>
          Add New Student
        </Button> */}
        <button style={{ float: 'right' }}>
          <Link to={"/mobilizationform"} style={{textDecoration:"none",color:"white"}}>Add New Student</Link>
        </button>
        <button onClick={handleSubmit} style={{ float: 'right' }}>
          Promote Selected Students
        </button>
      {/* </div>
      <div> */}
      {/* <Button onClick={downloadCsvFile}>Download Csv</Button> */}
      <button onClick={downloadExcelFile} style={{ float: 'right' } }>Download Excel</button>
    </div>
      <br />
      <div>
                <label>Select Type: </label>
                <select value={programType} onChange={(e) => setProgramType(e.target.value)} className='select-program'>
                    <option value="">Select Type</option>
                    <option value="Educational" >Educational</option>
                    <option value="Vocational">Vocational</option>
                    <option value="Other Trainings">Other Trainings</option>
                </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Qualification</th>
            <th>Pre-Screening Action</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {currentPageStudents.map((student, index) => (
            <tr key={student.studentId}>
              <td>{index + 1}</td>
              <td>{student.studentName}</td>
              <td>{student.phoneNumber}</td>
              <td>{student.qualification}</td>
              <td>
                <select
                  value={student.preScreening || ''}
                  onChange={(e) => handleTypeChange(student.studentId, e.target.value)}
                  // disabled={student.disabled || student.preScreening === 'Selected' || student.preScreening === 'Rejected'}
                >
                  <option value="">Select Status</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
              <td>
                <button onClick={() => openModal(student)}>View profile</button>
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
                      {/* <p>
        Aadhaar Document: <a href={`http://localhost:4000/mobilizationform?aadharDocument=${selectedStudent.aadharDocument}`} download>Download Aadhaar Document</a>
      </p> */}
      {/* Display the Aadhaar document */}
      <button onClick={() => downloadDocument(selectedStudent.aadharDocument)}>Download Document</button>
      {selectedStudent.aadharDocument && (
        <img src={`http://localhost:4000/mobilizationform?aadharDocument=${selectedStudent.aadharDocument}`} alt="Aadhaar Document" />
        // <img src={`http://localhost:4000/${selectedStudent.aadharDocument}`} alt="Aadhaar Document" />
      )}
                       {/* Add other details as needed */}
                </div>
              </div>
        )}
    </div>
  );
};

export default StudentList;
