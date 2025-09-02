import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { ProjectsHome } from './components/projects-home/projects-home';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'about', component: About },
    { path: 'projects', component: ProjectsHome },
    { path: '', component: Home },
  { path: '**', redirectTo: '' } // fallback 404 → Home
];
