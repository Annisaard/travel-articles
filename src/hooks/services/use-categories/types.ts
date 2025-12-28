export interface CategoryResponse {
  data: {
    id: number;
    documentId: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: null;
  }[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}

export interface CategoryPayload {
  data: {
    name: string;
    description?: string | null;
  };
}
