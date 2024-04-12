import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Button, TextField, Paper, Stack, Grid, FormControlLabel, Radio, RadioGroup, FormLabel, MenuItem, Select, SelectChangeEvent, InputLabel } from '@mui/material';
import axios from 'axios';

interface FormData {
  studentId: string;
  studentName: string;
  phoneNumber: string;
  programType: string;
  email: string;
  dateOfBirth: string;
  aadharNumber: string;
  cityName: string;
  fatherName: string;
  motherName: string;
  qualification: string;
  annualIncome: string;
  preScreening: string;
  selectedType: string;
  batchStatus: boolean;
  aadharDocument?: File | null;
  //incomeCertificate?: File; // Add addToBatch field
}

const StudentMobilization: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
      studentId: '',
      studentName: '',
      phoneNumber: '',
      programType: '',
      email: '',
      dateOfBirth: '',
      aadharNumber: '',
      cityName: '',
      fatherName: '',
      motherName: '',
      qualification: '',
      annualIncome: '',
      preScreening: 'Select',
      selectedType:'',
      batchStatus: false,
      aadharDocument: null,
      //incomeCertificate: undefined,
        // Add more fields as needed
      });
  
    const [studentId, setStudentId] = useState<string>('');
  
    const generateStudentId = (): string => {
       // Replace with the actual city name
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const randomFourDigitNumber = Math.floor(1000 + Math.random() * 9000);

      const cityCode = formData.studentName.split(' - ')[0];
  
      return `${cityCode}${year}${month}${randomFourDigitNumber}`;
    };
  
    useEffect(() => {
      const generatedStudentId = generateStudentId();
      setStudentId(generatedStudentId);
      setFormData((prevData) => ({ ...prevData, studentId: generatedStudentId }));
    }, [formData.studentName]); // Runs once when the component mounts
  
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: string): void => {
      const { files } = e.target;
      if (files && files[0]) {
        setFormData((prevData) => ({ ...prevData, [type]: files[0] }));
      }
    };

    const handleClassChange = (e: SelectChangeEvent<string>): void => {
      const qualification = e.target.value;
      console.log("className",qualification)
      setFormData((prevData) => ({ ...prevData, qualification }));
    };
  
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();

      const phoneNumberRegex = /^\d{10}$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const aadharNumberRegex = /^\d{12}$/;

      if (!phoneNumberRegex.test(formData.phoneNumber)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
      }

      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address.');
        return;
      }

      if (!aadharNumberRegex.test(formData.aadharNumber)) {
        alert('Please enter a valid 16-digit Aadhar number.');
        return;
      }

      if (formData.aadharDocument) {
        const allowedFormats = ['pdf', 'jpeg', 'png', 'jpg'];
        const maxSizeInBytes = 1024 * 1024; // 1 MB
        const { size, name } = formData.aadharDocument;

        const format = name.split('.').pop()?.toLowerCase();
        if (format && !allowedFormats.includes(format)) {
          alert('File format not supported. Please upload a PDF, JPEG, JPG or PNG file.');
          return;
        }

        if (size > maxSizeInBytes) {
          alert('File size exceeds the limit of 1MB. Please upload a smaller file.');
          return;
        }
      } else {
        alert('Please upload a document.');
        return;
      }
  
      try {
        console.log("Form", formData.aadharDocument);
        console.log("Form", formData);
        const response = await axios.post('http://localhost:4000/mobilizationform', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
        //console.log("doc",response.data); // Handle success
        alert('Form successfully submitted');
        window.location.reload();
      } catch (error) {
        console.error('Error submitting data:', error);
        // Handle error
      }
    };
  
    return (
      // <Paper sx={{ padding: '32px' }} elevation={2}>
        <form onSubmit={handleSubmit} style={{padding:"32px"}}>
          <Stack spacing={4}>
            <TextField
              label="Generated Student Id"
              id="generatedStudentId"
              type="text"
              variant="outlined"
              value={studentId}
              disabled
            />
            <TextField
              label="Student Name"
              id="studentName"
              type="text"
              variant="outlined"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Phone Number"
              id="phoneNumber"
              type="number"
              variant="outlined"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              inputProps={{ pattern: "[0-9]*" }}
              // error={!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(formData.phoneNumber)}
              // helperText="Please enter a valid 10-digit phone number."
            />
            <FormLabel component="legend">Program Type</FormLabel>
            <RadioGroup
              aria-label="Program Type"
              name="programType"
              value={formData.programType}
              onChange={handleChange} // Use selectedCategory state for the value of RadioGroup
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
            <TextField
              label="Email"
              id="email"
              type="text"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              //error={!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)}
              //helperText="Please enter a valid email address."
            />
            <InputLabel id="dateOfBirth-select-label">Date of Birth *</InputLabel>
            <TextField
              //label="Date of Birth"
              id="dateOfBirth"
              type="Date"
              variant="outlined"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              //error={!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)}
              //helperText="Please enter a valid email address."
            />
            <TextField
              label="Aadhar Number"
              id="aadharNumber"
              type="number"
              variant="outlined"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              required
              inputProps={{ pattern: "[0-9]*" }}
              //error={!/^\d{16}$/.test(formData.aadharNumber)}
              //helperText="Please enter a valid 16-digit Aadhar number."
            />
            <label>
              Aadhar Document* : 
              <input type="file" name="aadharDocument" onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e, 'aadharDocument')} accept="application/pdf,image/jpeg,image/png, image/jpg" required />
            </label>
            <TextField
              label="City"
              id="cityName"
              type="text"
              variant="outlined"
              name="cityName"
              value={formData.cityName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Father Name"
              id="fatherName"
              type="text"
              variant="outlined"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Mother Name"
              id="motherName"
              type="text"
              variant="outlined"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              required
            />
            <InputLabel id="qualification-select-label">Class *</InputLabel>
            <Select
              labelId="qualification-select-label"
              id="qualification"
              value={formData.qualification}
              onChange={handleClassChange}
              required
            >
              <MenuItem value="1st">1st Standard</MenuItem>
              <MenuItem value="2nd">2nd Standard</MenuItem>
              <MenuItem value="3rd">3rd Standard</MenuItem>
              <MenuItem value="4th">4th Standard</MenuItem>
              <MenuItem value="5th">5th Standard</MenuItem>
              <MenuItem value="6th">6th Standard</MenuItem>
              <MenuItem value="7th">7th Standard</MenuItem>
              <MenuItem value="8th">8th Standard</MenuItem>
              <MenuItem value="9th">9th Standard</MenuItem>
              <MenuItem value="10th">10th Standard</MenuItem>
              <MenuItem value="11th">11th Standard</MenuItem>
              <MenuItem value="12th">12th Standard</MenuItem>
              <MenuItem value="UG">Undergraduate (UG)</MenuItem>
              <MenuItem value="PG">Postgraduate (PG)</MenuItem>
              <MenuItem value="Diploma">Diploma</MenuItem>
              <MenuItem value="ITI">ITI</MenuItem>
            </Select>
            <TextField
              label="Family Annual Income"
              id="annualIncome"
              type="text"
              variant="outlined"
              name="annualIncome"
              value={formData.annualIncome}
              onChange={handleChange}
              required
            />
            <TextField
            type="hidden" // Hidden input field
            name="preScreening"
            value={formData.preScreening}
            onChange={handleChange}
            style={{ display: 'none' }}
            />
            <TextField
            type="hidden" // Hidden input field
            name="selectedType"
            value={formData.selectedType}
            onChange={handleChange}
            style={{ display: 'none' }}
            />
            {/* <label>
              Income Certificate:
              <input type="file" name="incomeCertificate" onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e, 'aadharDocument')} required />
            </label> */}
            <br />
            {/* Add more fields as needed */}
          </Stack>
          <br></br>
          <Grid justifyItems="center" >
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </form>
      // </Paper>
    );
  };
  
  export default StudentMobilization;
  
