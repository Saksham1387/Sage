import { NextResponse } from "next/server";
import { Client } from "@elastic/elasticsearch";

const es = new Client({
  node: "http://127.0.0.1:9200",
  auth: {
    username: "elastic",
    password: "123456",
  },
});

export async function POST(request: Request) {
  const { query } = await request.json();

  try {
    const response = await fetch(`http://127.0.0.1:5000/api/query?text=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    
    //@ts-ignore
    const formattedProducts = data.map(item => ({
      product_id: item.product_id,
      product_url: item.product_url_y || "", // Default to an empty string if NaN
      product_name: item.product_name_y || "Unknown Product", // Default to a placeholder if NaN
      product_description: item.product_description_y || "No description available", // Default to a placeholder if NaN
      product_images: item.product_images_y || [], // Default to an empty array if NaN
      product_price: item.product_price_y || "Price not available", // Default to a placeholder if NaN
      combined_score: item.combined_score || 0 // Default to 0 if NaN
    }));

    return NextResponse.json( data);
    
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ message: error });
  }
}
