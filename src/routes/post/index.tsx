import { useContext, useEffect, useState } from "react";
import { Params, useLoaderData } from "react-router-dom";
import { Comments, PostFull, PostPreview } from "../../../types";
import PostItem from "../../components/Post";
import Context from "../../Context";
import fetchPosts from "../../hooks";

export default function Post() {
  const { loadedPost, comments } = useLoaderData() as {
    loadedPost: PostFull;
    comments: Comments;
  };
  const [posts, setPosts] = useContext(Context);

  const [updatedPost, setUpdatedPost] = useState<PostFull>(loadedPost);

  // loadedPost
  useEffect(() => {
    setUpdatedPost(
      posts?.data.find(
        (item: PostPreview) => item.id === loadedPost.id
      ) as PostFull
    );
  }, []);

  return <PostItem post={updatedPost} comments={comments} />;
}

export async function loader({ params }: { params: Params }) {
  const loadedPost = await fetchPosts({ id: params.id });
  const comments = await fetchPosts({ id: params.id, comments: true });
  return {
    loadedPost,
    comments,
  };
}
