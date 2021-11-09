import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot,UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { take, switchMap } from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements  CanActivate {


  constructor( private auth: AngularFireAuth,
            private router: Router ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean > | boolean  {
   
      return this.auth.authState.pipe( 
        take(1),
        switchMap( async ( authstate ) => {
          if( authstate ){
            return true;
          }else{
            console.log('no autenticado');
            this.router.navigate(['auth/login'])
            return false;
            
          }
        } )
       )
  }
}
