import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    
    constructor(private _router: Router,private tokenStorage: TokenStorageService) {
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        
        let  isLoggedIn = !!this.tokenStorage.getToken();
        
        if (isLoggedIn) {
            const user = this.tokenStorage.getUser();
            let roles = user.roles;
            
            // user does not have the right authority
            if(!roles.includes('ROLE_ADMIN')) {
                
                this._router.navigate(['../home'] );
               
            }
            return true;
            
        }else{
            this._router.navigate(['../login'] );
        }
    }
}
