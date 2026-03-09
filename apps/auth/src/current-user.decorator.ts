import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { User } from '@prisma/client';

interface RequestWithUser extends Request {
  user: User;
}
const getCurrentUserByContext = (context: ExecutionContext): User => {
  const request = context.switchToHttp().getRequest<RequestWithUser>();
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User =>
    getCurrentUserByContext(context),
);
