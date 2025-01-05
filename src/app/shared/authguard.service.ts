import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, take, catchError } from 'rxjs';
import { Roles, User } from '../user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const requiredRole = route.data['role'] as keyof Roles;
    
    const currentUser = this.auth.getCurrentUser();
    if (currentUser) {
      return this.firestore
        .collection<User>('users')
        .doc(currentUser.uid)
        .valueChanges()
        .pipe(
          take(1),
          map((userData: User | undefined) => {
            if (userData && userData.roles && userData.roles[requiredRole]) {
              console.log('Access granted for role:', requiredRole);
              return true;
            } else {
              console.warn('Access denied. Missing role:', requiredRole);
              this.auth.setRedirect(state.url);
              this.router.navigate(['/access-denied']);
              return false;
            }
          }),
          catchError((error) => {
            console.error('Error fetching user data:', error);
            this.auth.setRedirect(state.url);
            this.router.navigate(['/access-denied']);
            return of(false); 
          })
        );
    } else {
      console.warn('No user is logged in. Redirecting to login.');
      this.auth.setRedirect(state.url);
      this.router.navigate(['/access-denied']);
      return of(false);
    }
  }
}
