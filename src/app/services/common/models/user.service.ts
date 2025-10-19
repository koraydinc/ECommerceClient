import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from '../../../contracts/token/tokenResponse';
import { Create_User } from '../../../contracts/user/create_user';
import { User } from '../../../entities/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService, private tokenService: TokenService) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: 'users'
    }, user);

    return await firstValueFrom(observable) as Create_User;
  }

  async login(usernameOrEmail: string, password: string): Promise<void> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: 'users',
      action: 'login'
    }, { usernameOrEmail, password });

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      this.tokenService.set(tokenResponse.token.accessToken);
      //localStorage.setItem("expiration", token.expiration.toString());

      this.toastrService.message("Login successful", "Success", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight });
    }
  }
}
