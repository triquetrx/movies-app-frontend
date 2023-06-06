import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPayload } from '../interfaces/ICommon';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/IAuth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getDetailsFromUserId(userId: string): Observable<IPayload<IUser>> {
    return this.http.get<IPayload<IUser>>(
      `${environment.apiUrl}/search-user/${userId}`
    );
  }
  public getAllUsers(): Observable<IPayload<[IUser]>> {
    return this.http.get<IPayload<[IUser]>>(`${environment.apiUrl}/all-users`);
  }
  public aboutUser(): Observable<IPayload<IUser>> {
    return this.http.get<IPayload<IUser>>(`${environment.apiUrl}/about-me`);
  }

  public giveAdminAccess(loginId: string): Observable<IPayload<any>> {
    return this.http.get<IPayload<any>>(
      `${environment.apiUrl}/admin-access/${loginId}`
    );
  }
}
