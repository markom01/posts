import { Box, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PostHeader } from ".";
import { Comments, PostPreview } from "../../../types";
import { useFormatDate, useFullName } from "../../hooks";
import Input, { InputProps, Inputs } from "../Input";

export default function Comments({
  comments,
  postId,
}: {
  comments: Comments;
  postId: PostPreview["id"];
}) {
  const [allComments, setAllComments] = useState(comments.data);

  return (
    <Box px={2}>
      {allComments.length !== 0 && (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" component="h2">
            Comments
          </Typography>
          {allComments.map((comment, i) => {
            const fullName = useFullName(comment.owner);
            const formattedDate = useFormatDate(comment.publishDate);

            return (
              <Box component={"article"} key={comment.id + i}>
                <PostHeader
                  formattedDate={formattedDate}
                  fullName={fullName}
                  picture={comment.owner.picture}
                  sx={{ pl: 0 }}
                  editable={false}
                />
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {comment.message}
                </Typography>
              </Box>
            );
          })}
        </Box>
      )}
      <NewComments setAllComments={setAllComments} postId={postId} />
    </Box>
  );
}

interface NewCommentsProps {
  setAllComments: Dispatch<SetStateAction<Comments["data"]>>;
  postId: PostPreview["id"];
}

function NewComments({ setAllComments, postId }: NewCommentsProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setAllComments((prev) => [
      ...prev,
      {
        message: data["Message"],
        owner: {
          firstName: data["First Name"],
          lastName: data["Last Name"],
          picture: "",
          title: data["Title"],
          id: "4",
        },
        id: "4",
        publishDate: new Date().toISOString(),
        post: postId,
      },
    ]);
  };

  const newComments: InputProps["data"][] = [
    {
      label: "Title",
      options: {
        required: "Title is required",
        pattern: {
          value: /^(mr|ms|mrs|miss|dr|)$/i,
          message: "Please enter: mr, ms, mrs, miss or dr",
        },
      },
    },
    {
      label: "First Name",
      options: {
        required: true,
      },
      fullWidth: true,
    },
    {
      label: "Last Name",
      options: {
        required: true,
      },
      fullWidth: true,
    },
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" component="h2" pb={2}>
        Add Comment
      </Typography>
      <Stack
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <Stack gap={2} direction={{ sm: "row" }}>
          {newComments.map((data) => {
            return (
              <Input
                key={data.label}
                data={data}
                register={register}
                errors={errors}
              />
            );
          })}
        </Stack>
        <Input
          data={{
            label: "Message",
            multiline: true,
          }}
          register={register}
          errors={errors}
        />

        <Stack gap={2} direction={{ sm: "row" }}>
          {/* <UploadImage fullWidth setNewComment={setNewComment} /> */}

          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

// function UploadImage({
//   fullWidth,
// }: {
//   fullWidth?: boolean;
// }) {
//   return (
//     <Button
//       fullWidth={fullWidth}
//       variant="outlined"
//       component="label"
//       startIcon={<PhotoCamera />}
//     >
//       Add Image
//       <input
//         accept="image/*"
//         hidden
//         type="file"
//         onChange={(e: ChangeEvent<HTMLInputElement>) => {
//
//         }}
//       />
//     </Button>
//   );
// }
