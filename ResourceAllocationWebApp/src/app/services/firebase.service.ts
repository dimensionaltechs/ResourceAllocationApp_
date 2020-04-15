import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(private afs: AngularFirestore) { }

  retrieveTechnician(value){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/technicians').add({
        latitude: value.latitude,
        longitude: value.longitude,
        tech_message: value.tech_message
      })
      .then(
        (res) => {
          resolve(res)
        },
        err => reject(err)
      )
    })
  }
}