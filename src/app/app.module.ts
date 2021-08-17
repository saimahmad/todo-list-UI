import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LandingPageComponent } from './components/landing-page.component';
import { PolicyGraphComponent } from './components/policy-graph/policy-graph.component';
import { PolicyDetailsComponent } from './components/policy-details/policy-details.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
