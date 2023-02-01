import { Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Posts, { PostPreview } from "../../types";
import Post from "../components/Post";
import Context from "../Context";
import fetchPosts from "../hooks";

export default function Home() {
  const loadedPosts = useLoaderData() as Posts;
  const [posts, setPosts] = useContext(Context);
  useEffect(() => {
    if (!posts) setPosts(loadedPosts);
  }, []);

  return (
    <Grid
      container
      spacing={2}
      justifyContent={{ xs: "center", lg: "flex-start" }}
    >
      {posts?.data.map((post: PostPreview) => (
        <Grid key={post.id} item>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
}

export async function loader() {
  return await fetchPosts({});
}
