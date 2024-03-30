import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from 'src/model/entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async getImage(): Promise<Image> {
    return await this.imageRepository.findOne({
      where: { matched: false, confirmed: false },
    });
  }

  async getImages(): Promise<Image[]> {
    return await this.imageRepository.find({
      where: { matched: false, confirmed: false },
    });
  }
}
