import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';

// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   GoogleMapOptions,
//   CameraPosition,
//   MarkerOptions,
//   Marker,
//   Environment
//   } from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  //Set the properties in this class
  lati: Number = 0; //latitude
  long: Number = 0; //longitude

  // map: GoogleMap;
 
  constructor(private platform: Platform, private geolocation : Geolocation) {}
 
   ngOnInit() {
    // await this.platform.ready();
    this.loadMap();
  }

  loadMap() {
    // This code is necessary for browser
    // Environment.setEnv({
    //   'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDu-S2cupofwFmbqOftladnOlSFRsQ65Hc',
    //   'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDu-S2cupofwFmbqOftladnOlSFRsQ65Hc'
    // });

    // let mapOptions: GoogleMapOptions = {
    //   camera: {
    //      target: {
    //        lat: -33.9035336,
    //        lng:  18.5732176
    //      },
    //      zoom: 18,
    //      tilt: 30
    //    }
    // };

    this.geolocation.getCurrentPosition().then((resp) => {
      this.lati = resp.coords.latitude
      this.long = resp.coords.longitude
      console.log('Latitude: '+ this.lati +' \nLongitude: '+this.long)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    // this.map = GoogleMaps.create('map_canvas', mapOptions);
  }
}
