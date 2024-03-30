import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image, Match, User, Verification } from 'src/model/entity';

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

  async getImageMetadataClean(category: string): Promise<Image> {
    return await this.imageRepository.findOne({
      where: { matched: false, confirmed: false, category },
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
  ): Promise<Match> {
    await this.imageRepository.update({ id: imageId }, { matched: true });

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
    await this.imageRepository.update({ id: imageId }, { matched: true });

    const user = await this.userRepository.findOne({
      where: { address: userAddress },
    });

    const verification = await this.verificationRepository.create({
      user: user.id,
      image: imageId,
    });

    return await this.matchRepository.save(verification);
  }
}
