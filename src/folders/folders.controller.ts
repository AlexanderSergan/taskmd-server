import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common'
import { FoldersService } from './folders.service'
import { CreateFolderDTO } from './dto/folders.dto'

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.foldersService.getAllFolders(id)
  }

  @Post()
  async create(@Body() folder: CreateFolderDTO) {
    try {
      return await this.foldersService.createFolder(folder)
    } catch ({ message }) {
      throw new HttpException(message, 500)
    }
  }
}
