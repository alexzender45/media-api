import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EnvironmentService } from '../configs';
import { IUser } from '../database';
import { UserService } from '../user';

const { jwt_secret } = EnvironmentService.getAll();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwt_secret,
    });
  }

  async validate(payload: any) {
    return payload;
  }

  async getUserPayload(payload: any): Promise<IUser> {
    const user: IUser | null = await this.userService.findById(payload.aud);

    if (!user) {
      throw new Error('UserModel not found.');
    }

    return user;
  }
}
