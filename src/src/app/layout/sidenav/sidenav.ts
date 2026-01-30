import { Component, ChangeDetectionStrategy, input, inject, output, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { NAVIGATION_ITEMS } from '../../shared/models/navigation.model';
import { Layout } from '../../shared/services/layout';

@Component({
  selector: 'app-sidenav',
  imports: [MatIconModule, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidenav implements OnInit {
  private readonly layoutService = inject(Layout);
  private readonly router = inject(Router);

  collapsed = input(false);
  navigate = output<string>();

  activeRoute = signal<string>('');
  version = signal<string>('0.0.0');
  navigationItems = signal(NAVIGATION_ITEMS);

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeRoute.set(event.url);
        if (this.layoutService.isMobile()) {
          this.layoutService.closeSidenav();
        }
      });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    const currentRoute = this.activeRoute();
    // Handle root route
    if (route === '/') {
      return currentRoute === '/' || currentRoute === '';
    }
    // Handle other routes
    return currentRoute === route || currentRoute.startsWith(route + '/');
  }

  toggleCollapsed(): void {
    this.layoutService.toggleSidenavCollapsed();
  }
}
