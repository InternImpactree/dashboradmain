// File: StudentMobilizationTypes.ts

interface FormData {
    id: string,
    studentId: string;
    studentName: string;
    phoneNumber: string;
    centerName: string;
    email: string;
    aadharNumber: string;
    cityName: string;
    fatherName: string;
    motherName: string;
    qualification:string;
    annualIncome: string;
    batchName: string,
    batchId: string,
    incomeCertificate: File,
    //preScreening: string;
    // Add more fields as needed
  }
  
  export default FormData;
  