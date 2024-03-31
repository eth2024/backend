import { Controller, Get, Param, Inject, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import {
  GetRewardsByUserResponse,
  GetUserResponse,
  ClaimByUserResponse,
  SlashByUserResponse,
} from 'src/type/user.type';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Get(':address')
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

  @Post('register')
  async registerUser(
    @Body('address')
    address: string,
  ): Promise<GetUserResponse> {
    return {
      data: await this.userService.registerUser(address),
      status: 200,
      message: 'Success',
    };
  }

  @Get('claim')
  async claimRewardsByUser(
    @Param('address')
    address: string,
  ): Promise<ClaimByUserResponse> {
    return {
      data: await this.userService.claimRewardsByUser(address),
      status: 200,
      message: 'Success',
    };
  }

  @Get('slash')
  async slashByUser(
    @Param('address')
    address: string,
  ): Promise<SlashByUserResponse> {
    return {
      data: await this.userService.slashByUser(address),
      status: 200,
      message: 'Success',
    };
  }
}
