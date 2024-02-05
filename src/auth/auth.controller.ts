import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MaxLengthPipe, MinLengthPipe } from './pipe/password.pipe';
import { BasicTokenGuard } from './guard/basic-token-guard';
import { RefreshTokenGuard } from './guard/bearer-token-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/email')
  async postRegisterWithEmail(
    @Body('email') email: string,
    @Body('nickname') nickname: string,
    @Body('password', new MaxLengthPipe(8), new MinLengthPipe(3))
    password: string,
  ) {
    return this.authService.registerWithEmail({
      email,
      nickname,
      password,
    });
  }

  @Post('login/email')
  @UseGuards(BasicTokenGuard)
  async postLoginWithEmail(@Headers('authorization') rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, false);
    const credentials = this.authService.decodedBasicToken(token);
    return this.authService.loginWithEmail(credentials);
  }

  @Post('token/access')
  @UseGuards(RefreshTokenGuard)
  postTokenAccess(@Headers('authorization') rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, true);
    const newToken = this.authService.rotateToken(token, false);
    return {
      accessToken: newToken,
    };
  }

  @Post('token/refresh')
  @UseGuards(RefreshTokenGuard)
  postTokenRefresh(@Headers('authorization') rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, true);
    const newToken = this.authService.rotateToken(token, true);
    return {
      refreshToken: newToken,
    };
  }
}
