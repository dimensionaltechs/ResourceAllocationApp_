import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

import {
  GoogleMap,
  GoogleMaps,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  GoogleMapOptions
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  //GMaps
  map: GoogleMap

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
    this.platform.ready();
    this.loadMap();
    this.ionViewWillLoad()
  }

  ionViewWillLoad(){
    this.getData();
  }
    /**
     * Gets the form data 
     */
  getData(){
    this.simple_form = this.formBuilder.group({
      latitude: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required),
      tech_message: new FormControl('', Validators.required)
    });
  }

    /**
     * Loads Google Maps
     */
  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
    this.lati = resp.coords.latitude
    this.long = resp.coords.longitude
    console.log('Latitude: '+ this.lati +' \nLongitude: '+this.long)
    }).catch((error) => {
       console.log('Error getting location', error);
     });

     let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };
     
    this.map = GoogleMaps.create('map_canvas', mapOptions);
    // this.goToMyLocation();
  }

  goToMyLocation(){
    this.map.clear();
 
    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {
      console.log(JSON.stringify(location, null ,2));
 
      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        duration: 5000
      });
 
      //add a marker
      let marker: Marker = this.map.addMarkerSync({
        title: '@ionic-native/google-maps plugin!',
        snippet: 'This plugin is awesome!',
        position: location.latLng,
        animation: GoogleMapsAnimation.BOUNCE
      });
 
      //show the infoWindow
      marker.showInfoWindow();
 
      //If clicked it, display the alert
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        this.showToast('clicked!');
      });
 
      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
        (data) => {
            console.log("Click MAP",data);
        }
      );
    })
    .catch(err => {
      //this.loading.dismiss();
      this.showToast(err.error_message);
    });
  }

  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  //Sending on screen captred information to the DB
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