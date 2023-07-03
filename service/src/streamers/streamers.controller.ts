import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  ClassSerializerInterceptor,
  UseInterceptors,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { StreamersService } from './streamers.service';
import { CreateStreamerDto } from './dto/create-streamer.dto';
import { UpdateStreamerDto } from './dto/update-streamer.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('streamers')
export class StreamersController {
  constructor(private readonly streamersService: StreamersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  createStreamer(@Body() createStreamerDto: CreateStreamerDto) {
    return this.streamersService.createStreamer(createStreamerDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAllStreamersWithRating() {
    return this.streamersService.getAllStreamersWithRating();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findStreamerDetails(@Param('id') id: string) {
    return this.streamersService.findStreamerDetails(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':streamerId/vote')
  @UseGuards(AuthGuard)
  voteForStreamer(
    @Param('streamerId') streamerId: string,
    @Body() updateStreamerDto: UpdateStreamerDto,
    @Headers('UserId') userId: string,
  ) {
    return this.streamersService.voteForStreamer(
      streamerId,
      userId,
      updateStreamerDto,
    );
  }

  clearData() {
    return this.streamersService.clearData();
  }
}
