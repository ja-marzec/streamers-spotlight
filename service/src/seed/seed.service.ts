import { Injectable } from '@nestjs/common';
import { StreamersService } from '../streamers/streamers.service';

@Injectable()
export class SeedService {
  public constructor(private readonly streamersService: StreamersService) {}

  public async seed() {
    await this.streamersService.seed();
  }
}
