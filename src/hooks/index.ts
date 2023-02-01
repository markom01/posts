import { Division, Owner, PostFull, PostPreview } from "../../types";

export default async function fetchPosts({
  id,
  comments,
  method,
  body,
  params,
}: {
  id?: PostPreview["id"];
  comments?: boolean;
  method?: RequestInit["method"];
  params?: {
    [key: string]: string;
  };
  body?: PostFull;
}) {
  const url = new URL("https://dummyapi.io/data/v1/post");
  if (id) {
    url.pathname += `/${id}`;
    if (comments) {
      url.pathname += `/comment`;
    }
  } else {
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    url.searchParams.append("limit", "5");
  }
  // console.log(url);
  const headers = new Headers();
  headers.append("app-id", "63d945760ac47d34ae420e25");
  const options = {
    method: method || "GET",
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const res = await fetch(url, options);
    // console.log(res);
    const json = await res.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

export function useFormatDate(date: string) {
  const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: "auto",
  });

  const DIVISIONS: Division[] = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
  ];

  let duration = (new Date(date).getTime() - new Date().getTime()) / 1000;

  for (let i = 0; i <= DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
}

export function useFullName({ title, firstName, lastName }: Owner) {
  return `${title}. ${firstName} ${lastName}`;
}
