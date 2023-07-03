import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUserVotes(@Headers('UserId') userId) {
    const userVotes = await this.userService.getUserVotes(userId);
    const userVotesExtractedId = userVotes?.map((item) => item.streamerId);

    return userVotesExtractedId;
  }
}
