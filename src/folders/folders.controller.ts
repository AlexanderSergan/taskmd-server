import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Headers,
} from '@nestjs/common'
import { FoldersService } from './folders.service'
import { CreateFolderDTO } from './dto/folders.dto'
import { AuthService } from 'auth/auth.service'

@Controller('folders')
export class FoldersController {
  constructor(
    private readonly foldersService: FoldersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async foldersByUserId(@Headers('Authorization') authorization: string) {
    try {
      const token = await this.authService.decodeBearerToken(authorization)
      return await this.foldersService.getAllFoldersByUserId(token['sub'])
    } catch ({ message }) {
      throw new HttpException(message, 500)
    }
    // return this.foldersService.getAllFoldersByUserId(id)
  }

  @Get(':id')
  async folderById(@Param('id') id: string) {
    return this.foldersService.getFolderById(id)
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
