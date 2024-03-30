import { Controller, Get, Param } from '@nestjs/common';
import { ImageService } from './image.service';
import { GetImageMetadataResponse } from 'src/type/image.type';

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
}
