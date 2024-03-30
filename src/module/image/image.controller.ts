import { Controller, Get, Post, Param } from '@nestjs/common';
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
}
