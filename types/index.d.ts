declare module "*.module";

export default interface Posts {
  data: PostPreview[];
  total: number;
  page: number;
  limit: number;
}
export interface PostPreview {
  id: string;
  image: string;
  likes: number;
  tags: string[];
  text: string;
  publishDate: string;
  updatedDate: string;
  owner: Owner;
}

export interface PostFull extends PostPreview {
  link: string;
}

export interface Comments {
  data: Comment[];
  total: number;
  page: number;
  limit: number;
}

export interface Comment {
  id: string;
  message: string;
  owner: Owner;
  post: string;
  publishDate: string;
}

export interface Owner {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface Division {
  amount: number;
  name: Intl.RelativeTimeFormatUnit;
}
