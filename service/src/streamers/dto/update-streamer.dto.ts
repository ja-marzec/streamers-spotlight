import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class UpdateStreamerDto {
  @IsNotEmpty()
  @IsString()
  @ValidateIf((dto) => dto.action === 'upvote' || dto.action === 'downvote')
  action: 'upvote' | 'downvote';
}
