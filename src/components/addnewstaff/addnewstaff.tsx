import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Button, TextField, Paper, Stack, Grid, InputLabel } from '@mui/material';
import axios from 'axios';

interface Staffs {
  id: string;
  staffId: string;
  staffName: string;
  staffDateOfBirth: string; 
  phoneNumber: string;
  email: string;
  staffExperience: string;
  joined_date: string;
  address: string;
  // Add more fields as needed
}

const AddNewStaffForm: React.FC = () => {
    const [formData, setFormData] = useState<Staffs>({
        id: '',
        staffId: '',
        staffName: '',
        staffDateOfBirth: '',
        phoneNumber: '',
        email: '',
        staffExperience: '',
        joined_date: '',
        address: '',
        // Add more fields as needed
      });

      useEffect(() => {
        // Generate staff ID when staff name changes
        if (formData.staffName) {
          const currentDate = new Date();
          const year = currentDate.getFullYear().toString().slice(-2);
          const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
          const date = currentDate.getDate();
          //const sequentialNumber = Math.floor(Math.random() * 10) + 1;
          const staffId = `${formData.staffName.slice(0,5).toUpperCase()}${year}${month}${date}`;
          setFormData(prevData => ({ ...prevData, staffId }));
        }
      }, [formData.staffName]);

      const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
      const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:4000/teachersdetails', formData);
          console.log(response.data); // Handle success
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
              label="Staff Id"
              id="staffId"
              type="text"
              variant="outlined"
              value={formData.staffId}
              name="staffId"
              onChange={handleChange}
              required
              disabled
            />
          <TextField
              label="Staff Name"
              id="staffName"
              type="text"
              variant="outlined"
              value={formData.staffName}
              name="staffName"
              onChange={handleChange}
              required
            />
            <InputLabel id="staffDateOfBirth">Date Of Birth *</InputLabel>
            <TextField
              //label="Experience"
              id="staffDateOfBirth"
              type="date"
              variant="outlined"
              name="staffDateOfBirth"
              value={formData.staffDateOfBirth}
              onChange={handleChange}
              required
            />
            <TextField
              label="Phone Number"
              id="phoneNumber"
              type="text"
              variant="outlined"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              id="email"
              type="text"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Experience(In years)"
              id="staffExperience"
              type="number"
              variant="outlined"
              name="staffExperience"
              value={formData.staffExperience}
              onChange={handleChange}
              required
            />
            <TextField
              label="Address"
              id="address"
              type="text"
              variant="outlined"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <InputLabel id="joined_date">Date of Joining</InputLabel>
            <TextField
              //label="Joined Date"
              id="joined_date"
              type="date"
              variant="outlined"
              name="joined_date"
              value={formData.joined_date}
              onChange={handleChange}
              required
            />
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
  
  export default AddNewStaffForm;
  
