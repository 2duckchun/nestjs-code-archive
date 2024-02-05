/**
 * 1) 요청객체를 불러오고 authorization header로부터 token을 가져온다.
 * 2) authService.extractTokenFromHeader를 이용해서 사용할 수 있는 형태의 token을 추출한다.
 * 3) authService.decodeBasicToken을 실행해서 email과 password를 추출한다.
 * 4) authService.authenticateWithEmailAndPassword
 * 5) 찾아낸 사용자를 요청 객체에 붙여준다. // req.user = user
 */

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class BasicTokenGuard implements CanActivate {
  // true : 가드 통과
  // false : 가드에서 걸림
  constructor(private readonly authService: AuthService) {}

  async canActivate(content: ExecutionContext): Promise<boolean> {
    const req = content.switchToHttp().getRequest();
    const rawToken = req.headers['authorization'];
    if (!rawToken) throw new UnauthorizedException('토큰이 없습니다!');

    const token = this.authService.extractTokenFromHeader(rawToken, false);
    const { email, password } = this.authService.decodedBasicToken(token);
    const user = await this.authService.authenticateWithEmailAndPassword({
      email,
      password,
    });

    req.user = user;
    return true;
  }
}
