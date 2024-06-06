import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  baseRouteUrl = `${environment.baseUrl}/user`;

  currentUser = new BehaviorSubject<{ name: string }>({ name: 'Guest' })

  getAllUsers(){
    return this.http.get<User[]>(`${this.baseRouteUrl}/GetAllUsers`);
  }
  getUserById(id: number){
    return this.http.get<User>(`${this.baseRouteUrl}/GetUserById(${id})`);
  }
  login(user: User){
    return this.http.post<User>(`${this.baseRouteUrl}/Login`, user);
  }
  register(user: User){
    return this.http.post<User>(`${this.baseRouteUrl}/Register`, user);
  }
}
