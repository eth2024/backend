import { User } from 'src/model/entity';
import { ResponseType } from './common.type';

export interface GetUserResponse extends ResponseType<User> {}
export interface GetRewardsByUserResponse extends ResponseType<number> {}
export interface ClaimByUserResponse extends ResponseType<string> {}
export interface SlashByUserResponse extends ResponseType<boolean> {}
