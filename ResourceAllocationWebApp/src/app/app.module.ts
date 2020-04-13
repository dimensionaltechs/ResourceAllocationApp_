import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DispatcherComponent } from './dispatcher/dispatcher.component';

// Angular Google Maps (AGM)
import { AgmCoreModule } from '@agm/core';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DispatcherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDu-S2cupofwFmbqOftladnOlSFRsQ65Hc' //Register Dimenentional Shift's Google Map API
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
