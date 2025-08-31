import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit{
  @Input() linkDarRenderizzare: string[] = [];
  @Output() emettiColore = new EventEmitter<string>();
  currentColor!: string;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    console.log('link', this.linkDarRenderizzare);
  }

  goToAboutPage(): void {
    this.router.navigateByUrl('/about');
  }

  cambiaColore(): void {
    const randomNum = Math.floor(Math.random() * 0xFFFFFF);
    this.currentColor =  '#' + randomNum.toString(16).padStart(6, '0');
    this.emettiColore.emit(this.currentColor);
  }

}
