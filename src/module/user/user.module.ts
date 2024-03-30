import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match, User, Verification } from 'src/model/entity';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User, Match, Verification])],
  providers: [UserService],
})
export class UserModule {}
