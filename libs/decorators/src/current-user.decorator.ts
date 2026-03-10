import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from '@app/dto';


interface RequestWithUser extends Request {
  user: UserDto;
}
const getCurrentUserByContext = (context: ExecutionContext): UserDto => {
  const request = context.switchToHttp().getRequest<RequestWithUser>();
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): UserDto =>
    getCurrentUserByContext(context),
);
