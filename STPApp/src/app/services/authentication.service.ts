import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsersServiceClient, UserDTO } from '../webapi-client/coreServices';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserDTO>;
  public currentUser: Observable<UserDTO>;

  public get currentUserValue(): UserDTO {
    return this.currentUserSubject.value;
  }

  constructor(private usersServiceClient: UsersServiceClient) {

    // Gespeicherten Login laden
    let savedLogin = JSON.parse(localStorage.getItem('currentUser'));
    if (!savedLogin) {
      savedLogin = JSON.parse(sessionStorage.getItem('currentUser'));
    }

    this.currentUserSubject = new BehaviorSubject<UserDTO>(savedLogin);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string, rememberLogin: boolean) {
    return this.usersServiceClient.authenticate(username, password)
      .pipe(map(user => {

        if (rememberLogin) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        }

        this.currentUserSubject.next(user);

        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
