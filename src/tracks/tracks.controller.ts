import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/auth/jwt-auth.guard';
import { Track } from './track.entity';
import { TrackDTO } from './trackDTO';
import { TracksService } from './tracks.service';

@Controller('api/tracks')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTrack(@Body() data: TrackDTO): Promise<Track> {
    const track = await this.tracksService.createTrack(data);
    return track;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTracks(): Promise<Track[]> {
    return await this.tracksService.getAllTracks();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTrackById(@Param('id') id: string): Promise<Track> {
    return await this.tracksService.getTrackById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTrack(
    @Param('id') id: string,
    @Body() data: Partial<TrackDTO>,
  ): Promise<Track> {
    return await this.tracksService.updateTrack(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTrack(@Param('id') id: string): Promise<boolean> {
    return await this.tracksService.deleteTrack(id);
  }
}
