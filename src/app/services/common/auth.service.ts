import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService, private tokenService: TokenService) { }

  identityCheck() {
    const token = this.tokenService.get();
    let expired: boolean;
    if (token) {
      try {
        expired = this.jwtHelper.isTokenExpired(token);
      } catch (error) {
        expired = true;
      }
    }
    _isAuthenticated = token != null && !expired;
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean;