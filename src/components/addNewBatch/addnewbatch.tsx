import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Button, TextField, Paper, Stack, Grid, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, FormControlLabel, FormGroup, Checkbox } from '@mui/material';
import axios from 'axios';
import CourseForm from '../../interfaces/courselist/courselist';
import SubjectForm from '../../interfaces/subjectlist/subjectlist';
import Staffs from '../../interfaces/staffslist';

interface BatchFormData {
  centreId: string;
  courseName: string;
  courseId: string;
  batchName: string;
  programType: string;
  subjectDetails: { subjectId: string; subjectName: string; }[];
  numberOfStudents: string;
  batchStartDate: Date;
  batchEndDate: Date;
  staffDetails: { staffId: string; staffName: string; }[];
}

const BatchForm: React.FC = () => {
  const [courses, setCourses] = useState<CourseForm[]>([]);
  const [subjects, setSubjects] = useState<SubjectForm[]>([]);
  const [staffs, setStaffs] = useState<Staffs[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<{ subjectId: string; subjectName: string; }[]>([]);
  const [selectedStaffs, setSelectedStaffs] = useState<{ staffId: string; staffName: string; }[]>([]);
  const [formData, setFormData] = useState<BatchFormData>({
    centreId:'',
    courseName: '',
    courseId: '',
    batchName: '',
    programType: '',
    subjectDetails: [],
    numberOfStudents: '',
    batchStartDate: new Date(),
    batchEndDate: new Date(),
    staffDetails: [],
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:4000/addcourse');
        const result = await response.json();
        const { data } = result;
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await fetch('http://localhost:4000/teachersdetails');
        const result = await response.json();
        const { data } = result;
        setStaffs(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchStaffs();
  }, [subjects]);

  let courselist: string
  //useEffect(() => {
    const fetchSubjects = async (courselist:any) => {
      try {
        //console.log('asdf',courselist);
          const response = await fetch(`http://localhost:4000/subjectdetails/programType/${courselist}`);
          const result = await response.json();
          //const { data } = result;
          const  data  = result;
          setSubjects(data);
          //console.log("subjects",data)
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    //fetchSubjects();
  //}, [courses]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCourseChange = (e: SelectChangeEvent<string>) => {
    const courseId = e.target.value as string;
    const selectedCourse = courses.find(course => course.id === courseId);
    courselist= selectedCourse?.categoryName||'';
    //console.log('qwe',courselist);
    fetchSubjects(courselist);
    if (selectedCourse) {
      setFormData(prevData => ({
        ...prevData,
        courseId: selectedCourse.id,
        courseName: selectedCourse.courseName,
        programType: selectedCourse.categoryName,
        batchName: generateBatchName(selectedCourse.courseName),
      }));
    }
  };

  const handleSubjectChange = (e: SelectChangeEvent<string[]>) => {
    const selectedIds = e.target.value as string[];
    const selectedSubjects = selectedIds.map(id => {
      const [subjectId, subjectName] = id.split(',');
      return { subjectId, subjectName };
    });
    //const subjectIdArray = Array.isArray(selectedIds) ? selectedIds : [selectedIds];
     setSelectedSubjects(selectedSubjects);
     //if (selectedSubjects) {
      setFormData(prevData => ({
        ...prevData,
        subjectDetails: selectedSubjects,
      }));
      //setSelectedSubjects(selectedSubjects);
    //}
  };

  const handleStaffChange = (e: SelectChangeEvent<string[]>) => {
    const selectedIds = e.target.value as string[];
    const selectedStaffs = selectedIds.map(id => {
      const [staffId, staffName] = id.split(',');
      return { staffId, staffName };
    });
    //const subjectIdArray = Array.isArray(selectedIds) ? selectedIds : [selectedIds];
     setSelectedStaffs(selectedStaffs);
     //if (selectedSubjects) {
      setFormData(prevData => ({
        ...prevData,
        staffDetails: selectedStaffs,
      }));
      //setSelectedSubjects(selectedSubjects);
    //}
  };

  const generateBatchName = (courseName: string): string => {
    const startingLetters = courseName.slice(0, 3).toUpperCase();
    //const batchNumber = Math.floor(Math.random() * 100) + 1; // Generate random number between 1 and 1000
    return `${startingLetters}_Batch_`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

     try {
      //console.log("response",formData);
      const response = await axios.post('http://localhost:4000/add-batch', formData);
      const { success, message, data} = response.data;
      if(success){
        alert(message);
        window.location.reload();
      }
     } catch (error) {
       console.error('Error submitting data:', error);
       // Handle error
     }
  };

  return (
    // <Paper sx={{ padding: '32px' }} elevation={2}>
      <form onSubmit={handleSubmit} style={{padding:"32px"}}>
        <Stack spacing={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="courseNameLabel">Course Name</InputLabel>
            <Select
              labelId="courseNameLabel"
              id="courseName"
              value={formData.courseId}
              onChange={handleCourseChange}
              label="Course Name"
              required
            >
              {courses.map(course => (
                <MenuItem key={course.id} value={course.id}>{course.courseName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="programNameLabel">Program Name</InputLabel>
            <Select
              labelId="programTypeLabel"
              id="programType"
              value={formData.programType}
              onChange={handleCourseChange}
              label="Program Type"
              required
            >
              {courses
                .filter(course => course.id === formData.courseId) // Filter courses to match the selected courseId
                .map(course => (
                  <MenuItem key={course.id} value={course.categoryName}>
                    {course.categoryName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <TextField
            label="Batch Name"
            id="batchName"
            type="text"
            variant="outlined"
            value={formData.batchName}
            name="batchName"
            onChange={handleChange}
            required
            //disabled
          />
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="subjectNameLabel">Subject Name</InputLabel>
              <Select
                labelId="subjectNameLabel"
                id="subjectName"
                value={formData.subjectDetails.map(subject => `${subject.subjectId},${subject.subjectName}`)}
                onChange={handleSubjectChange}
                label="Subject Name"
                multiple
                required
              >
                {subjects
                  .filter(subject => subject.programType === 'Educational'||subject.programType === 'Vocational')
                  .map(subject => (
                    <MenuItem key={subject.id} value={`${subject.id},${subject.subjectName}`}>{subject.subjectName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="staffNameLabel">Staff Name</InputLabel>
            <Select
              labelId="staffNameLabel"
              id="staffName"
              value={formData.staffDetails.map(staff => `${staff.staffId},${staff.staffName}`)}
              onChange={handleStaffChange}
              label="Staff Name"
              multiple
              required
            >
              {staffs.map(staff => (
                <MenuItem key={staff.id} value={`${staff.id},${staff.staffName}`}>{staff.staffName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Number of Students"
            id="numberOfStudents"
            type="number"
            variant="outlined"
            name="numberOfStudents"
            value={formData.numberOfStudents}
            onChange={handleChange}
            required
          />
          <TextField
            label="Start Date"
            id="batchStartDate"
            type="date"
            variant="outlined"
            name="batchStartDate"
            value={formData.batchStartDate}
            onChange={handleChange}
            required
          />
          <TextField
            label="End Date"
            id="batchEndDate"
            type="date"
            variant="outlined"
            name="batchEndDate"
            value={formData.batchEndDate}
            onChange={handleChange}
            required
          />
        </Stack>
        <br />
        <Grid justifyItems="center">
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    // </Paper>
  );
};

export default BatchForm;
