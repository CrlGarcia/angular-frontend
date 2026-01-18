import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { environment } from "../../environments/environment";

export interface User {
  id?: string;
  email: string;
  name?: string;
  token?: string;
}

export interface scheduleRequest {
  id_user: number;
  title: string;
  type: number;
}

export interface scheduleResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: "root",
})
export class ScheduleService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

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
