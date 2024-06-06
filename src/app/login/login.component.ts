import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Type } from '@angular/compiler';
import { Route, Router } from '@angular/router';
import Recipe from '../models/Recipe';
import User from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  constructor(public userService: UserService, public myRouter: Router) { }

  ngOnInit(): void {
  }

  emptyUser: User = new User(null, null, null, null, null);

  getName() {
    let name: string = localStorage.getItem('name')
    let password: string = localStorage.getItem('password')
    alert("Hello " + name + " : " + password)
  }

  keepName() {
    localStorage.setItem('name', this.emptyUser.Name);
    localStorage.setItem('password', this.emptyUser.Password)
    localStorage.setItem('id', this.emptyUser.Id.toString())
    this.userService.currentUser.next({ name: this.emptyUser.Name });
  }

  save() {
    this.userService.login(this.emptyUser).subscribe((succ) => {
      if (typeof succ !== "boolean") {
        this.emptyUser = succ;
        this.myRouter.navigate([''])
        this.keepName()
      }
      else {
        if (succ == true)
          alert("User name exists, but the password is wrong!")
        else {
          debugger
          this.myRouter.navigate(['register', this.emptyUser.Name])
        }
      }
    },
      (err) => {
        alert("Error!");
        console.log(err)
      })
  }
}
