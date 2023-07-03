import { Column, Entity, Index } from 'typeorm';
import { CommonEntity } from './common.entity';

export type ActionTypes = 'upvote' | 'downvote';

@Entity({ name: 'votesEntity' })
@Index(['userId', 'streamerId'], { unique: true })
export class VotesEntity extends CommonEntity {
  @Column()
  public userId: string;

  @Column()
  public streamerId: string;

  @Column()
  public action: ActionTypes;
}
