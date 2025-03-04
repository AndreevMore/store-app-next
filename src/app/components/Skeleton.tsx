export default function Skeleton() {
  return (
    <div className="space-y-4">
      <div className="h-6 w-32 animate-pulse bg-gray-300"></div>
      <ul className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="h-4 w-48 animate-pulse bg-gray-200"></li>
        ))}
      </ul>
    </div>
  );
}
