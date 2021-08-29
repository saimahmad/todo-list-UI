import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { MatCheckboxModule } from '@angular/material/checkbox';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginService } from './components/login-page/login.service';
import { TodoListService } from './components/todo-list/todo-list.service';
import { TokenInterceptorService } from './components/token-interceptor.service';




@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    TodoListComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,  
    FlexLayoutModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatSnackBarModule,
    MatTabsModule,
    DragDropModule,
    MatCheckboxModule
  ],
  providers: [LoginService,TodoListService,{
    provide: HTTP_INTERCEPTORS, 
    useClass: TokenInterceptorService, 
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
