import { Test, TestingModule } from '@nestjs/testing';
import { StreamersController } from './streamers.controller';
import { StreamersService } from './streamers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamerEntity } from './entities/streamer.entity';
import { StreamerRatingEntity } from './entities/streamer-rating.entity';
import { VotesEntity } from './entities/votes.entity';
import { HttpStatus } from '@nestjs/common';

describe('Streamers Features', () => {
  let controller: StreamersController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'test-streamers-db',
          autoLoadEntities: true,
          synchronize: true,
        }),
        TypeOrmModule.forFeature([
          StreamerEntity,
          StreamerRatingEntity,
          VotesEntity,
        ]),
      ],
      controllers: [StreamersController],
      providers: [StreamersService],
    }).compile();

    controller = module.get<StreamersController>(StreamersController);
    controller.clearData();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('/streamers', () => {
    it('/POST should create new streamer"', async () => {
      expect(
        await controller.createStreamer({
          name: 'streamer-1',
          description: 'streamer-1',
          streamingPlatform: 'YouTube',
        }),
      ).toEqual({
        id: expect.anything(),
        upvote: 0,
        downvote: 0,
        name: 'streamer-1',
      });
    });

    it('/POST should NOT create new streamer if already exists"', async () => {
      try {
        await controller.createStreamer({
          name: 'streamer-1',
          description: 'streamer-1',
          streamingPlatform: 'YouTube',
        });
      } catch (err) {
        expect(err.code).toBe('SQLITE_CONSTRAINT');
      }
    });

    it('/GET should get all streamers "', async () => {
      expect(await controller.getAllStreamersWithRating()).toEqual([
        {
          name: 'streamer-1',
          upvote: 0,
          downvote: 0,
          id: expect.anything(),
        },
      ]);
    });

    it('/GET/:id should get specific streamer"', async () => {
      const streamers = await controller.getAllStreamersWithRating();

      expect(await controller.findStreamerDetails(streamers[0].id)).toEqual({
        name: 'streamer-1',
        description: 'streamer-1',
        streamingPlatform: 'YouTube',
        avatar: expect.anything(),
      });
    });

    it('/GET/:id should throw error on bad ID"', async () => {
      try {
        await controller.findStreamerDetails('non-existing-id');
      } catch (err) {
        expect(err.status).toBe(HttpStatus.NOT_FOUND);
      }
    });

    it('/PUT should upvote streamer"', async () => {
      const streamers = await controller.getAllStreamersWithRating();
      const streamerId = streamers[0].id;
      expect(
        await controller.voteForStreamer(
          streamerId,
          { action: 'upvote' },
          'userId-1',
        ),
      ).toEqual({
        streamerId: streamerId,
        action: 'upvote',
      });
    });

    it('/PUT should throw error on bad ID"', async () => {
      try {
        await controller.voteForStreamer(
          'non-existing-id',
          { action: 'upvote' },
          'userId-1',
        );
      } catch (err) {
        expect(err.status).toBe(HttpStatus.NOT_FOUND);
      }
    });

    it('/PUT should downvote streamer"', async () => {
      const newStreamer = await controller.createStreamer({
        name: 'streamer-2',
        description: 'streamer-2',
        streamingPlatform: 'YouTube',
      });
      const streamerId = newStreamer.id;

      expect(
        await controller.voteForStreamer(
          streamerId,
          { action: 'downvote' },
          'userId-2',
        ),
      ).toEqual({
        streamerId: streamerId,
        action: 'downvote',
      });
    });

    it('/PUT should NOT vote for streamer if user already voted"', async () => {
      const streamers = await controller.getAllStreamersWithRating();
      const streamerId = streamers[0].id;

      try {
        await controller.voteForStreamer(
          streamerId,
          { action: 'upvote' },
          'userId-1',
        );
      } catch (err) {
        expect(err.code).toBe('SQLITE_CONSTRAINT');
      }
    });

    it('/PUT bad action passed"', async () => {
      const streamers = await controller.getAllStreamersWithRating();
      const streamerId = streamers[0].id;

      try {
        await controller.voteForStreamer(
          streamerId,
          // action to simualte bad action value
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          { action: 'bad-action' },
          'userId-1',
        );
      } catch (err) {
        expect(err.status).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });
});
