import { Component, OnInit ,AfterViewInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from '../shared/service.service' 
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;
// export interface UserData {
//   id: string;
//   Firstname: string;
//   Lastname: string;
//   Class: Number;
//   Subjects: string;
// }

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  displayedColumns: string[] = [ 'Firstname', 'Lastname', 'Class', 'Subjects', 'Actions' ];
  dataSource!: MatTableDataSource<any>;
  students:any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private service:SharedService,public dialog: MatDialog) {}

  ngOnInit() {
    
    
    this.getStudents()
    
  }
  ngAfterViewInit() {
    
  }
  getStudents(){
    this.service.getAllSttudents().subscribe((res)=>{
      this.students = res.data.response.data
      this.dataSource = new MatTableDataSource(this.students);  
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  showSubjects(subjects:any){
    const dialogRefSubjectDetail = this.dialog.open(DialogComponent, {
      data: { type: 'detail', actualData: { subjects:subjects } },
    });
    
  }
  editStudent(data:any){
    const dialogRefEditStudent = this.dialog.open(DialogComponent, {
      data: { type: 'edit', actualData: { data:data } },
    });
  }
  deleteStudent(data:any){
    const dialogRefDeleteStudent = this.dialog.open(DialogComponent, {
      data: { type: 'delete', actualData: { data:data } },
    });
  }
  addStudent(){
    const dialogRefDeleteStudent = this.dialog.open(DialogComponent, {
      data: { type: 'add' },
    });
  }


}
