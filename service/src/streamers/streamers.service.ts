import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateStreamerDto,
  StreamingPlatforms,
} from './dto/create-streamer.dto';
import { UpdateStreamerDto } from './dto/update-streamer.dto';
import { StreamerEntity } from './entities/streamer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StreamerRatingEntity } from './entities/streamer-rating.entity';
import { ActionTypes, VotesEntity } from './entities/votes.entity';
import { loremIpsum } from 'lorem-ipsum';

type StreamerRating = {
  id: string;
  upvote: number;
  downvote: number;
  name: string;
};

@Injectable()
export class StreamersService {
  public constructor(
    @InjectRepository(StreamerEntity)
    private streamerRepository: Repository<StreamerEntity>,
    @InjectRepository(StreamerRatingEntity)
    private streamerRatingRepository: Repository<StreamerRatingEntity>,
    @InjectRepository(VotesEntity)
    private votesRepository: Repository<VotesEntity>,
  ) {}

  async createStreamer(
    createStreamerDto: CreateStreamerDto,
  ): Promise<StreamerRating> {
    const newStreamer = await this.streamerRepository.save({
      ...createStreamerDto,
      avatar: 'https://picsum.photos/200/300',
    });

    const newStreamerRating = await this.streamerRatingRepository.save({
      streamerId: newStreamer.id,
      upvote: 0,
      downvote: 0,
      name: newStreamer.name,
    });

    return {
      id: newStreamerRating.streamerId,
      upvote: 0,
      downvote: 0,
      name: newStreamer.name,
    };
  }

  async getAllStreamersWithRating(): Promise<Array<StreamerRating>> {
    const streamersRating = await this.streamerRatingRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        streamer: true,
      },
      select: {
        streamer: {
          name: true,
        },
      },
    });

    const streamerWithRating = streamersRating.map((streamerData) => ({
      id: streamerData.streamerId,
      downvote: streamerData.downvote,
      name: streamerData.streamer.name,
      upvote: streamerData.upvote,
    }));

    return streamerWithRating;
  }

  async findStreamerDetails(
    streamerId: string,
  ): Promise<
    Pick<
      StreamerEntity,
      'name' | 'description' | 'streamingPlatform' | 'avatar'
    >
  > {
    const streamer = await this.streamerRepository.findOne({
      where: {
        id: streamerId,
      },
      select: {
        name: true,
        description: true,
        streamingPlatform: true,
        avatar: true,
      },
    });

    if (!streamer) {
      throw new NotFoundException(`Streamer #${streamerId} not found`);
    }

    return streamer;
  }

  async voteForStreamer(
    streamerId: string,
    userId: string,
    updateStreamerDto: UpdateStreamerDto,
  ): Promise<{ streamerId: string; action: ActionTypes }> {
    const streamerRating = await this.streamerRatingRepository.findOne({
      where: {
        streamerId,
      },
    });

    if (!streamerRating) {
      throw new NotFoundException(`Streamer ${streamerId} not found`);
    }

    switch (updateStreamerDto.action) {
      case 'upvote':
        await this.streamerRatingRepository.increment(
          { streamerId },
          'upvote',
          1,
        );
        break;
      case 'downvote':
        await this.streamerRatingRepository.increment(
          { streamerId },
          'downvote',
          1,
        );
        break;
      default:
        throw new HttpException(
          {
            errorCode: HttpStatus.BAD_REQUEST,
            error: 'Wrong action',
          },
          HttpStatus.BAD_REQUEST,
        );
    }

    await this.votesRepository.save({
      userId,
      streamerId,
      action: updateStreamerDto.action,
    });

    return {
      action: updateStreamerDto.action,
      streamerId: streamerId,
    };
  }

  public async seed() {
    const arrayOfIndexes = Array.from(Array(10).keys() as unknown as string);
    const streamingPlatforms: StreamingPlatforms[] = [
      'Twitch',
      'YouTube',
      'TikTok',
      'Kick',
      'Rumble',
    ];
    const randomInRange = (n: number) => Math.floor(Math.random() * (n + 1));

    const streamers = arrayOfIndexes.map((item) => {
      return this.streamerRepository.create({
        name: item,
        description: loremIpsum({
          count: Math.floor(Math.random() * (30 - 15) + 15),
        }),
        streamingPlatform: streamingPlatforms[randomInRange(4)],
        avatar: `https://picsum.photos/id/${item}/1080/1080`,
      });
    });

    await this.streamerRepository.delete({});
    await this.streamerRepository.save(streamers);

    const streamersRatings = streamers.map((item) =>
      this.streamerRatingRepository.create({
        streamerId: item.id,
        upvote: 0,
        downvote: 0,
      }),
    );

    await this.streamerRatingRepository.delete({});
    await this.streamerRatingRepository.save(streamersRatings);

    await this.votesRepository.delete({});
  }

  public async clearData() {
    await this.streamerRepository.delete({});
    await this.streamerRatingRepository.delete({});
    await this.votesRepository.delete({});
  }
}
