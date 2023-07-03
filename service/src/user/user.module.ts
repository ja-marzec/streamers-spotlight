import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotesEntity } from '../streamers/entities/votes.entity';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VotesEntity])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
