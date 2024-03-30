import { Controller, Get, Param, Inject } from '@nestjs/common';
import { User } from 'src/model/entity';
import { UserService } from './user.service';

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
  ): Promise<User> {
    return await this.userService.getUser(address);
  }

  @Get('reward')
  async getRewardsByUser(
    @Param('address')
    address: string,
  ): Promise<number> {
    return await this.userService.getRewardsByUser(address);
  }
}
