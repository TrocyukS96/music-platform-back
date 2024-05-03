import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { TrackModule } from './track/track.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TrackModule,
    UsersModule,
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'static'),
    }),
  ],
})
export class AppModule {}
