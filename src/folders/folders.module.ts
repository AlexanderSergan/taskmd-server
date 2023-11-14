import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Folder } from 'schemas/folder.schema'
import { FolderSchema } from '../schemas/folder.schema'
import { FoldersController } from './folders.controller'
import { FoldersService } from './folders.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Folder.name,
        schema: FolderSchema,
      },
    ]),
  ],
  controllers: [FoldersController],
  providers: [FoldersService],
})
export class FoldersModule {}
