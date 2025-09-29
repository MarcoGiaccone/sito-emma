import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserved-login',
  imports: [FormsModule],
  templateUrl: './reserved-login.html',
  styleUrl: './reserved-login.css'
})
export class ReservedLogin {

  username!: string;
  password!: string;
  loginErrorMessage!: string;  
  constructor(
    private router: Router
  ) {}

  submit() {
    this.loginErrorMessage = '';
    console.log('submitting data');
    if (
      this.username === 'emma' &&
      this.password === 'genovese'
    ) {
      this.router.navigateByUrl('/reserved/projects');
    } else {
      this.loginErrorMessage = 'Attenzione! Credenziali errate!';
    }
  }

}
