import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Tabs, TabList, Tab } from 'react-tabs';
import ReactPaginate from 'react-paginate';

interface CentreForm{
    id:string,
    centreId: string,
    centreName: string,
    centreLocation: string,
}

const CentreList: React.FC = () => {
  const [centreList, setCentreList] = useState<CentreForm[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(10);
  const centresPerPage = 20;
  const offset = currentPage * centresPerPage;
  const currentPageStudents = centreList.slice(offset, offset + centresPerPage);

  useEffect(() => {
    // Fetch students from the API
    const fetchCentre = async () => {
      try {
        const response = await fetch('http://localhost:4000/centredetails');
        const result = await response.json();
        const { data } = result;
        setCentreList(data);
        //console.log(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchCentre();
  }, []);

  
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
        {/* <TabList>
        <Tab>
            <Button component={Link} to="/centredetails">Center</Button>
        </Tab>
        <Tab>
            <Button component={Link} to="/courses">Course</Button>
        </Tab>
        <Tab>
            <Button component={Link} to="/batchdetails">Batch</Button>
        </Tab>
        </TabList>  */}
      </Tabs>
      <div style ={{ width:'150px', display:'flex', float: 'right', justifyContent:'space-between'}}>
        {/* <Link to="/addcourse">
          <button style={{ float: 'right' }}>
            Add New course
          </button>
        </Link>
        <Link to="/addbatch">
          <button style={{ float: 'right' }}>
            Add New Batch
          </button>
        </Link> */}
        <Link to="/addcentre">
          <button style={{ float: 'right', marginBottom:"2%" }}>
            Add New Centre
          </button>
        </Link>
        <br />
        </div>
        <h2>Centre List</h2>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Centre Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {centreList.map((centre, index) => (
            <tr key={centre.id}>
              <td>{index + 1}</td>
              <td>{centre.centreName}</td>
              <td>{centre.centreLocation}</td>
              </tr>
          ))}
        </tbody>
      </table>
      
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(centreList.length / centresPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default CentreList;
