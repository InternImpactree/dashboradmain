import React, { useEffect, useState } from 'react';
import SubjectForm from '../../interfaces/subjectlist/subjectlist';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const SubjectList: React.FC = () => {
  const [subjects, setSubjects] = useState<SubjectForm[]>([]);
  const [selectedProgramType, setSelectedProgramType] = useState<string>('');
  //const [activeTab, setActiveTab] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const subjectsPerPage = 20;

  useEffect(() => {
    // Fetch students from the API
    const fetchSubjects = async () => {
      try {
        const response = await fetch(`http://localhost:4000/subjectdetails?programType=${selectedProgramType}`);
        //console.log("Data",response);
        const { data } = await response.json();
        setSubjects(data);
        //console.log("Data",data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchSubjects();
  }, [selectedProgramType]);


  const offset = currentPage * subjectsPerPage;
  const currentPageStudents = subjects.slice(offset, offset + subjectsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <h2>Subject List</h2>
      <div>
                Select Program Type:
                <select value={selectedProgramType} onChange={(e) => setSelectedProgramType(e.target.value)} className='select-program'>
                    <option value="">Select Program Type</option>
                    <option value="Educational">Educational</option>
                    <option value="Vocational">Vocational</option>
                    <option value="Other Trainings">Other Trainings</option>
                </select>
            </div>
      <div>
        <Link to="/addsubject">
          <button style={{ float: 'right' }}>
            Add New subject
          </button>
        </Link>
        <br />
        </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Subject Name</th>
            <th>Standard</th>
            <th>Number of Lessons</th>
            <th>Number of Hours</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((newsubject, index) => (
            <tr key={newsubject.subjectId}>
              <td>{index + 1}</td>
              <td>{newsubject.subjectName}</td>
              <td>{newsubject.standard}</td>
              <td>{newsubject.numLessons}</td>
              <td>{newsubject.numHours}</td>
              </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(subjects.length / subjectsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default SubjectList;
