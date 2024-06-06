import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  userName: string = 'Guest';
  constructor(public userService: UserService, public categoryService: CategoryService) { }
  ngOnInit(): void {
    this.userService.currentUser.subscribe(data => { this.userName = data?.name })

    this.categoryService.getAllCategories().subscribe((succ) => {
      this.categoryService.categories = succ;
    }
      , (err) => {
        alert("Error!")
      }
    )
  }

  ngOnDestroy(): void {
    this.userService.currentUser.unsubscribe()
  }

  logout() {
    this.userService.currentUser.next({ name: 'Guest' });
    window.localStorage.clear()
  }

  checkCurrentUser() {
    return this.userService.currentUser.value.name !== 'Guest';
  }

}