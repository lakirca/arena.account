import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./pages/auth/sign-in/sign-in.module').then(
        (m) => m.SignInPageModule
      ),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./pages/auth/sign-up/sign-up.module').then(
        (m) => m.SignUpPageModule
      ),
  },
  {
    path: 'password-reset',
    loadChildren: () =>
      import('./pages/auth/password-reset/password-reset.module').then(
        (m) => m.PasswordResetPageModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'support',
    loadChildren: () =>
      import('./pages/support/support.module').then((m) => m.SupportPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./pages/settings/settings.module').then(
        (m) => m.SettingsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./pages/notifications/notifications.module').then(
        (m) => m.NotificationsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./pages/account/account.module').then((m) => m.AccountPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./pages/auth/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'accounting',
    loadChildren: () =>
      import('./pages/accounting/accounting.module').then(
        (m) => m.AccountingPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'services',
    loadChildren: () =>
      import('./pages/services/services.module').then(
        (m) => m.ServicesPageModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
