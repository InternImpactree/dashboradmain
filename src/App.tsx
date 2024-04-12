import React from 'react';
import Dropdown from './components/dropdown';
import { BrowserRouter as Router, Route, Link, Routes, } from 'react-router-dom';
import StudentList from '../src/pages/studentlist';
import BatchList from '../src/pages/batchlist';
import './App.css';
import StudentMobilization from './components/mobilizationform/mobilizationform';
import CourseList from './pages/courselist';
import StaffsList from './pages/staffslist';
import BatchForm from './components/addNewBatch/addnewbatch';
import AddCourseForm from './components/courseform/courseform';
import AddNewStaffForm from './components/addnewstaff/addnewstaff';
import AttendanceManagement from './components/studentbatchdetails/studentattendence';
import AttendanceReport from './components/studentbatchdetails/attendancereports';
import SelectedStudentList from './components/studentbatchdetails/selectedstudentlist';
import PreScreeningList from './components/studentbatchdetails/prescreeing';
import AddSubjectForm from './components/subjectform/subjectform';
import SubjectList from './components/subjectform/subjectlist';
import BatchWiseDetails from './components/batchwisedetails/batchwisedetails';
import GradingComponent from './components/grading/grading';
import StaffAttendanceManagement from './components/addnewstaff/staffattendance';
import StaffAttendanceReport from './components/addnewstaff/staffattendancereports';
import GradingListComponent from './components/grading/gradinglist';
import SubjectTracking from './components/subjectform/subjecttracking';
import AddCentreForm from './components/centredetails/centredetails';
import CentreList from './components/centredetails/centrelist';
import DashboardAttendance from './components/dashboard/attendance/dasboardattendance';
import MobilizationDashboard from './components/dashboard/mobilization/mobilization';
import StudentsAttendance from './components/dashboard/students/studentsattendance';
import TrainingDashboard from './components/dashboard/training/trainingdashboard';
import SubjectTrackingReport from './components/subjectform/subjecttrackingreports';
import GradingDashboard from './components/dashboard/grading/gradingdashboard';
import MonthlyAttendanceReport from './components/addnewstaff/attendancestaffs';
import Mobilization from './components/dashboardvoc.tsx/mobilization';
import Assessment from './components/dashboardvoc.tsx/assessment';
import Placements from './components/dashboardvoc.tsx/placements';
import PositionedMenu from './components/dashboardvoc.tsx/studentgrade';
import Attendance from './components/dashboardvoc.tsx/attendancevoc';

const MainPage: React.FC = () => {
  const dashboardOptions = [
    { label: 'Educational', path: '/educational' },
    { label: 'Vocational', path: '/vocational' },
 ];

 const courseCreationOptions = [
  { label: 'Center', path: '/center' },
  { label: 'Course', path: '/course' },
  { label: 'Batch', path: '/batch' },
];

const mobilizationOptions = [
  { label: 'Pre-Screening', path: '/pre-screening' },
  { label: 'Screening', path: '/screening' },
  { label: 'Final Induction List', path: '/final-induction-list' },
];

const batchwiseDetailsOptions = [
  { label: 'Attendance Report', path: '/attendance-report' },
  { label: 'Grading', path: '/grading' },
  { label: 'Subject Tracking', path: '/subject-tracking' },
  { label: 'Batch Details', path: '/batch-details' },
];

const subjectsOptions = [
  { label: 'Subject List', path: '/subjectlist' },
 
  // Add more subjects as needed
];

const staffsOptions = [
  { label: 'Staff List', path: '/staffs' },
 
  // Add more subjects as needed
];

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
            <Dropdown label="Dashboard" options={dashboardOptions} />
            </li>
            <li>
            <Dropdown label="Course creation" options={courseCreationOptions} />
            </li>
            <li>
            <Dropdown label="Mobilization" options={mobilizationOptions} />
            </li>
            <li>
            <Dropdown label="Batchwise Details" options={batchwiseDetailsOptions} />
            </li>
            {/* <li>
              <Link to="/grading">Grading</Link>
            </li> */}
            <li>
            <Dropdown label="Subjects" options={subjectsOptions} />
            </li>
            <li>
            <Dropdown label="Staffs" options={staffsOptions} />
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<MobilizationDashboard />} />


          <Route path="/educational" element={<MobilizationDashboard />} />
          <Route path="/vocational" element={<Mobilization />} />
          <Route path="/mobilization" element={<Mobilization />} />
          <Route path="/assessment" element={<Assessment options={[]} />} />
          <Route path="/studentgrade" element={<PositionedMenu />} />
          <Route path="/placements" element={<Placements  />} />
          <Route path="/attendancevoc" element={<Attendance options={[]}/>} />


          <Route path="/mobilizationform" element={<StudentMobilization />} />
          <Route path="/pre-screening" element={<StudentList />} />
          <Route path="/addbatch" element={<BatchForm />} />
          <Route path="/addcourse" element={<AddCourseForm />} />
          <Route path="/addcentre" element={<AddCentreForm />} />
          <Route path="/course" element={<CourseList />} />
          <Route path="/center" element={<CentreList />} />
          <Route path="/addstaff" element={<AddNewStaffForm />} />
          <Route path="/staffs" element={<StaffsList />} />
          <Route path="/batch" element={<BatchList />} />
          <Route path="/studentattendance" element={<AttendanceManagement />} />
          <Route path="/staffattendance" element={<StaffAttendanceManagement />} />
          <Route path="/attendance-report" element={<AttendanceReport />} />
          <Route path="/staffattendancereports" element={<StaffAttendanceReport />} />
          <Route path="/screening" element={<PreScreeningList />} />
          <Route path="/final-induction-list" element={<SelectedStudentList />} />
          <Route path="/addsubject" element={<AddSubjectForm />} />
          <Route path="/subjectlist" element={<SubjectList />} />
          <Route path="/subject-tracking" element={<SubjectTracking />} />
          <Route path="/batch-details" element={<BatchWiseDetails />} />
          <Route path="/grading" element={<GradingComponent />} />
          <Route path="/gradinglist" element={<GradingListComponent />} />
          <Route path="/attendancedashboard" element={<DashboardAttendance options={[]} />} />
          <Route path="/dashboard" element={<MobilizationDashboard />} />
          <Route path="/studentsattendance" element={<StudentsAttendance options={[]} />} />
          <Route path="/training" element={<TrainingDashboard />} />
          <Route path="/subjecttrackingreports" element={<SubjectTrackingReport />} />
          <Route path="/gradingdetails" element={<GradingDashboard options={[]}  />} />

        </Routes>
      </div>
    </Router>
  );
};

const Home: React.FC = () => {
  return <h2>Welcome to Student Batch Tracking System!</h2>;
};

export default MainPage;
