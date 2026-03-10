import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable, tap,map } from 'rxjs';
import { AUTH_SERVICE } from '@app/auth-shared/constants/services';
import { ClientProxy } from '@nestjs/microservices';
type AuthRequest = Request & {
  cookies: {
    Authentication?: string;
  };
  user?: unknown;
};
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const jwt = request.cookies.Authentication;
    if (!jwt) return false;
    return this.authClient
      .send('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          request.user = res;
        }),
        map(() => true),
      );
  }
}
