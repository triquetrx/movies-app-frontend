import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopbarComponent } from './common/topbar/topbar.component';
import { LoginComponent } from './authentication-components/login/login.component';
import { SignupComponent } from './authentication-components/signup/signup.component';
import { AuthorizationComponent } from './authentication-components/authorization/authorization.component';
import { FooterComponent } from './common/footer/footer.component';
import { ForgotPasswordComponent } from './authentication-components/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { UsernameFormComponent } from './authentication-components/forgot-password-components/username-form/username-form.component';
import { TokenFormComponent } from './authentication-components/forgot-password-components/token-form/token-form.component';
import { NewPasswordFormComponent } from './authentication-components/forgot-password-components/new-password-form/new-password-form.component';
import { AuthInterceptor } from './service/auth.interceptor';
import { AboutUsComponent } from './common/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    LoginComponent,
    SignupComponent,
    AuthorizationComponent,
    FooterComponent,
    ForgotPasswordComponent,
    PageNotFoundComponent,
    UsernameFormComponent,
    TokenFormComponent,
    NewPasswordFormComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
