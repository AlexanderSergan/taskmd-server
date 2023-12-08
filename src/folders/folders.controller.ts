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
    const { query, cookies, headers } = request
    console.log('👁️👁️ Got cookies: ', cookies)
    console.log('🚎 with query!: ', query['root'])
    console.log('🚎 with headers!: ', headers)
    let token

    if (headers['authorization']) {
      token = headers['authorization'].split(' ')[1]
    } else if (cookies['token']) {
      token = cookies['token']
    }

    // if (!cookies['token']) {
    //   console.log('🚨 No token in cookies')
    //   throw new HttpException('No token', 500)
    //   return
    // }

    try {
      const decoded = await this.authService.decodeToken(token)
      // console.log('💻 token extracted: ', token)
      return await this.foldersService.getAllFoldersByUserId(
        decoded['sub'],
        query['root'],
      )
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

  @Get('aggregate/:folderId')
  async aggregateFolderById(@Param('folderId') id: string) {
    console.log('🚎 with param!: ', id)
    return this.foldersService.aggregateFolderById(id)
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
