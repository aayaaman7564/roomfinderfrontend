import { Injectable } from '@angular/core';
import { USER_LOGIN_URL } from '../shared/model/constants/url';
import { ToastrService } from 'ngx-toastr/toastr/toastr.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '../shared/model/User';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { IUserLogin } from '../shared/model/interfaces/IUserLogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(new User());
  public userObservable: Observable<User>
  constructor(private http:HttpClient, private toastrService:ToastrService) { 
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(tap({
      next: (user) => {
        this.toastrService.success(`Welcome to Roomfinder $(user.name)!`, 'Login Successful !');
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Login Failed!');
      }
    }));
  }
}
