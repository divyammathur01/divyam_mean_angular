import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SharedService } from '../shared/service.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  dataPassedToDialog:any
  actualData:any
  addStudentForm!: FormGroup;
  editStudentForm!:FormGroup
  subject:any
  marks:any
  firstName:any
  lastName:any
  classOfStudent:any
  subjectsArray:any = []
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,public dialogRef: MatDialogRef<DialogComponent>,private formBuilder: FormBuilder,private service:SharedService) { }

  ngOnInit(): void {
    this.dataPassedToDialog=this.data
    this.actualData= this.dataPassedToDialog.actualData
    if(this.dataPassedToDialog.type === "add"){
      this.addStudentForm=this.formBuilder.group({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        class: new FormControl('', Validators.required),
        subject: new FormControl('', Validators.required),
        marks: new FormControl('', Validators.required)
      })
    }
    if(this.dataPassedToDialog.type === "edit"){
      this.editStudentForm=this.formBuilder.group({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        class: new FormControl('', Validators.required)
      })
      this.firstName=this.dataPassedToDialog.actualData.data.firstName;
      this.lastName=this.dataPassedToDialog.actualData.data.lastName;
      this.classOfStudent=this.dataPassedToDialog.actualData.data.class;
    }
    
  }
  addStudent(){
    let payload = {
      firstName:this.firstName,
      lastName:this.lastName,
      class:this.classOfStudent,
      subjects:this.subjectsArray
    }
    this.service.addStudent(payload).subscribe((res)=>{
      this.dialogRef.close();

    })

  }
  cancel(){
    this.dialogRef.close();
  }
  editStudent(){
    let payload = {
      studentId:this.actualData.data._id,
      firstName:this.editStudentForm.value.firstName,
      lastName:this.editStudentForm.value.lastName,
      class:this.editStudentForm.value.class    
    }
    this.service.editStudent(payload).subscribe((res)=>{
      this.dialogRef.close();
    })
    
  }
  deleteStudent(){
    let payload = {
      studentId:this.actualData.data._id
    }
    this.service.deleteStudent(payload).subscribe((res)=>{
      this.dialogRef.close()
    
      
    })
    
  }
  addMoreSubject(){
    let payload = {
      subject:this.subject,
      marks:this.marks
    }
    this.subjectsArray.push(payload)
  let ele1 = <HTMLInputElement>document.getElementById("subject");
  
  
  ele1.value = "";

  let ele2 = <HTMLInputElement>document.getElementById("marks");

  
  ele2.value = "";  

  }

}
