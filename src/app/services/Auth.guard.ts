import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { AdminServices } from './admin.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private myAuthService: AuthService, private myRouter: Router) { }

    canActivate(): boolean {
        if (this.myAuthService.isLoggedin()) {
            if (localStorage.getItem('type') == 'admin')
                return true
            else {
                this.myRouter.navigate(['/home'])
                return false
            }
        } else {
            this.myRouter.navigate(['/home'])
            return false
        }
    }

}