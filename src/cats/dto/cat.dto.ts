export interface CreateCatDTO {
  name: string;
  age: number;
  breed: string;
  friends: string[];
}

export interface UpdateCatDTO {
  name?: string;
  age?: number;
  breed?: string;
  friends?: string[];
}
