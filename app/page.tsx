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


  useEffect(() => {
  const fetchProducts = async () => {
      try {
        const query1 = "jeans shirt t-shirt dress"
        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query:query1 }), 
        });

        const data = await response.json();
        console.log(data);
        setProducts(data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); 

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
