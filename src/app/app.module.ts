import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


import { LandingPageComponent } from './components/landing-page.component';
import { PolicyGraphComponent } from './components/policy-graph/policy-graph.component';
import { PolicyDetailsComponent } from './components/policy-details/policy-details.component';
import { PolicyService } from './components/policy.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    PolicyGraphComponent,
    PolicyDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ChartsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [PolicyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
