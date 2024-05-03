import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  async create(
    @Body() createTrackDto: CreateTrackDto,
    @UploadedFiles()
    files: {
      picture?: Express.Multer.File[];
      audio?: Express.Multer.File[];
    },
  ) {
    return this.trackService.createTrack(
      createTrackDto,
      files?.picture[0],
      files?.audio[0],
    );
  }
  @Get()
  getAll(@Query('query') query: string) {
    return this.trackService.getTracks(query);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.trackService.getTrack(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }

  @Post('/listen/:id')
  listen(@Param('id') id: number) {
    return this.trackService.listenTrack(id);
  }
}
