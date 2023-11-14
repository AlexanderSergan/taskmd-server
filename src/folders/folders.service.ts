import { Injectable } from '@nestjs/common'
import { Folder } from 'schemas/folder.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateFolderDTO } from './dto/folders.dto'

@Injectable()
export class FoldersService {
  constructor(@InjectModel(Folder.name) private folderModel: Model<Folder>) {}

  async getAllFolders(userId): Promise<Folder[]> {
    return await this.folderModel.find({ userId: userId }).exec()
  }

  async createFolder(folder: CreateFolderDTO): Promise<Folder> {
    const createdAt = new Date()
    const newFolder = new this.folderModel({ ...folder, createdAt })
    const saved = await newFolder.save()
    return saved
  }
}
