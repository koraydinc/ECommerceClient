import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  set(token: string): void {
    localStorage.setItem('accessToken', token);
  }
  get(): string | null {
    return localStorage.getItem('accessToken');
  }
  clear(): void {
    localStorage.removeItem('accessToken');
  }
}
