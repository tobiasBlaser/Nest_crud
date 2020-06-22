import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './track.entity';
import { TrackDTO } from './trackDTO';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async createTrack(data: TrackDTO): Promise<Track> {
    const track = await this.trackRepository.create(data);
    await this.trackRepository.save(track);
    return track;
  }

  async getAllTracks(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  async getTrackById(id: string): Promise<Track> {
    return await this.trackRepository.findOne(id);
  }

  async updateTrack(id: string, data: Partial<TrackDTO>): Promise<Track> {
    await this.trackRepository.update(id, data);
    return await this.trackRepository.findOne(id);
  }

  async deleteTrack(id: string): Promise<boolean> {
    await this.trackRepository.delete(id);
    return true;
  }
}
