import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { ProjectsHome } from './components/projects-home/projects-home';
import { ProjectSpotlight } from './components/project-spotlight/projectSpotlight';
import { ReservedLogin } from './components/reserved-login/reserved-login';
import { ReservedProjects } from './components/reserved-projects/reserved-projects';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'about', component: About },
    { path: 'projects', component: ProjectsHome },
    { path: 'projects/:id', component: ProjectSpotlight },
    { path: 'reserved', component: ReservedLogin },
    { path: 'reserved/projects', component: ReservedProjects },
    { path: '', component: Home },
  { path: '**', redirectTo: '' } // fallback 404 → Home
];
