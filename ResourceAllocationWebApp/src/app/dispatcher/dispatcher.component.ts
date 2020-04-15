import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-dispatcher',
  templateUrl: './dispatcher.component.html',
  styleUrls: ['./dispatcher.component.css']
})
export class DispatcherComponent implements OnInit {

  apiUrl = 'http://localhost:3000';
  lati : Number
  long : Number

  constructor(public http: HttpClient) { }

  title = 'Ambulance Dispatcher';
  //  lati = -33.897230;
  //  long = 18.599920;

  ngOnInit() {
    this.getUsers();
    // this.getUsersByFlter()
  }

  getUsers() {
    return new Promise(resolve => {
     this.http.get(this.apiUrl+'/technicians')
     .subscribe((res : any) => {
      //  console.log(res.technicians)
       this.lati = -33.897230;
       this.long = 18.599920;
      // resolve(data);
      console.log(res); 
    },
    err => {
      console.log(err);
    });
    });
  }

  getUsersByFlter() {
    return new Promise(resolve => {
      this.http
    .get(this.apiUrl+'/technicians')
    .pipe(
      map((res : any) => {
        console.log("Data Before mappping: ");
        console.log(res);
        return res.data.technicians
      }),
      filter((res : any) =>{
        console.log(res)
        return res.lenght == 3
      })
    )
    }) 
  }
}