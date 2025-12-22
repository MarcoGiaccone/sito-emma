import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound implements OnInit{

  buttonText: string = '';

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    // const navigation
    // console.log(navigationState);
  }

  navigate(): void {
    // switch ('asd') {
    //   case 'asd': {

    //   }
    // }
    this.router.navigateByUrl('/reserved/projects');
  }


}
