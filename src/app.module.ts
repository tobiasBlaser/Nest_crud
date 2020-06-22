import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TracksModule, TypeOrmModule.forRoot(), UsersModule],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
