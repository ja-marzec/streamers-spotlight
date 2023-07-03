import { Injectable } from '@nestjs/common';
import { StreamersService } from '../streamers/streamers.service';

@Injectable()
export class ClearDataSerice {
  public constructor(private readonly streamersService: StreamersService) {}

  public async clearData() {
    await this.streamersService.clearData();
  }
}
