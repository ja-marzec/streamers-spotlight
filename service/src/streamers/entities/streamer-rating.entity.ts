import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { CommonEntity } from './common.entity';
import { StreamerEntity } from './streamer.entity';

@Entity({ name: 'streamerRatingEntity' })
@Index(['streamerId'], { unique: true })
export class StreamerRatingEntity extends CommonEntity {
  @Column()
  public streamerId: string;

  @OneToOne(() => StreamerEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  public streamer: StreamerEntity;

  @Column()
  public upvote: number;

  @Column()
  public downvote: number;
}
