import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import 'dotenv/config'

import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { CatsModule } from './cats/cats.module'
import { UsersModule } from './users/users.module'
import { AuthService } from 'auth/auth.service'
// import { SchemasModule } from './schemas/schemas.module';
import { FoldersModule } from './folders/folders.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CatsModule,
    UsersModule,
    AuthModule,
    // SchemasModule,
    FoldersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {
  onModuleInit() {}
}
