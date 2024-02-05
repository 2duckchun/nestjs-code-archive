import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BearerTokenGuard implements CanActivate {
  // true : 가드 통과
  // false : 가드에서 걸림
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(content: ExecutionContext): Promise<boolean> {
    const req = content.switchToHttp().getRequest();
    const rawToken = req.headers['authorization'];
    if (!rawToken) throw new UnauthorizedException('토큰이 없습니다!');

    const token = this.authService.extractTokenFromHeader(rawToken, true);
    const decoded = await this.authService.verifyToken(token);
    const user = await this.usersService.getUserByEmail(decoded.email);

    /**
     * request)
     *
     * 1) 사용자 정보 - user
     * 2) token - token
     * 3) tokenType - access | refresh
     */
    req.user = user;
    req.token = token;
    req.tokenType = decoded.type;

    return true;
  }
}

@Injectable()
export class AccessTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest();
    console.log(req.tokenType);
    if (req.tokenType !== 'access') {
      throw new UnauthorizedException('Access Token이 아닙니다.');
    }

    return true;
  }
}

@Injectable()
export class RefreshTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest();
    if (req.tokenType !== 'refresh') {
      throw new UnauthorizedException('Refresh Token이 아닙니다.');
    }

    return true;
  }
}
