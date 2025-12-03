import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';

import { LayoutComponent } from './pages/superadmin/layout/layout';
import { DashboardComponent } from './pages/superadmin/dashboard/dashboard';

import { AlumnosComponent } from './pages/superadmin/registros/alumnos/alumnos';
import { MedicosComponent } from './pages/superadmin/registros/medicos/medicos';
import { TutoresComponent } from './pages/superadmin/registros/tutores/tutores';

//Guard Principal
import { authGuard } from './auth-guard';
// Guards por rol
import { SuperadminGuard } from './guards/superadmin-guard';
import { AlumnoGuard } from './guards/alumno-guard';
import { TutorGuard } from './guards/tutor-guard';
import { MedicoGuard } from './guards/medico-guard';

// Alumno (vista individual)
import { Alumno } from './pages/alumno/alumno'; 
import { MedicoPanelComponent } from './pages/medico-panel/medico-panel';
import { TutorComponent } from './pages/tutor/tutor';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'superadmin',
    component: LayoutComponent,
    canActivate: [authGuard, SuperadminGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'alumnos', component: AlumnosComponent },
      { path: 'medicos', component: MedicosComponent },
      { path: 'tutores', component: TutoresComponent }
    ]
  },

    // ===== ALUMNO =====
  { path: 'alumno', component: Alumno, canActivate: [authGuard, AlumnoGuard] },
    // ==== MEDICO ====
   { path: 'medico', component: MedicoPanelComponent, canActivate: [authGuard, MedicoGuard] },
    // ===== TUTOR =====
  { path: 'tutor', component: TutorComponent, canActivate: [authGuard, TutorGuard] },

  // Ruta por defecto si no existe
  { path: '**', redirectTo: '' }

];
