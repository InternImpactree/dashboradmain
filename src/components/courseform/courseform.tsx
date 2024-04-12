import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
//import { useHistory } from 'react-router-dom';
import { Button, TextField, Paper, Stack, Grid, MenuItem, FormControlLabel, Radio, RadioGroup, InputLabel, Select, FormLabel, Checkbox, FormControl, ListItemText, SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import Course from '../../interfaces/courselist/courselist';
import SubjectForm from '../../interfaces/subjectlist/subjectlist';
import { Link } from 'react-router-dom';

interface CourseForm {
  //id: string;
  courseId: string,
  courseName: string,
  location: string,
  categoryName: string,
  centreName: string,
  schoolName: string,
  className: string,
  trainingName: string,
  duration: string,
 // subjects: string[];
  // Add more fields as needed
}

const AddCourseForm: React.FC = () => {
    const [formData, setFormData] = useState<CourseForm>({
        //id: '',
        courseId: '',
        courseName: '',
        location: '',
        categoryName: '',
        centreName: '',
        schoolName: '',
        className: '',
        trainingName: '',
        duration: '',
        //subjects: [],
        
        // Add more fields as needed
      });
      
        const [subjectList, setSubjectList] = useState<SubjectForm[]>([]);
        const [centreList, setCentreList] = useState<any[]>([]);
        const [selectedCategory, setSelectedCategory] = useState<string>('');

        useEffect(() => {
          const fetchSubjects = async () => {
            try {
              const response = await axios.get('http://localhost:4000/subjectdetails');
              setSubjectList(response.data.data);
            } catch (error) {
              console.error('Error fetching subjects:', error);
            }
          };
          fetchSubjects();
        }, []);


        useEffect(() => {
          const fetchCentreList = async () => {
            try {
              const response = await axios.get('http://localhost:4000/centredetails');
              setCentreList(response.data.data);
              //console.log("centreList",centreList);
            } catch (error) {
              console.error('Error fetching subjects:', error);
            }
          };
          fetchCentreList();
        }, []);
      
        // useEffect(() => {
        //   // Filter subjects based on selected category and class
        //   //console.log("subject",filteredSubjects);
        //   setFilteredSubjects(
        //     subjectList.filter(
        //       (subject) =>
        //         subject.programType === formData.categoryName && subject.standard === formData.className
        //     )
        //   );
        // }, [formData.categoryName, formData.className, subjectList]);
        //console.log("subject11",subjectList);
        
        const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        if (name === 'courseName') {
          const courseId = generateCourseId(value, new Date());
          setFormData((prevData) => ({ ...prevData, courseId }));
        }
      };

      const handleClassChange = (e: SelectChangeEvent<string>): void => {
        const className = e.target.value;
        //console.log("className",className)
        setFormData((prevData) => ({ ...prevData, className }));
      };

      const handleCentreChange = (e: SelectChangeEvent<string>): void => {
        const centreName = e.target.value;
        //console.log("centreName",centreName)
        setFormData((prevData) => ({ ...prevData, centreName }));
      };

      const generateCourseId = (courseName: string, currentDate: Date): string => {
        const courseNamePrefix = courseName.slice(0, 4).toUpperCase();
        const yearSuffix = String(currentDate.getFullYear()).slice(-2);
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const date = String(currentDate.getDate()).padStart(2, '0');
        return `${courseNamePrefix}${yearSuffix}${month}${date}`;
      };

      const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const categoryName = e.target.value;
        setSelectedCategory(categoryName); 
        setFormData((prevData) => ({ ...prevData, categoryName }));
      };

      const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        //console.log("formData",formData)
        try {
          const response = await axios.post('http://localhost:4000/addcourse', formData);
          if(response.status === 201){
            alert("Course successfully added");
            //history.push('/courses');
          } else {
            alert('Failed to add course');
          }
          window.location.reload();
        } catch (error) {
          console.error('Error submitting data:', error);
          alert('Course with the same name already exists');
          // Handle error
        }
      };
  
    return (
      <div>
      {/* <Paper sx={{ padding: '32px' }} elevation={2}> */}
        <form onSubmit={handleSubmit} style={{padding:"32px"}}>
          <Stack spacing={4}>
          <TextField
              id="courseId"
              value={formData.courseId}
              name="courseName"
              disabled
            />
            <FormControl variant="outlined" fullWidth>
            <InputLabel id="courseNameLabel">Center Name</InputLabel>
            <Select
              labelId="centreNameLabel"
              id="centreName"
              value={formData.centreName}
              onChange={handleCentreChange}
              label="Center Name"
              required
            >
              {centreList.map(centre => (
                <MenuItem key={centre.id} value={centre.id}>{centre.centreName}</MenuItem>
              ))}
            </Select>
          </FormControl>
            <TextField
              label="Course Name"
              id="courseName"
              type="text"
              variant="outlined"
              value={formData.courseName}
              name="courseName"
              onChange={handleChange}
              required
            />
            <FormLabel component="legend">Course Category</FormLabel>
            <RadioGroup
            aria-label="category"
            name="category"
            value={selectedCategory} // Use selectedCategory state for the value of RadioGroup
            onChange={handleCategoryChange} // Use handleCategoryChange function for onChange event
            >
            <FormControlLabel
              value="Educational"
              control={<Radio />}
              label="Educational"
            />
            <FormControlLabel
              value="Vocational"
              control={<Radio />}
              label="Vocational"
            />
            <FormControlLabel
              value="Other Trainings"
              control={<Radio />}
              label="Other Trainings"
            />
          </RadioGroup>
          {/* Additional questions for educational category */}
          {selectedCategory === 'Educational' && (
            <>
              <TextField
                label="School Name"
                type="text"
                variant="outlined"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                required
              />
              <InputLabel id="class-select-label">Class *</InputLabel>
              <Select
                labelId="class-select-label"
                id="className"
                value={formData.className}
                onChange={handleClassChange}
                //onChange={(e) => setFormData((prevData) => ({ ...prevData, className: e.target.value as string }))}
                required
              >
                {[...Array(12)].map((_, index) => (
                  <MenuItem key={index + 1} value={`${index + 1} std`}>{`${index + 1} std`}</MenuItem>
                ))}
              </Select>
            </>
          )}
          {selectedCategory === 'Other Trainings' && (
            <>
              <TextField
                label="Training name"
                type="text"
                variant="outlined"
                name="trainingName"
                value={formData.trainingName}
                onChange={handleChange}
                required
              />
            </>
          )}
          <TextField
              label="Location"
              id="location"
              type="text"
              variant="outlined"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
{/* <FormControl>
            <InputLabel id="subjects-label">Subjects</InputLabel>
            <Select
              labelId="subjects-label"
              id="subjects"
              multiple
              value={formData.subjects}
              onChange={handleSubjectsChange}
              renderValue={(selected) => (selected as string[]).join(', ')}
            >
              {filteredSubjects.map((subject) => (
                <MenuItem key={subject.id} value={subject.id}>
                  <Checkbox checked={formData.subjects.includes(subject.subjectName)} />
                  <ListItemText primary={subject.subjectName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <TextField
            label="Duration"
            id="duration"
            type="number"
            variant="outlined"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </Stack>
        <br></br>
        <Button variant="contained" type="submit" style={{float:"right"}}>
        Submit
        </Button>
        <Grid justifyItems="center">
          <Button variant="contained">
          <Link to={"/courses"}>Back</Link>
          </Button>
        </Grid>
        </form>
        
      {/* // </Paper> */}
      </div>
    );
  };
  
  export default AddCourseForm;
  
