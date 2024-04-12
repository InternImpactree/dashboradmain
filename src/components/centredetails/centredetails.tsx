import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, TextField, SelectChangeEvent, Paper, Stack, Grid, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Tab, TabList, Tabs } from 'react-tabs';

interface CentreForm{
    centreId: string,
    centreName: string,
    centreLocation: string,
}

const AddCentreForm: React.FC = () => {
    const [formData, setFormData] = useState<CentreForm>({
    centreId: '',
    centreName: '',
    centreLocation: ''
  });

  const generateCentreId = (centretName: string): string => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const date = ('0' + currentDate.getDate()).slice(-2);
    const paddedCentretName = (centretName.substring(0, 4) + '_').slice(0, 4).toUpperCase();
    const centreId = `${paddedCentretName}${year}${month}${date}`;
    return centreId;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'centreName') {
      const centreId = generateCentreId(value);
      setFormData((prevData) => ({ ...prevData, centreId }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    //console.log("form Data", formData);
    try {
      const response = await axios.post('http://localhost:4000/centredetails', formData);
      if(response.status === 201){
        alert("Centre successfully added");
      } else {
        alert('Failed to add Subject');
      }
      window.location.reload();
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Centre with the same name already exists');
    }
  };

  return (
    <div>
    {/* <Paper sx={{ padding: '32px' }} elevation={2}> */}

      <form onSubmit={handleSubmit} style={{padding:"32px"}}>
        <Stack spacing={4}>
          <TextField
            id="centreId"
            value={formData.centreId}
            name="centreId"
            disabled
          />
          <TextField
            label="Centre Name"
            id="centreName"
            type="text"
            variant="outlined"
            value={formData.centreName}
            onChange={handleChange}
            name="centreName"
            required
          />
          <TextField
            label="Centre Location"
            id="centreLocation"
            type="text"
            variant="outlined"
            name="centreLocation"
            value={formData.centreLocation}
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
    </div>
  );
};

export default AddCentreForm;
