import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Req,
} from '@nestjs/common'
import { AuthService } from 'auth/auth.service'
import { Request } from 'express'
import { CreateFolderDTO } from './dto/folders.dto'
import { FoldersService } from './folders.service'

@Controller('folders')
export class FoldersController {
  constructor(
    private readonly foldersService: FoldersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async foldersByUserId(@Req() request: Request) {
    console.log('🚎 NO param!🙅🏻‍♂️: ')
    // console.log('💻 request cookies: ' /, request.cookies)
    try {
      const token = await this.authService.decodeToken(request.cookies['token'])
      console.log('💻 token extracted: ', token)
      return await this.foldersService.getAllFoldersByUserId(token['sub'])
    } catch ({ message }) {
      throw new HttpException(message, 500)
    }
    // return this.foldersService.getAllFoldersByUserId(id)
  }

  @Get('find/:folderId')
  async folderById(@Param('folderId') id: string) {
    console.log('🚎 with param!: ', id)
    return this.foldersService.getFolderById(id)
  }

  @Get('graphLookup/:folderId')
  async graphLookup(@Param('folderId') id: string) {
    console.log('🚎 with param!: ', id)
    return this.foldersService.findWithGraphLookup(id)
  }

  @Post()
  async create(@Body() folder: CreateFolderDTO, @Req() request: Request) {
    try {
      const userId = await this.authService.getUserIdByCookie(
        request.cookies['token'],
      )

      return await this.foldersService.createFolder({ userId, ...folder })
    } catch ({ message }) {
      throw new HttpException(message, 500)
    }
  }

  @Delete('test')
  async deleteAllTestFolders() {
    try {
      return this.foldersService.deleteAllTestFolders()
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }

  @Delete(':id')
  async deleteFolderById(@Param('id') id: string) {
    try {
      return this.foldersService.deleteFolder(id)
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }
}
