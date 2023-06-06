import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationComponent } from './authentication-components/authorization/authorization.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './authentication-components/forgot-password/forgot-password.component';
import { AuthGuard } from './service/auth.guard';
import { AuthAdminGuard } from './service/auth-admin.guard';
import { AboutUsComponent } from './common/about-us/about-us.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/movies' },
  { path: 'login', component: AuthorizationComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'movies',
    loadChildren: () =>
      import('./movies-menu/movie.module').then((m) => m.MovieModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard],
  },
  { path: 'about-us', component: AboutUsComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
