import { useRouteError } from "react-router-dom";

export default function Error() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <p>{error.statusText || error.message}</p>
    </div>
  );
}
