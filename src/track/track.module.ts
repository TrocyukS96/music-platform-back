import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tracks } from './entities/tracks.entity';
import { FilesModule } from 'src/files/files.module';
import { Pictures } from 'src/files/entities/pictures.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tracks, Pictures]), FilesModule],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
