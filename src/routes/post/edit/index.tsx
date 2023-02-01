import { Button, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { PostFull, PostPreview } from "../../../../types";
import Input, { InputProps, Inputs } from "../../../components/Input";
import Context from "../../../Context";

export default function Edit() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();

  const { loadedPost } = useLoaderData() as {
    loadedPost: PostFull;
  };
  const [posts, setPosts] = useContext(Context);

  const [updatedPost, setUpdatedPost] = useState<PostFull>(loadedPost);
  useEffect(() => {
    setUpdatedPost(
      posts?.data.find(
        (item: PostPreview) => item.id === loadedPost.id
      ) as PostFull
    );
  }, []);

  const fields: InputProps["data"][] = [
    {
      label: "Message",
      fullWidth: true,
      multiline: true,
      rows: 5,
    },
    {
      label: "Likes",
      type: "number",
    },
  ];

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setUpdatedPost((prev) => {
      return { ...prev, text: data.Message, likes: +data.Likes };
    });
    console.log(updatedPost);
    // const json = await fetchPosts({
    //   id: post.id,
    //   method: "PUT",
    //   body: updatedPost,
    // });
    setPosts((prev) => {
      const newPosts = prev?.data.map((item) => {
        if (item.id === loadedPost.id) {
          return updatedPost;
        }
        return item;
      });
      return { ...prev, data: newPosts };
    });
    // navigate(`/`);
  };

  return (
    <Stack
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      spacing={2}
      noValidate
      autoComplete="off"
    >
      {fields.map((field) => (
        <Input
          key={field.label}
          data={field}
          register={register}
          errors={errors}
        />
      ))}
      <Button type="submit" variant="contained">
        {/* bug: data is updated only if clicked twice */}
        Submit
      </Button>
    </Stack>
  );
}
