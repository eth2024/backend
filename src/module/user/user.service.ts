import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Match, Verification, User } from 'src/model/entity';
import { CountType } from 'src/type/common.type';

@Injectable()
export class UserService {
  constructor(
    @Inject(EntityManager)
    private readonly entityManager: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
  ) {}

  async getUser(address: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { address },
    });
  }

  async getRewardsByUser(address: string): Promise<number> {
    const user = await this.userRepository.findOne({ where: { address } });

    const matchCountQuery = await this.matchRepository
      .createQueryBuilder('V')
      .select('COUNT(*)', 'count')
      .where('V.user = :user', { user: user.id })
      .where('V.isRewarded = :isRewarded', { isRewarded: false });

    const matchCount = await matchCountQuery.getRawOne<CountType>();

    const verificationQuery = await this.verificationRepository
      .createQueryBuilder('V')
      .select('COUNT(*)', 'count')
      .where('V.user = :user', { user: user.id })
      .where('V.isRewarded = :isRewarded', { isRewarded: false });

    const verificationCount = await verificationQuery.getRawOne<CountType>();

    return matchCount.count + verificationCount.count;
  }
}
