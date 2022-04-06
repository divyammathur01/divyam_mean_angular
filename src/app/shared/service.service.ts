import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, pipe, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SharedService {

    constructor(private http: HttpClient) {
    }


    getAllSttudents(): Observable<any> {
        let url = 'http://localhost:3000/api/v1/student/get_students';
        return this.http.get(url);
    }
    addStudent(data: any): Observable<any> {
        let url = 'http://localhost:3000/api/v1/student/create_student';
        return this.http.post(url, data);
    }
    deleteStudent(data: any): Observable<any> {
        let url = 'http://localhost:3000/api/v1/student/delete_student';
        return this.http.post(url, data);
    }
    editStudent(data: any): Observable<any> {
        let url = 'http://localhost:3000/api/v1/student/update_student';
        return this.http.put(url, data);
    }
}