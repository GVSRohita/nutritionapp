
import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, } from "@angular/common/http"
import { LocalStorageService } from './persistence.service';
import { User } from './User';
import { FunctionRet } from './utitityClasses';
import { Router } from '@angular/router';

@Injectable()
@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['./sb-admin.css']
})

export class Login {

    verifyPwd: FunctionRet = new FunctionRet();
    userObj: User;
    storageService: LocalStorageService;

    constructor(private http: HttpClient, private localStorageService: LocalStorageService, private router: Router) {
        this.verifyPwd.Result = false;
        this.userObj = new User();
        this.userObj.Id = "";
        this.userObj.Pwd = "";
        this.storageService = localStorageService;
    }

    verifyUser() {
        this.verifyPwd = this.storageService.verifyPwd(this.userObj);
        if (this.verifyPwd.Result) {
            this.router.navigate(['/weather']);
        } else {
            alert(this.verifyPwd.Message);
        }
    }
}