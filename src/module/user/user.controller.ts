import { Controller, Get, Param, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { GetRewardsByUserResponse, GetUserResponse } from 'src/type/user.type';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Get()
  async getUser(
    @Param('address')
    address: string,
  ): Promise<GetUserResponse> {
    return {
      data: await this.userService.getUser(address),
      status: 200,
      message: 'Success',
    };
  }

  @Get('reward')
  async getRewardsByUser(
    @Param('address')
    address: string,
  ): Promise<GetRewardsByUserResponse> {
    return {
      data: await this.userService.getRewardsByUser(address),
      status: 200,
      message: 'Success',
    };
  }
}
