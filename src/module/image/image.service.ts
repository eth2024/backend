import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image, Match, User, Verification } from 'src/model/entity';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
  ) {}

  async getImageMetadataClean(category: string): Promise<Image[]> {
    return await this.imageRepository.find({
      where: { matched: false, confirmed: false, category },
      take: 10,
    });
  }

  async getAllImageMetadatasClean(category: string): Promise<Image[]> {
    return await this.imageRepository.find({
      where: { matched: false, confirmed: false, category },
    });
  }

  async getImageMetadataMatched(): Promise<Image> {
    return await this.imageRepository.findOne({
      where: { matched: true, confirmed: false },
    });
  }

  async matchImageMetadata(
    userAddress: string,
    imageId: number,
    word: string,
  ): Promise<Match> {
    await this.imageRepository.update({ id: imageId }, { matched: true, word });

    const user = await this.userRepository.findOne({
      where: { address: userAddress },
    });

    const match = await this.matchRepository.create({
      user: user.id,
      image: imageId,
    });

    return await this.matchRepository.save(match);
  }

  async verifyImageMetadata(
    userAddress: string,
    imageId: number,
  ): Promise<Verification> {
    await this.imageRepository.update({ id: imageId }, { confirmed: true });

    const user = await this.userRepository.findOne({
      where: { address: userAddress },
    });

    const verification = await this.verificationRepository.create({
      user: user.id,
      image: imageId,
    });

    return await this.matchRepository.save(verification);
  }

  async insertImageSetByCategory(category: string): Promise<void> {
    const filenames = await fs.readdir(
      path.join(__dirname, '../../assets/', category),
    );

    const images: Image[] = [];
    filenames.forEach((filename) => {
      if (filename === '.DS_Store') return;

      const image = this.imageRepository.create({
        name: filename,
        category,
        url: `https://eth2024.s3.ap-northeast-2.amazonaws.com/unlabeled/${category}/${filename}`,
        matched: false,
        confirmed: false,
      });

      images.push(image);
    });

    await this.imageRepository.insert(images);
  }
}
