// export default function Example({ products }: { products: any[] }) {
//   const cleanImageUrl = (url: string) => {
//     return url
//       .replace("https:/", "https://") // Ensure correct protocol
//       .replace(/['"\[\]]/g, ""); // Remove unwanted characters like brackets or quotes
//   };

//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//         <h2 className="text-2xl font-bold tracking-tight text-gray-900">
//           Products
//         </h2>

//         <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//           {Array.isArray(products) && products.length > 0 ? (
//             products.map((product) => {
//               const productData = product || {};
//               const {
//                 product_name_y,
//                 product_url_y,
//                 product_images_y,
//                 product_description_y,
//                 product_price_y,
//               } = productData;

//               const cleanImages =
//                   //@ts-ignore
//                 product_images_y?.map((image) => cleanImageUrl(image)) || [];

//               return (
//                 <div
//                   key={productData.product_id || Math.random()}
//                   className="group relative"
//                 >
//                   <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
//                     {cleanImages.length > 0 ? (
//                       <img
//                         alt={product_name_y || "Product image"}
//                         src={cleanImages[0]}
//                         className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//                       />
//                     ) : (
//                       <div className="h-full w-full bg-gray-300 flex items-center justify-center">
//                         <span>No Image</span>
//                       </div>
//                     )}
//                   </div>
//                   <div className="mt-4 flex justify-between">
//                     <div>
//                       <h3 className="text-sm text-gray-700">
//                         {product_name_y ? (
//                           <a
//                             href={product_url_y}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
//                             <span
//                               aria-hidden="true"
//                               className="absolute inset-0"
//                             />
//                             {product_name_y}
//                           </a>
//                         ) : (
//                           <span>Unknown Product</span>
//                         )}
//                       </h3>
//                       <p className="mt-1 text-sm text-gray-500">
//                         {product_description_y
//                           ? product_description_y.length > 100 // Set the character limit, e.g., 100
//                             ? `${product_description_y.slice(0, 50)}...` // Trim and append ellipsis
//                             : product_description_y
//                           : "No description available"}
//                       </p>
//                     </div>
//                     <p className="text-sm font-medium text-gray-900">
//                       {product_price_y
//                         ? `$${product_price_y}`
//                         : "Score not available"}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div>No products available</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react"; // Tailwind Heroicons for the dropdown arrow

export default function Example({ products }: { products: any[] }) {
  const [sortedProducts, setSortedProducts] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState("default"); // "default", "lowToHigh", or "highToLow"

  // Store the original product list
  const originalProducts = products || [];

  // Initialize sortedProducts when products prop changes
  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setSortedProducts(products);
    }
  }, [products]);

  // Function to clean image URLs
  const cleanImageUrl = (url: string) => {
    return url
      .replace("https:/", "https://") // Ensure correct protocol
      .replace(/['"\[\]]/g, ""); // Remove unwanted characters like brackets or quotes
  };

  // Sort function
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOrder(value);

    if (value === "default") {
      // Reset to the original products
      setSortedProducts(originalProducts);
    } else {
      const sorted = [...sortedProducts].sort((a, b) => {
        const priceA = parseFloat(a.product_price_y) || 0;
        const priceB = parseFloat(b.product_price_y) || 0;

        return value === "lowToHigh" ? priceA - priceB : priceB - priceA;
      });

      setSortedProducts(sorted);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Products
          </h2>

          {/* Sort by Price Dropdown */}
          <div className="relative inline-block">
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="default">Relevancy</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>

            {/* Dropdown Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Array.isArray(sortedProducts) && sortedProducts.length > 0 ? (
            sortedProducts.map((product) => {
              const productData = product || {};
              const {
                product_name_y,
                product_url_y,
                product_images_y,
                product_description_y,
                product_price_y,
              } = productData;

              const cleanImages =
                //@ts-ignore
                product_images_y?.map((image) => cleanImageUrl(image)) || [];

              return (
                <div
                  key={productData.product_id || Math.random()}
                  className="group relative"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    {cleanImages.length > 0 ? (
                      <img
                        alt={product_name_y || "Product image"}
                        src={cleanImages[0]}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                        <span>No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        {product_name_y ? (
                          <a
                            href={product_url_y}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product_name_y}
                          </a>
                        ) : (
                          <span>Unknown Product</span>
                        )}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product_description_y
                          ? product_description_y.length > 100
                            ? `${product_description_y.slice(0, 50)}...`
                            : product_description_y
                          : "No description available"}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product_price_y
                        ? `$${product_price_y}`
                        : "Price not available"}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No products available</div>
          )}
        </div>
      </div>
    </div>
  );
}