export default function Skeleton() {
  return (
    <div className="space-y-4">
      <div className="h-6 bg-gray-300 animate-pulse w-32"></div>
      <ul className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="h-4 bg-gray-200 animate-pulse w-48"></li>
        ))}
      </ul>
    </div>
  );
}
