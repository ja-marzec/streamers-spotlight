import { Module } from '@nestjs/common';
import { StreamersModule } from './streamers/streamers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './seed/seed.module';
import { ClearDataModule } from './clear-data/clear-data.module';
import { UserModule } from './user/user.module';
import { StreamerEntity } from './streamers/entities/streamer.entity';
import { StreamerRatingEntity } from './streamers/entities/streamer-rating.entity';
import { VotesEntity } from './streamers/entities/votes.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'streamers-db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      StreamerEntity,
      StreamerRatingEntity,
      VotesEntity,
    ]),
    StreamersModule,
    UserModule,
    SeedModule,
    ClearDataModule,
  ],
})
export class AppModule {}
