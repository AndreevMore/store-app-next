const ProductCardSkeleton = () => {
  return (
    <div className="m-4">
      <div className="w-full rounded-lg border border-gray-700 p-6 shadow-lg dark:border-gray-300">
        <div className="product-card flex animate-pulse">
          <div className="relative mr-4 h-[200px] w-[200px] flex-shrink-0 rounded-md bg-gray-300"></div>
          <div className="flex-1 space-y-2">
            <div className="h-6 w-3/4 rounded bg-gray-300"></div>
            <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            <div className="h-4 w-full rounded bg-gray-200"></div>
            <div className="h-4 w-1/3 rounded bg-gray-200"></div>
            <div className="h-4 w-1/4 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
