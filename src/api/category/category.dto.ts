export interface CreateCategoryDTO {
  name: string;
  thumbnail: string;
  status: 'active' | 'inactive';
}

export interface updateCategoryDTO {
  name?: string;
  thumbnail?: string;
  status?: 'active' | 'inactive';
}
