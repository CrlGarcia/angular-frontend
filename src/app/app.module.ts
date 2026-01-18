import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
