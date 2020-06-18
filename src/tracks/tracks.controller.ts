import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Track } from './track.entity';
import { TrackDTO } from './trackDTO';

@Controller('tracks')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Post()
  async createTrack(@Body() data: TrackDTO): Promise<Track> {
    const track = await this.tracksService.createTrack(data);
    return track;
  }

  @Get()
  async getAllTracks(): Promise<Track[]> {
    return await this.tracksService.getAllTracks();
  }

  @Get(':id')
  async getTrackById(@Param('id') id: string): Promise<Track> {
    return await this.tracksService.getTrackById(id);
  }

  @Put(':id')
  async updateTrack(
    @Param('id') id: string,
    @Body() data: TrackDTO,
  ): Promise<Track> {
    return await this.tracksService.updateTrack(id, data);
  }

  @Delete(':id')
  async deleteTrack(@Param('id') id: string): Promise<boolean> {
    return await this.tracksService.deleteTrack(id);
  }
}
