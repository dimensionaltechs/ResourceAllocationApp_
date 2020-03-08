import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  lati : Number
  long : Number

  constructor(private afs: AngularFirestore, private geolocation : Geolocation) { }

      //This storeCoordinates() method is never used (delete):
  // storeCoordinates(lati : Number, long : Number){
  //   return new Promise<any>((resolve, reject) => {

  //     this.geolocation.getCurrentPosition().then((resp) => {
  //       lati = resp.coords.latitude
  //       long = resp.coords.longitude
  //       console.log('Latitude: '+ lati +'\nLongitude: '+long)
  //      }).catch((error) => {
  //        console.log('Error getting location', error);
  //      });
  //   })
  // }

  addUser(value){
    return new Promise<any>((resolve, reject) => {

      //Getting location coordinates
      this.geolocation.getCurrentPosition().then((resp) => {
        this.lati = resp.coords.latitude
        this.long = resp.coords.longitude
        console.log('Latitude: '+ this.lati +' \nLongitude: '+this.long)
       }).catch((error) => {
         console.log('Error getting location', error);
       });

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