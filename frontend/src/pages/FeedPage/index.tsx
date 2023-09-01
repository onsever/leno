import { useEffect } from "react";

export default function FeedPage() {
  useEffect(() => {
    document.title = "Secondhand fashion on Leno | Leno";
  }, []);

  return (
    <div>
      <h1>Feed Page</h1>
    </div>
  );
}
