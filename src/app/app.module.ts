import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { HttpClientModule } from '@angular/common/http';
import { FirebaseService } from './services/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { HomePage } from './home/home.page';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: 
  [
    AppComponent,
    LoginComponent 
  ],
  entryComponents: [],
  
  imports: [
    BrowserModule, 
    HttpClientModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment, 'AmbulanceAllocationApp'),
    AppRoutingModule],

  providers: [
    StatusBar,
    SplashScreen,
    FirebaseService,
    AngularFirestore,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}