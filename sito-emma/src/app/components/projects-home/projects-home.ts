import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-projects-home',
  imports: [Navbar, Footer],
  templateUrl: './projects-home.html',
  styleUrl: './projects-home.css'
})
export class ProjectsHome {

}
