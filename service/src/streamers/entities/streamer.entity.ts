import { Column, Entity, Index } from 'typeorm';
import { CommonEntity } from './common.entity';

@Entity({ name: 'streamerEntity' })
@Index(['name', 'streamingPlatform'], { unique: true })
export class StreamerEntity extends CommonEntity {
  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public streamingPlatform: string;

  @Column()
  public avatar: string;
}
