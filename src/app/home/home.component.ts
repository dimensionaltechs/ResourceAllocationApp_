import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterContentInit {
    //GMaps
    map

    //Set the properties in this class
    lati: Number = 0; //latitude
    long: Number = 0; //longitude

    simple_form: FormGroup;
     
    @ViewChild('mapElement',null) mapElement;
    constructor(
        private platform: Platform,
        private geolocation: Geolocation,
        public formBuilder: FormBuilder,
        public firebaseService: FirebaseService,
        public toastCtrl: ToastController) { }

    ngOnInit(): void {
        this.getData();
    }

    ngAfterContentInit(): void {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.map = new google.maps.Map(
                this.mapElement.nativeElement,
                {
                    center: { lat: resp.coords.latitude, lng: resp.coords.longitude },
                    zoom: 12
                });
        });
        this.myCoordinates();
    }

    /*marker(): void {
            this.map = new google.maps.Marker(
                this.mapElement.nativeElement,
                {
                    center: { lat: resp.coords.latitude, lng: resp.coords.longitude },
                    zoom: 12
                });
        this.myCoordinates();
    }*/

    /**
     * Gets the form data 
     * This method is not beign used now and hence ignored
     * During code clean-up, please delete. Unless its used again
     */
    getData() {
        this.simple_form = this.formBuilder.group({
            latitude: new FormControl('', Validators.required),
            longitude: new FormControl('', Validators.required),
            tech_message: new FormControl('', Validators.required)
        });
    }

    /**
     * The method recieves location coordinates (Latitude/Longitude)
     * */
    myCoordinates() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.lati = resp.coords.latitude
            this.long = resp.coords.longitude
            console.log('Latitude: ' + this.lati + ' \nLongitude: ' + this.long)
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    /**
     * Sending on screen captured information to the DB
     * @param value
     */
    addToDB(value) {
        this.firebaseService.addUser(value)
            .then(res => {
                let toast = this.toastCtrl.create({
                    message: 'User was created successfully',
                    duration: 3000
                });
                // toast.present();
                // this.resetFields();
            }, err => {
                console.log(err)
            })
            console.log('Data sent successfully!')
    }
}