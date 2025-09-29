import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reserved-login',
  imports: [FormsModule],
  templateUrl: './reserved-login.html',
  styleUrl: './reserved-login.css'
})
export class ReservedLogin {

  username!: string;
  password!: string;

  submit() {
    console.log('submitting data');
  }

}
