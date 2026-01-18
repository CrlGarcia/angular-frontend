import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = "";
  returnUrl: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });

    this.returnUrl =
      this.route.snapshot.queryParams["returnUrl"] || "/dashboard";
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = "";

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .login(this.f["email"].value, this.f["password"].value)
      .subscribe({
        next: (response) => {
          console.log("[LoginComponent] Login bem-sucedido:", response);
          console.log(
            "[LoginComponent] Token salvo:",
            this.authService.getToken(),
          );
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (error) => {
          console.error("[LoginComponent] Erro ao fazer login:", error);
          this.error = error.message || "Erro ao fazer login";
          this.loading = false;
        },
      });
  }
}
