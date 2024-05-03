import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Tracks } from './entities/tracks.entity';
import { ILike, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FileTypes, FilesService } from 'src/files/files.service';
import { getDate } from 'src/helpers/get-date';
@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Tracks)
    private trackRepository: Repository<Tracks>,
    private filesService: FilesService,
  ) {}
  async createTrack(
    createTrackDto: CreateTrackDto,
    picture: Express.Multer.File,
    audio: Express.Multer.File,
  ) {
    try {
      const sendData = {
        ...createTrackDto,
        picture: this.filesService.createFile(FileTypes.IMAGE, picture),
        audio: this.filesService.createFile(FileTypes.AUDIO, audio),
        listens: 0,
        createdAt: getDate(),
      };
      const data = await this.trackRepository.save(sendData);
      return JSON.stringify(data);
    } catch (e) {
      console.log(e);
    }
  }
  async getTracks(query: string) {
    try {
      console.log(query);
      if (query) {
        return await this.trackRepository.findBy({
          name: Like(`%${query}`),
        });
      } else {
        return await this.trackRepository.find();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getTrack(id: number) {
    try {
      return await this.trackRepository.findOne({ where: { id } });
    } catch (e) {
      console.log(e);
    }
  }
  async deleteTrack(id: string) {
    try {
      await this.trackRepository.delete(id);
      return 'Трек удален';
    } catch (e) {
      console.log(e);
    }
  }
  async listenTrack(id: number) {
    try {
      const track = await this.trackRepository.findOne({ where: { id } });
      if (track) {
        track.listens += 1;
        return await this.trackRepository.save(track);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
