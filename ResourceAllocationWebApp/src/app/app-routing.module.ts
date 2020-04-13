import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DispatcherComponent } from './dispatcher/dispatcher.component';


const routes: Routes = [
  {path: '', redirectTo: '/dispatcher', pathMatch: 'full'}, //This is the default path, i.e., when the app starts
  {path: 'dispatcher', component: DispatcherComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
