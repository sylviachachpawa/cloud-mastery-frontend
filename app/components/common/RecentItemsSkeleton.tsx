export const RecentItemsSkeleton = () => {
  return (
    <ul
      role="list"
      className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500 animate-pulse"
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="flex space-x-6 py-6">
          <div className="size-12 flex-none rounded-md bg-gray-200" />
          <div className="flex-auto space-y-2">
            <div className="h-4 w-3/4 rounded bg-gray-200" /> 
          </div>
          <div className="h-4 w-12 flex-none rounded bg-gray-200" />
        </li>
      ))}
    </ul>
  );
};
