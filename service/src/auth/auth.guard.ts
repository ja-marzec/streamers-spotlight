import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

// Simulate user loged in scenario
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.userid;

    // Should be handled by JWT token
    if (!token) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
