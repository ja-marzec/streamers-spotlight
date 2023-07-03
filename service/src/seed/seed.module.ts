import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { StreamersModule } from '../streamers/streamers.module';

@Module({
  imports: [StreamersModule],
  providers: [SeedService],
})
export class SeedModule {}
