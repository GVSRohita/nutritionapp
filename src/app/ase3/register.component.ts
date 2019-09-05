
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, } from "@angular/common/http"
import { LocalStorageService } from './persistence.service';
import { User } from './User';

@Injectable()
@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['./sb-admin.css']
})




export class Register {

    userObj: User;
    RepeatPwd: string;
    formValidated: boolean = false;
    storageService: LocalStorageService;
    registrationResult: boolean = false;

    constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
        this.userObj = new User();
        this.userObj.Id = "";
        this.userObj.Name = "";
        this.userObj.EmailId = "";
        this.userObj.Pwd = "";
        this.storageService = localStorageService;
    }

    registerUser(): void {
        this.validate();
        if (this.formValidated) {
            this.registrationResult = this.storageService.storeOnLocalStorage(this.userObj);
            if (this.registrationResult) {
                alert('Registration Success!');
            } else {
                alert('Registration failed!');
            }
        } else {
            alert('Insufficient Data. Check registration data');
        }
    }

    validate(): void {
        this.formValidated = true;
        if (this.userObj.Id == "") {
            this.formValidated = false;
        };
        if (this.userObj.Name == "") {
            this.formValidated = false;
        };
        if (this.userObj.EmailId == "") {
            this.formValidated = false;
        };
        if (this.userObj.Pwd == "") {
            this.formValidated = false;
        };
        if (!(this.userObj.Pwd == this.RepeatPwd)) {
            this.formValidated = false;
        }
    }
}