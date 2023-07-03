import { Module } from '@nestjs/common';
import { StreamersModule } from '../streamers/streamers.module';
import { ClearDataSerice } from './clear-data.service';

@Module({
  imports: [StreamersModule],
  providers: [ClearDataSerice],
})
export class ClearDataModule {}
