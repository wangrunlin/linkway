export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Search Header Skeleton */}
      <div className="text-center mb-12">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-48 mx-auto mb-4" />
        <div className="max-w-2xl mx-auto">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar Skeleton */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-card rounded-lg border p-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="mb-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3" />
                <div className="space-y-2">
                  {[...Array(4)].map((_, j) => (
                    <div
                      key={j}
                      className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Skeleton */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-36" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 aspect-video rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 