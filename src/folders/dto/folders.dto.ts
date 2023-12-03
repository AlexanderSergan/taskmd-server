export interface CreateFolderDTO {
  userId: string
  name: string
  notesCount: number
  editable: boolean
  path: string
  notes: any[]
  subfolders: CreateFolderDTO[]
  parent?: string
}
