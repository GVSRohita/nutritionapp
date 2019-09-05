import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './persistence.service';
import { Router } from '@angular/router';
import { Nutrition } from './nutrition';

declare const responsiveVoice: any;

@Component({
  selector: 'st-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./sb-admin.css']
})

export class NutritionComponent implements OnInit {
  searchString: string = "fish";
  nutritionObj: Nutrition;


  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private router: Router) {

  }

  ngOnInit() {
    if (this.localStorageService.checkedLoggedIn()) {
      this.getAllDetails();
    } else {
      this.router.navigate(['/login']);
    }
  }

  getAllDetails() {
    this.nutritionObj;
      let url: string = 'https://api.nutritionix.com/v1_1/search/' + this.searchString + '?results=0:1&fields=*&appId=13a1f6fd&appKey=%2046773124bc5928d40bdb1da6fef38c4b';
      this.http.get<Nutrition>(url)
        .subscribe((resp) => {
          this.nutritionObj = resp;
          responsiveVoice.speak('The Weight of ' + this.searchString + ' is ' + this.nutritionObj.hits[0].fields.nf_serving_weight_grams);
          responsiveVoice.speak('The Calories of ' + this.searchString + ' is ' + this.nutritionObj.hits[0].fields.nf_calories);
        });


  }

}
