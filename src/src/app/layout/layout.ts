import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout as LayoutService } from '../shared/services/layout';
import { Header } from './header/header';
import { Sidenav } from './sidenav/sidenav';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Header, Sidenav],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  readonly layoutService = inject(LayoutService);
}
