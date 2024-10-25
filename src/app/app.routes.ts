import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage),
    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'privacy-notice',
    loadComponent: () => import('./pages/privacy-notice/privacy-notice.page').then( m => m.PrivacyNoticePage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage),
    canActivate: [authGuard],
  },
  {
    path: 'account',
    loadComponent: () => import('./pages/account/account.page').then( m => m.AccountPage),
    canActivate: [authGuard],
  },
  {
    path: 'user-information',
    loadComponent: () => import('./pages/user-information/user-information.page').then( m => m.UserInformationPage),
    canActivate: [authGuard],
  },
  {
    path: 'generate-rute',
    loadComponent: () => import('./pages/generate-rute/generate-rute.page').then( m => m.GenerateRutePage),
    canActivate: [authGuard],
  },



];
