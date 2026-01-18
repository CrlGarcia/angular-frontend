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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const loginRequest: LoginRequest = { email, password };
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, loginRequest)
      .pipe(
        tap((response) => {
          const user: User = {
            ...response.user,
            token: response.token,
          };
          localStorage.setItem("currentUser", JSON.stringify(user));
          localStorage.setItem("token", response.token);
          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);
        }),
        catchError((error) => {
          const errorMessage = error?.error?.message || "Erro ao fazer login";
          return throwError(() => new Error(errorMessage));
        }),
      );
  }

  logout(): void {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  private checkAuthStatus(): void {
    const user = localStorage.getItem("currentUser");
    const token = localStorage.getItem("token");
    if (user && token) {
      this.currentUserSubject.next(JSON.parse(user));
      this.isAuthenticatedSubject.next(true);
    }
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }
}
