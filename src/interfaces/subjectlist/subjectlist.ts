interface Chapter {
  //id: string; // or whatever type your ID is
  //name: string;// or whatever type your name is
}

interface SubjectForm {
    id: string,
    subjectId: string,
    programType: string,
    standard:string,
    subjectName: string,
    numLessons: string,
    numHours: string,
    chapterNames: string[],
  }
  
  export default SubjectForm;