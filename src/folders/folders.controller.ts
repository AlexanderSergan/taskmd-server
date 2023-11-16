import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Req,
  Headers,
} from '@nestjs/common'
import { FoldersService } from './folders.service'
import { CreateFolderDTO } from './dto/folders.dto'
import { AuthService } from 'auth/auth.service'
import { Request } from 'express'

@Controller('folders')
export class FoldersController {
  constructor(
    private readonly foldersService: FoldersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async foldersByUserId(
    @Headers('Authorization') authorization: string,
    @Req() request: Request,
  ) {
    try {
      const token = await this.authService.decodeBearerToken(
        request.cookies['token'],
      )
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
  async create(
    @Body() folder: CreateFolderDTO,
    @Headers('Authorization') authorization: string,
  ) {
    try {
      const userId = await this.authService.getUserIdByHeader(authorization)

      return await this.foldersService.createFolder({ userId, ...folder })
    } catch ({ message }) {
      throw new HttpException(message, 500)
    }
  }
}
