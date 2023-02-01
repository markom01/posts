import { TextField, TextFieldProps } from "@mui/material";
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  useForm,
} from "react-hook-form";

export interface InputProps {
  data: {
    label: string;
    options?: RegisterOptions<FieldValues, string>;
    fullWidth?: boolean;
    multiline?: TextFieldProps["multiline"];
    rows?: TextFieldProps["rows"];
    defaultValue?: TextFieldProps["defaultValue"];
    type?: TextFieldProps["type"];
  };
  register: ReturnType<typeof useForm>["register"];
  errors: FieldErrors<Inputs>;
}

export interface Inputs {
  [key: string]: string;
}

export default function Input({
  data: {
    label,
    options,
    fullWidth = false,
    multiline = false,
    defaultValue = "",
    rows = 1,
    type = "text",
  },
  register,
  errors,
}: InputProps) {
  return (
    <TextField
      label={label}
      {...register(label, options)}
      error={!!errors[label]?.message}
      helperText={errors[label]?.message}
      fullWidth={fullWidth}
      required={!!options?.required ?? false}
      multiline={multiline}
      defaultValue={defaultValue}
      rows={rows}
      type={type}
    />
  );
}
