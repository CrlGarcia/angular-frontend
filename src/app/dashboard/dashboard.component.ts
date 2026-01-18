import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  currentUser$: Observable<any>;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
