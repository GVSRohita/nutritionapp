import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './ase3/login.component';
import { LocalStorageService } from './ase3/persistence.service';
import { Register } from './ase3/register.component';
import {NutritionComponent} from './ase3/nutrition.component';
import { MainComponent } from './ase3/main.component';
import { LogoutComponent } from './ase3/logout.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'nutrition', component: NutritionComponent },
  { path: 'logout', component: LogoutComponent }
];


@NgModule({
  declarations: [
    AppComponent, MainComponent, Login, Register, NutritionComponent, LogoutComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, StorageServiceModule
    , RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [LocalStorageService],
  bootstrap: [MainComponent]
})

export class AppModule {

}
