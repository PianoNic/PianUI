import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout';
import { ExamplePage } from './example/example';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ExamplePage,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
