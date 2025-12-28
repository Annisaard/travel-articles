export interface ArticlePayload {
  data: {
    title: string;
    description: string;
    cover_image_url: string;
    category: number;
  };
}

export type ArticleQueryParams = {
  "pagination[page]"?: number;
  "pagination[pageSize]"?: number;
  "populate[comments][populate][user]"?: string;
  "populate[user]"?: string;
  "populate[category]"?: string;
  populate?: string;
  "filters[title][$eqi]"?: string;
  "filters[category][name][$eqi]"?: string;
};

export interface ArticleResponseType {
  data: ArticleType[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}
export interface ArticleType {
  id: number;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  user: UserType;
  category: CategorType;
  comments: Comment[];
  localizations: Localization[];
}
export interface UserType {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

export interface CategorType {
  id: number;
  documentId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

export interface Comment {
  // masih kosong di response
  // isi nanti kalau struktur comment sudah jelas
}

export interface Localization {
  // masih kosong di response
}
