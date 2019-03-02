
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';//decode token
import * as moment from 'moment';
import 'rxjs/Rx';

const jwt = new JwtHelperService();

//data will found when we decode token
class DecodedToken {
  exp: number = 0;
  username: string = '';
}

@Injectable()
export class AuthService {
  private decodedToken;

  constructor(private http: HttpClient) {

    this.decodedToken = JSON.parse(localStorage.getItem('app_meta')) || new DecodedToken();
  }

//save decoded token to localstorge to can use user in our app
  private saveToken(token: string): string {
    this.decodedToken = jwt.decodeToken(token);

    localStorage.setItem('app_auth', token);
    localStorage.setItem('app_meta', JSON.stringify(this.decodedToken));

    return token;
  }

  private getExpiration() {
    return moment.unix(this.decodedToken.exp);
  }

  public register(userData: any): Observable<any> {
    return this.http.post('api/v1/users/register', userData);
  }

  public login(userData: any): Observable<any> {
    return this.http.post('api/v1/users/auth', userData).pipe(map(
      (token: string) => this.saveToken(token)));
  }

  public logout() {
    localStorage.removeItem('app_auth');//Remove localStorge
    localStorage.removeItem('app_meta');

    this.decodedToken = new DecodedToken();//Reset to decodedtoken
  }
//check if user is auth
  public isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  //Get user username
  public getUserName():string{
  	return this.decodedToken.username;
  }

    //Get user userId
    public getUserId(): string {
    return this.decodedToken.userId;
  }

  //Get auth token to header http
  public getAuthToken(): string {
    return localStorage.getItem('app_auth');
  }

}

    


