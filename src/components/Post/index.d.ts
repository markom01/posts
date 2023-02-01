import { SxProps } from "@mui/material";
import { Comments, PostFull, PostPreview } from "../../../types";

export interface PostHeaderProps {
  picture: string;
  fullName: string;
  formattedDate: string;
  editable?: boolean;
  sx?: SxProps;
  comments?: Comments;
}

export interface PostBodyProps {
  post: PostPreview | PostFull;
  fullName: string;
  comments: Comments;
}

export interface PostFooterProps {
  likes: number;
  post: PostPreview | PostFull;
  comments: Comments;
}
