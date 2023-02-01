import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Comments as CommentsType,
  PostFull,
  PostPreview,
} from "../../../types";
import { useFormatDate, useFullName } from "../../hooks";
import Image from "../Image";
import Comments from "./Comment";
import { PostBodyProps, PostFooterProps, PostHeaderProps } from "./index.d";

export default function Post({
  post,
  comments,
}: {
  post: PostPreview | PostFull;
  comments?: CommentsType;
}) {
  const fullName = useFullName(post.owner);
  const formattedDate = useFormatDate(post.publishDate);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: { xs: comments ? "100%" : 300, sm: comments ? 700 : 350 },
        height: "100%",
      }}
      component="article"
    >
      <div>
        <PostHeader
          picture={post.owner.picture}
          formattedDate={formattedDate}
          fullName={fullName}
          comments={comments}
        />
        <PostBody post={post} fullName={fullName} comments={comments} />
      </div>
      <PostFooter post={post} likes={post.likes} comments={comments} />

      {comments && <Comments comments={comments} postId={post.id} />}
    </Card>
  );
}

export function PostHeader({
  picture,
  fullName = "Unknown",
  formattedDate = "Unknown",
  sx,
  editable = true,
  comments,
}: PostHeaderProps) {
  return (
    <CardHeader
      component="header"
      avatar={
        <Avatar>
          <Image
            attrs={{
              src: picture,
            }}
            fullName={fullName}
          />
        </Avatar>
      }
      action={
        comments &&
        editable && (
          <Link to="edit">
            <IconButton aria-label="settings">
              <EditIcon />
            </IconButton>
          </Link>
        )
      }
      title={
        <Typography sx={{ textTransform: "capitalize" }}>{fullName}</Typography>
      }
      subheader={formattedDate}
      sx={sx}
    />
  );
}

function PostBody({ post, fullName, comments }: PostBodyProps) {
  return (
    <main>
      <CardMedia
        component="img"
        height={comments ? 400 : 200}
        image={post.image}
        alt={`${fullName} post`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {post.text}
        </Typography>

        <Stack direction="row" spacing={1}>
          {post.tags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </Stack>
      </CardContent>
    </main>
  );
}

function PostFooter({ likes, comments, post }: PostFooterProps) {
  return (
    <Stack
      direction="row"
      sx={[
        {
          gap: 2,
          justifyContent: "space-between",
          alignItems: "center",
        },
        comments && { mb: 3 },
      ]}
      p={2}
      pt={0}
      spacing={2}
      component="footer"
    >
      <Typography mb={0}>{likes} likes</Typography>
      {comments ? (
        (post as PostFull).link && (
          <Button target="_blank" href={(post as PostFull).link}>
            Link
          </Button>
        )
      ) : (
        <Button>
          <Link to={`/${post.id}`}>More</Link>
        </Button>
      )}
    </Stack>
  );
}
