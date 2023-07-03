import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VotesEntity } from '../streamers/entities/votes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(VotesEntity)
    private votesRepository: Repository<VotesEntity>,
  ) {}

  public async getUserVotes(userId: string) {
    return await this.votesRepository.find({
      where: {
        userId,
      },
      select: {
        streamerId: true,
      },
    });
  }
}
