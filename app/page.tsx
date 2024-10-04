"use client";
import Example from "@/Components/product";
import { useState, useEffect } from "react";
import { Navbar } from "@/Components/navbar";
export default function Home() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (query.trim() === "") {
      setProducts([]); 
      return;
  }

  const fetchProducts = async () => {
      try {
        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }), 
        });

        const data = await response.json();
        console.log(data);
        setProducts(data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [query]); 

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex items-center justify-center mt-16">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for products..."
          className="text-black rounded-xl border-gray-300 p-5 w-[500px] border-2"
        />
      </div>

      <Example products={products} />
    </div>
  );
}

// "use client";
// import Example from "@/Components/product";
// import { useState, useEffect } from "react";
// import { Navbar } from "@/Components/navbar";

// export default function Home() {
//   const [query, setQuery] = useState("");
//   const [debouncedQuery, setDebouncedQuery] = useState(query);
//   const [products, setProducts] = useState([]);

//   // Debounce effect
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedQuery(query);
//     }, 300); // Set debounce delay here (300ms)

//     return () => {
//       clearTimeout(handler); // Cleanup timeout on unmount or query change
//     };
//   }, [query]);

//   // useEffect to send a request when debouncedQuery changes
//   useEffect(() => {
//     if (debouncedQuery.trim() === "") {
//       setProducts([]); // Clear products if debounced query is empty
//       return;
//     }

//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("/api/search", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ query: debouncedQuery }), // Send debounced query in the request body
//         });

//         const data = await response.json();
//         setProducts(data); // Update the products state with the fetched data
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, [debouncedQuery]); // Trigger effect when debouncedQuery changes

//   return (
//     <div>
//       <Navbar />
//       <div className="flex items-center justify-center mt-16">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)} // Update query state on input change
//           placeholder="Search for products..."
//           className="text-black rounded-xl border-gray-300 p-5 w-[500px] border-2"
//         />
//       </div>

//       {/* Render the Example component and pass products as props */}
//       <Example products={products} />
//     </div>
//   );
// }
