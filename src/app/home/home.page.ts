import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  //GMaps
  // map: GoogleMap

  //Set the properties in this class
  lati: Number = 0; //latitude
  long: Number = 0; //longitude

  simple_form: FormGroup;

  constructor(
    private platform: Platform, 
    private geolocation : Geolocation,
    public formBuilder: FormBuilder,
    public firebaseService: FirebaseService,
    public toastCtrl: ToastController) {}
 
   ngOnInit() {
    // await this.platform.ready();
    this.loadMap();
    this.ionViewWillLoad()
  }

  ionViewWillLoad(){
    this.getData();
  }

  getData(){
    this.simple_form = this.formBuilder.group({
      latitude: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required),
      tech_message: new FormControl('', Validators.required)
    });
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lati = resp.coords.latitude
      this.long = resp.coords.longitude
      console.log('Latitude: '+ this.lati +' \nLongitude: '+this.long)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    // this.map = GoogleMaps.create('map_canvas', mapOptions);
  }

  addToDB(value){
    this.firebaseService.addUser(value)
    .then( res => {
      let toast = this.toastCtrl.create({
        message: 'User was created successfully',
        duration: 3000
      });
      // toast.present();
      // this.resetFields();
    }, err => {
      console.log(err)
    })
  }
}