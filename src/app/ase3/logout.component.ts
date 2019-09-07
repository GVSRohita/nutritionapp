import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './persistence.service';

@Component({
    selector: 'logout',
    templateUrl: 'logout.component.html',
    styleUrls: ['./logout.css']
})
export class LogoutComponent {
    storageService: LocalStorageService;

    constructor(private localStorageService: LocalStorageService, private router: Router) {
        this.storageService = localStorageService;
    }

    ngOnInit() {
        this.storageService.logout();
        this.router.navigate(['/login']);
    }


}
