import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Match, Verification, User } from 'src/model/entity';
import { CountType } from 'src/type/common.type';
import { contractInteractor } from 'src/utils/contractInteractor';

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

  async registerUser(address: string): Promise<User> {
    const user = this.userRepository.create({ address });
    return await this.userRepository.save(user);
  }

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

  async claimRewardsByUser(address: string): Promise<string> {
    const rewardAmount = await this.getRewardsByUser(address);
    if (rewardAmount == 0) return 'No rewards to claim';

    contractInteractor.claim(address, rewardAmount);
    return `${rewardAmount} rewards claimed`;
  }

  async slashByUser(address: string): Promise<boolean> {
    contractInteractor.slash(address);
    return true;
  }
}
