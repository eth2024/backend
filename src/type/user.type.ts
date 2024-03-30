import { User } from 'src/model/entity';
import { ResponseType } from './common.type';

export interface GetUserResponse extends ResponseType<User> {}
export interface GetRewardsByUserResponse extends ResponseType<number> {}
