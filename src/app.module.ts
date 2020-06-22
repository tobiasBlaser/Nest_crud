import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from './common/auth/auth.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TracksModule, TypeOrmModule.forRoot(), UsersModule, AuthModule],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
