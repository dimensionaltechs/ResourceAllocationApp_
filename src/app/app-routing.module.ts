import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent }
  //{ path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  //{ path: 'login', loadChildren: () => import('./login/login.component').then( m => m.LoginComponent)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
