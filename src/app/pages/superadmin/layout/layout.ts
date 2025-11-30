import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class LayoutComponent {

  constructor(private router: Router) {}

  logout() {
    // limpia sesión, token, etc.
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
