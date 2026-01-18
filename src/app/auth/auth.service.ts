import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface User {
  id?: string;
  email: string;
  name?: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.checkAuthStatus();
  }

  login(email: string, password: string): Observable<boolean> {
    return new Observable((observer) => {
      // Simulando uma chamada HTTP
      setTimeout(() => {
        if (email === "user@example.com" && password === "password123") {
          const user: User = {
            id: "1",
            email: email,
            name: "Usuário Teste",
          };
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);
          observer.next(true);
        } else {
          observer.error("Email ou senha inválidos");
        }
        observer.complete();
      }, 500);
    });
  }

  logout(): void {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  private checkAuthStatus(): void {
    const user = localStorage.getItem("currentUser");
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
      this.isAuthenticatedSubject.next(true);
    }
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
