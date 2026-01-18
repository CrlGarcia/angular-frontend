import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { environment } from "../../environments/environment";

export interface Schedule {
  id?: number;
  id_user?: number;
  title: string;
  type?: number;
  description?: string;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
}

export interface scheduleRequest {
  id_user: number;
  title: string;
  type: number;
}

export interface scheduleResponse {
  title: string;
}

@Injectable({
  providedIn: "root",
})
export class ScheduleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSchedules(page: number = 1): Observable<Schedule[]> {
    const params = new HttpParams().set("page", page.toString());
    return this.http
      .get<Schedule[]>(`${this.apiUrl}/schedule`, { params })
      .pipe(
        catchError((error) => {
          const errorMessage =
            error?.error?.message || "Erro ao buscar agendamentos";
          return throwError(() => new Error(errorMessage));
        }),
      );
  }

  register(
    id_user: number,
    title: string,
    type: number,
  ): Observable<scheduleResponse> {
    const scheduleRequest: scheduleRequest = { id_user, title, type };
    return this.http
      .post<scheduleResponse>(`${this.apiUrl}/schedule`, scheduleRequest)
      .pipe(
        tap((response) => {
          //this.currentUserSubject.next(user);
        }),
        catchError((error) => {
          const errorMessage =
            error?.error?.message || "Erro ao fazer agendamento";
          return throwError(() => new Error(errorMessage));
        }),
      );
  }
}
