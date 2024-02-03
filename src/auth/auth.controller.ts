import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/email')
  async registerWithEmail(
    @Body('email') email: string,
    @Body('nickname') nickname: string,
    @Body('password') password: string,
  ) {
    return this.authService.registerWithEmail({
      email,
      nickname,
      password,
    });
  }

  @Post('login/email')
  async loginWithEmail(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.loginWithEmail({ email, password });
  }
}
