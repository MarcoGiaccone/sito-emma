import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Supabase } from '../../services/supabase-service/supabase';

@Component({
  selector: 'app-reserved-login',
  imports: [FormsModule],
  templateUrl: './reserved-login.html',
  styleUrl: './reserved-login.css'
})
export class ReservedLogin {
  
  email = ''
  password = ''
  error = ''

  constructor(
    private supabase: Supabase,
    private router: Router
  ) {}

  async login() {
    const isUserLoggedIn: boolean = await this.supabase.signIn(
      this.email,
      this.password
    )
    console.log('is user logged in ', isUserLoggedIn);
    if (isUserLoggedIn) {
      this.router.navigate(['/reserved/projects'])
    } else {
      this.error = 'Email o password non corretti!';
    }
  }

}
