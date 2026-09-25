import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container not-found">
      <p className="eyebrow">404 · A little off the garden path</p>
      <h1>
        This one hasn’t
        <br />
        <em>bloomed here.</em>
      </h1>
      <p>The page you’re looking for is unavailable.</p>
      <Link href="/flowers" className="button">
        Back to the flowers
      </Link>
    </div>
  );
}
