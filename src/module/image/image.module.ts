import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image, Verification, Match, User } from 'src/model/entity';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Image, Verification, Match, User])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
