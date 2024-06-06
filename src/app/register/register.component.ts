import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import User from '../models/User';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  ngOnInit() {

  }
  emptyUser: User = new User(null, null, null, null, null)
  // passwordConfirmation: string;

  constructor(public userService: UserService, public activatedRoute: ActivatedRoute, public myRouter: Router) {
    this.activatedRoute.params.subscribe(param => {
      this.emptyUser.Name = param['name'];
    })
      , ((err: any) => alert(err))
  }

  keepName() {
    localStorage.setItem('name', this.emptyUser.Name);
    localStorage.setItem('password', this.emptyUser.Password)
    localStorage.setItem('id', this.emptyUser.Id.toString())
    this.userService.currentUser.next({ name: this.emptyUser.Name });
  }

  save() {
    debugger
    this.userService.register(this.emptyUser).subscribe((succ) => {
      if (typeof succ !== "boolean") {
        this.emptyUser = succ;
        alert("You have registered successfully!")
        this.myRouter.navigate([''])
        this.keepName()
      }
      else {
        if (succ == true)
          alert("This username already exists! Choose a different username!")
        else {
          alert("This username already exists!")
        }
      }
    },
      (err) => {
        alert("Error!");
        console.log(err)
      })
  }
}