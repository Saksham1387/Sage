import { Client } from "@elastic/elasticsearch";

// Connect to Elasticsearch with authentication
const es = new Client({
  node: "http://localhost:9200",
  auth: {
    username: "elastic",
    password: "123456", // Replace with your actual credentials
  },
});

// Function to search for a specific product by name or other criteria
async function searchProduct(indexName: string, searchTerm: string) {
  const query = {
    query: {
      multi_match: {
        query: searchTerm,
        fields: ["product_name", "product_url", "description"], // Specify fields to search
      },
    },
  };

  try {
    // Perform the search
    const response = await es.search({
      index: indexName,
      body: query,
    });

    return response.hits.hits; // Return the search hits
  } catch (error) {
    console.error(`Error searching for product: ${error}`);
    return [];
  }
}

// Example usage
const searchTerm = "i want a blue tshirt"; // Replace with the product name or term you want to search for

searchProduct("products", searchTerm).then((productsFound) => {
  console.log(JSON.stringify(productsFound, null, 4));
});
