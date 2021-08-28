import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './components/auth-guard.service';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login' , pathMatch: 'full'},
  { path: 'login', component: LandingPageComponent },
  { path: 'todo-list', component: TodoListComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
