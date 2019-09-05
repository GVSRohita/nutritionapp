import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from './weather';
import { LocalStorageService } from './persistence.service';
import { Router } from '@angular/router';


@Component({
    selector: 'st-weather',
    templateUrl: './weather.component.html'
})
export class WeatherComponent implements OnInit {
    //countries : Country[] = null;
    mcountry = "us"
    mcity = "London"
    weatherReport: Weather = null;
    weatherReportSelect: Weather;
    storageService: LocalStorageService;

    constructor(private http: HttpClient, private localStorageService: LocalStorageService, private router: Router) {
        this.storageService = localStorageService;
    }

    ngOnInit() {
        if (this.storageService.checkedLoggedIn()) {
            this.getAllDetails();
        } else {
            this.router.navigate(['/login']);
        }
    }

    getAllDetails() {
        //this.allRecords = true;
        this.http.get<Weather>('https://cors-anywhere.herokuapp.com/http://samples.openweathermap.org/data/2.5/forecast/hourly?q=' + this.mcity + ',' + this.mcountry + '&appid=b6907d289e10d714a6e88b30761fae22')
            .subscribe(resp => this.weatherReport = resp);
    }

}