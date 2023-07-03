import { Module } from '@nestjs/common';
import { StreamersService } from './streamers.service';
import { StreamersController } from './streamers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamerEntity } from './entities/streamer.entity';
import { StreamerRatingEntity } from './entities/streamer-rating.entity';
import { VotesEntity } from './entities/votes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StreamerEntity,
      StreamerRatingEntity,
      VotesEntity,
    ]),
  ],
  controllers: [StreamersController],
  providers: [StreamersService],
  exports: [StreamersService],
})
export class StreamersModule {}
