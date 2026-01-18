import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { ScheduleService, Schedule } from "../dashboard/schedule.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  currentUser$: Observable<any>;
  scheduleForm: FormGroup;
  schedules: Schedule[] = [];
  loading = false;
  loadingSchedules = false;
  submitted = false;
  error = "";
  returnUrl: string = "";

  constructor(
    private authService: AuthService,
    private scheduleService: ScheduleService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.scheduleForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadSchedules();
  }

  private initializeForm(): void {
    this.scheduleForm = this.formBuilder.group({});
  }

  loadSchedules(): void {
    this.loadingSchedules = true;
    this.scheduleService.getSchedules().subscribe({
      next: (schedules) => {
        console.log("[DashboardComponent] Agendamentos carregados:", schedules);
        this.schedules = schedules;
        this.loadingSchedules = false;
      },
      error: (error) => {
        console.error(
          "[DashboardComponent] Erro ao carregar agendamentos:",
          error,
        );
        this.error = error.message || "Erro ao carregar agendamentos";
        this.loadingSchedules = false;
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = "";

    this.loading = true;
    const token = this.authService.getToken();
    console.log(
      "[DashboardComponent] Token disponível:",
      token ? "Sim" : "Não",
    );

    this.scheduleService.register(1, "Agendamento de consulta", 2).subscribe({
      next: (response) => {
        console.log("[DashboardComponent] Agendamento realizado:", response);
        alert("Agendamento criado com sucesso!");
        this.loading = false;
        this.loadSchedules(); // Recarregar lista
      },
      error: (error) => {
        console.error("[DashboardComponent] Erro ao agendar:", error);
        this.error = error.message || "Erro ao fazer agendamento";
        this.loading = false;
      },
    });
  }
}
