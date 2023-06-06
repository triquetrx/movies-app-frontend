import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin, IResetPasswordData, ISignup } from '../interfaces/IAuth';
import { environment } from 'src/environments/environment';
import { IPayload } from '../interfaces/ICommon';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  public login(loginData: ILogin): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, loginData);
  }

  public signup(signupData: ISignup): Observable<any> {
    return this.http.post(`${environment.apiUrl}/register`, signupData);
  }

  public forgotPassword(username: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${username}/forgot`);
  }

  public resetPassword(
    token: string,
    data: IResetPasswordData
  ): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${token}/reset`, data);
  }

  public validateToken(token: string): Observable<IPayload<any>> {
    const requestOptions = {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }).set(
        'Content-Type',
        'application/json'
      ),
    };
    return this.http.get<IPayload<any>>(
      `${environment.apiUrl}/validate`,
      requestOptions
    );
  }
}
