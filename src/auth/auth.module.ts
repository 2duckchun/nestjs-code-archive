import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY } from './const/auth.const';

@Module({
  imports: [
    JwtModule.register({
      secret: SECRET_KEY,
    }),
    UsersModule,
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
