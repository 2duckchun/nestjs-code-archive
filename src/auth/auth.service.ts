import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { SECRET_KEY } from './const/auth.const';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async registerWithEmail(
    user: Pick<UserModel, 'nickname' | 'email' | 'password'>,
  ) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.userService.createUser({
      ...user,
      password: hashedPassword,
    });
    return this.loginUser(newUser);
  }

  async loginWithEmail(user: Pick<UserModel, 'email' | 'password'>) {
    const existingUser = await this.authenticateWithEmailAndPassword(user);
    return this.loginUser(existingUser);
  }

  async authenticateWithEmailAndPassword(
    user: Pick<UserModel, 'email' | 'password'>,
  ) {
    const existingUser = await this.userService.getUserByEmail(user.email);
    if (!existingUser) {
      throw new UnauthorizedException('사용자가 존재하지 않습니다.');
    }

    const passOk = await bcrypt.compare(user.password, existingUser.password);

    if (!passOk) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    return existingUser;
  }

  signToken(user: Pick<UserModel, 'id' | 'email'>, isRefreshToken: boolean) {
    const payload = {
      email: user.email,
      sub: user.id,
      type: isRefreshToken ? 'refresh' : 'access',
    };

    return this.jwtService.sign(payload, {
      secret: SECRET_KEY,
      expiresIn: isRefreshToken ? '3600' : '600',
    });
  }

  loginUser(user: Pick<UserModel, 'id' | 'email'>) {
    return {
      accessToken: this.signToken(user, false),
      refreshToken: this.signToken(user, true),
    };
  }
}
