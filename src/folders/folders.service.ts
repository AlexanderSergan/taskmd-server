import { Injectable } from '@nestjs/common'
import { Folder } from 'schemas/folder.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateFolderDTO } from './dto/folders.dto'

@Injectable()
export class FoldersService {
  constructor(@InjectModel(Folder.name) private folderModel: Model<Folder>) {}

  async getAllFoldersByUserId(userId): Promise<Folder[]> {
    console.log('💻 getAllFolderByUserId: ', userId)
    return await this.folderModel.find({ userId: userId }).exec()
  }

  async getFolderById(id: string): Promise<any> {
    console.log('💻 getFolderById: ', id)

    return this.folderModel.find({ _id: id }).exec()

    // return await this.folderModel.findById(id).exec()
  }

  async createFolder(folder: CreateFolderDTO): Promise<Folder> {
    const createdAt = new Date()
    const newFolder = new this.folderModel({ ...folder, createdAt })
    const saved = await newFolder.save()
    return saved
  }

  async findWithGraphLookup(id: string) {
    console.log('Aggregation start by id: ', id)
    return await this.folderModel
      .aggregate([
        {
          $match: {
            // _id: '655b79061f121161f32de324',
            // name: 'test1',
            parent: 'root',

            // userId: '653e86536373ce6173b10f8e',
            // userId: '653e86536373ce6173b10f8e',
          },
        },
        {
          $graphLookup: {
            from: 'folders',
            startWith: '$_id',
            connectFromField: '_id',
            connectToField: 'parent',
            as: 'subs',
            depthField: 'depthIndex',
            maxDepth: 100,
            restrictSearchWithMatch: {
              path: 'root',
            },
          },
        },
      ])
      .exec()
  }

  async deleteFolder(folderId: string) {
    return await this.folderModel.findByIdAndDelete(folderId).exec()
  }

  /**
   * Delete all folders which name starts with 'test-'
   *
   * @memberof FoldersService
   */
  async deleteAllTestFolders() {
    return await this.folderModel
      .deleteMany({ name: { $regex: /^test-/ } })
      .exec()
  }
}
