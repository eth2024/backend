import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ImageService } from './image.service';
import { GetImageMetadataResponse } from 'src/type/image.type';
import { ResponseType } from '../../type/common.type';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get(':category')
  async getImage(
    @Param('category')
    category: string,
  ): Promise<GetImageMetadataResponse> {
    return {
      data: await this.imageService.getImageMetadataClean(category),
      status: 200,
      message: 'Success',
    };
  }

  @Get('matched')
  async getImageChecked(): Promise<GetImageMetadataResponse> {
    return {
      data: await this.imageService.getImageMetadataMatched(),
      status: 200,
      message: 'Success',
    };
  }

  @Post('insert/:category')
  async insertImageSetByCategory(
    @Param('category')
    category: string,
  ): Promise<ResponseType<null>> {
    await this.imageService.insertImageSetByCategory(category);

    return {
      data: null,
      status: 200,
      message: '',
    };
  }

  @Post('match')
  async matchImage(
    @Body('userAddress')
    userAddress: string,
    @Body('imageId')
    imageId: number,
    @Body('word')
    word: string,
  ): Promise<ResponseType<null>> {
    await this.imageService.matchImageMetadata(userAddress, imageId, word);

    return {
      data: null,
      status: 200,
      message: '',
    };
  }

  @Post('verify')
  async verifyImage(
    @Body('userAddress')
    userAddress: string,
    @Body('imageId')
    imageId: number,
  ): Promise<ResponseType<null>> {
    await this.imageService.verifyImageMetadata(userAddress, imageId);

    return {
      data: null,
      status: 200,
      message: '',
    };
  }

  @Post('modify')
  async modifyImage(
    @Body('userAddress')
    userAddress: string,
    @Body('imageId')
    imageId: number,
    @Body('word')
    word: string,
  ): Promise<ResponseType<null>> {
    await this.imageService.modifyImageMetadata(userAddress, imageId, word);

    return {
      data: null,
      status: 200,
      message: '',
    };
  }
}
