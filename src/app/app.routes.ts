import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';

import { LayoutComponent } from './pages/superadmin/layout/layout';
import { DashboardComponent } from './pages/superadmin/dashboard/dashboard';

import { AlumnosComponent } from './pages/superadmin/registros/alumnos/alumnos';
import { AdminComponent } from './pages/superadmin/registros/admin/admin';
import { MedicosComponent } from './pages/superadmin/registros/medicos/medicos';
import { TutoresComponent } from './pages/superadmin/registros/tutores/tutores';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'superadmin',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'alumnos', component: AlumnosComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'medicos', component: MedicosComponent },
      { path: 'tutores', component: TutoresComponent }
    ]
  }
];
