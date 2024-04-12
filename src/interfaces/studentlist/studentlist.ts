// types.ts

interface Student {
    disabled: boolean;
    id: number;
    studentId: string;
    studentName: string;
    phoneNumber: string;
    dateOfBirth: string;
    programType: string;
    email: string;
    aadharNumber: string;
    cityName: string;
    fatherName: string;
    motherName: string;
    qualification: string;
    annualIncome: string;
    preScreening: string;
    selectedType: string;
    aadharDocument?: File;
    batchStatus: boolean;
    

   // Add more fields as needed
  }
  
  export default Student;
  