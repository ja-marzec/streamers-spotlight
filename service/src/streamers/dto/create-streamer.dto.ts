import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export type StreamingPlatforms =
  | 'Twitch'
  | 'YouTube'
  | 'TikTok'
  | 'Kick'
  | 'Rumble';

export class CreateStreamerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  public name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  public description: string;

  @IsNotEmpty()
  public streamingPlatform: StreamingPlatforms;
}
