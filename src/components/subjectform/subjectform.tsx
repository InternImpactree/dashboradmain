import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, TextField, SelectChangeEvent, Paper, Stack, Grid, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import SubjectForm from '../../interfaces/subjectlist/subjectlist';

const AddSubjectForm: React.FC = () => {
  const [formData, setFormData] = useState<SubjectForm>({
    id:'',
    subjectId: '',
    programType: '',
    subjectName: '',
    standard:'',
    numLessons:'',
    numHours:'',
    chapterNames:[], // Array to store chapter names
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'subjectName') {
      const subjectId = generateSubjectId(value);
      setFormData((prevData) => ({ ...prevData, subjectId }));
    }
  };

  const handleProgramTypeChange = (e: SelectChangeEvent<string>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const generateSubjectId = (subjectName: string): string => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const date = ('0' + currentDate.getDate()).slice(-2);
    const paddedSubjectName = (subjectName.substring(0, 4) + '_').slice(0, 4).toUpperCase();
    const subjectId = `${paddedSubjectName}${year}${month}${date}`;
    return subjectId;
  };

  const handleChapterNameChange = (index: number, e: ChangeEvent<HTMLInputElement>): void => {
    const newChapterNames = [...formData.chapterNames];
    newChapterNames[index] = e.target.value;
    setFormData((prevData) => ({ ...prevData, chapterNames: newChapterNames }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    //console.log("form Data", formData);
    try {
      const response = await axios.post('http://localhost:4000/subjectdetails', formData);
      if(response.status === 201){
        alert("Subject successfully added");
      } else {
        alert('Failed to add Subject');
      }
      window.location.reload();
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Subject with the same name already exists');
    }
  };

  const renderChapterNameFields = () => {
    const { numLessons } = formData;
    const numFields = parseInt(numLessons);
    if (numFields > 0) {
      const fields = [];
      for (let i = 0; i < numFields; i++) {
        fields.push(
          <TextField
            key={i}
            id={`Chapter ${i + 1} Name`}
            name={`Chapter ${i + 1} Name`}
            label={`Chapter ${i + 1} Name`}
            type="text"
            variant="outlined"
            value={formData.chapterNames[i] || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChapterNameChange(i, e)}
            required
          />
        );
      }
      return fields;
    }
    return null;
  };

  return (
    // <Paper sx={{ padding: '32px' }} elevation={2}>
      <form onSubmit={handleSubmit} style={{padding:"32px"}}>
        <Stack spacing={4}>
          <TextField
            id="subjectId"
            value={formData.subjectId}
            name="subjectId"
            disabled
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="programTypeLabel">Program Type</InputLabel>
            <Select
              labelId="programTypeLabel"
              id="programType"
              value={formData.programType}
              onChange={handleProgramTypeChange}
              label="Program Type"
              required
              name="programType"
            >
              <MenuItem value="Educational">Educational</MenuItem>
              <MenuItem value="Vocational">Vocational</MenuItem>
            </Select>
          </FormControl>
          {formData.programType === 'Educational' && (
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="standardLabel">Standard *</InputLabel>
              <Select
                labelId="standardLabel"
                id="standard"
                value={formData.standard}
                onChange={handleProgramTypeChange}
                label="Standard"
                required
                name="standard"
              >
                {[...Array(12)].map((_, index) => (
                  <MenuItem key={index + 1} value={`${index + 1}th Std`}>{`${index + 1}th Std`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <TextField
            label="Subject Name"
            id="subjectName"
            type="text"
            variant="outlined"
            value={formData.subjectName}
            name="subjectName"
            onChange={handleChange}
            required
          />
          <TextField
            label="Number of Hours"
            id="numHours"
            type="text"
            variant="outlined"
            name="numHours"
            value={formData.numHours}
            onChange={handleChange}
            required
          />
          <TextField
            label="Number of Lessons"
            id="numLessons"
            type="text"
            variant="outlined"
            name="numLessons"
            value={formData.numLessons}
            onChange={handleChange}
            required
          />
          {/* Dynamically render chapter name fields */}
          {renderChapterNameFields()}
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

export default AddSubjectForm;
