from flask import Flask, jsonify, request
import json
from elasticsearch import Elasticsearch
import numpy as np
from sklearn.decomposition import PCA
import joblib
import pandas as pd
import faiss
from sentence_transformers import SentenceTransformer

app = Flask(__name__)

es = Elasticsearch(
    "http://localhost:9200",
    basic_auth=("elastic", "123456")  # Replace with your actual credentials
)

df = pd.read_csv('Dataset-final.csv')
def process_binary_hashes(binary_hash_str):
    return np.array(list(map(int, binary_hash_str.strip())), dtype=np.uint8)

df['binary_code'] = df['binary_hash'].apply(process_binary_hashes)

binary_codes = np.vstack(df['binary_code'].values)

def pack_binary_codes(binary_codes):
    binary_codes_packed = np.packbits(binary_codes, axis=1)

    return binary_codes_packed

binary_codes_packed = pack_binary_codes(binary_codes)

# 3. Build the binary index
num_bits = binary_codes.shape[1]
index = faiss.IndexBinaryFlat(num_bits)
index.add(binary_codes_packed)

index_name = 'products2'  # Your existing index name
pca = joblib.load('pca_model.joblib')
rotation_matrix = np.load('rotation_matrix.npy')
embeddings_mean = np.load('embeddings_mean.npy')
embedding_model = SentenceTransformer('all-mpnet-base-v2')

def query_to_hashed_vector(query):
    """
    Convert query text to a hashed vector using the same process as the dataset.

    Args:
        query (str): The search query text.

    Returns:
        binary_code_list (list): The binary hash code of the query as a list of integers.
    """
    # Step 1: Generate the embedding
    query_embedding = embedding_model.encode(query)

    # Step 2: Apply PCA transformation
    query_embedding_pca = pca.transform([query_embedding])[0]

    # Step 3: Zero-center the embedding using embeddings_mean from the dataset
    centered_query_embedding = query_embedding_pca - embeddings_mean

    # Step 4: Apply the ITQ rotation
    rotated_query_embedding = np.dot(centered_query_embedding, rotation_matrix)

    # Step 5: Binarize (quantize)
    binary_code = (rotated_query_embedding > 0).astype(int)

    # Convert binary code to list of integers
    binary_code_list = binary_code.tolist()

    return binary_code_list


def keyword_search(query_text, index_name):
    # Perform the keyword search
    keyword_query = {
        "query": {
            "multi_match": {
                "query": query_text,
                "fields": [
                    "product_name",  # Boost product_name field
                    "product_description^3"
                ],
                # "analyzer": "your_custom_analyzer",  # Uncomment if using a custom analyzer
                "type": "best_fields"
            }
        }
    }
    
    keyword_response = es.search(index=index_name, body=keyword_query)
    return keyword_response

def semantic_search_hash(query, index, df, k=10):
    query_hash = query_to_hashed_vector(query)
    
    # Convert the binary code list to a numpy array with dtype uint8
    query_hash = np.array(query_hash, dtype=np.uint8)
    
    # Ensure it's packed like the dataset hashes
    query_hash_packed = np.packbits(query_hash)
    query_hash_packed = np.expand_dims(query_hash_packed, axis=0)

    # Perform the search
    distances, indices = index.search(query_hash_packed, k)
    
    # Retrieve the results
    results = df.iloc[indices[0]].copy()
    results['hamming_distance'] = distances[0]
    
    # Compute similarity (based on hamming distance)
    max_distance = num_bits
    results['similarity'] = 1 - (results['hamming_distance'] / max_distance)
    
    return results

def hybrid_search_hash(query, index, df, k=10, alpha=0.7):
    # Perform the semantic search
    semantic_results = semantic_search_hash(query, index, df, k)
    semantic_results['semantic_score'] = semantic_results['similarity']
    
    # Reformat the semantic results to match keyword format
    semantic_results = semantic_results.rename(columns={'Producturl': 'product_url', 'name': 'product_name', 'price': 'product_price', 'description': 'product_description', 'images': 'product_images'})
    # Perform the keyword search and structure the output into a DataFrame
    
    keyword_results = keyword_search(query, index_name)
    

    # Print the formatted JSON
    

    
    
    # Extract relevant fields from keyword search results
    keyword_hits = keyword_results['hits']['hits']
    keyword_data = [
        {
            'product_id': hit['_source']['product_id'],
            'product_url': hit['_source']['product_url'],
            'product_price': hit['_source']['price'],
            'product_name': hit['_source'].get('product_name', ''),
            'product_description': hit['_source'].get('product_description', ''),
            'product_images': hit['_source'].get('images', []),  # Include images
            'keyword_score': hit['_score']
        } 
        for hit in keyword_hits
    ]
    
    # Convert keyword search results into a DataFrame
    keyword_df = pd.DataFrame(keyword_data)
    
    # Merge the semantic and keyword results by product_id
    combined = pd.merge(semantic_results, keyword_df, on='product_id', how='outer')
    
    # Fill missing scores for keyword and semantic
    combined['semantic_score'] = combined['semantic_score'].fillna(0)
    combined['keyword_score'] = combined['keyword_score'].fillna(0)
    
    # Calculate the combined score
    combined['combined_score'] = alpha * combined['semantic_score'] + (1 - alpha) * combined['keyword_score']
    
    # Sort by combined score and return top k results
    combined = combined.sort_values(by='combined_score', ascending=False)
    
    return combined.head(k)








@app.route('/')
def home():
    return "Welcome to my Flask App!"

# Define a route that returns JSON
@app.route('/api/query', methods=['GET'])
def query_process():
    query = request.args.get('text', default="", type=str)
    results = hybrid_search_hash(query, index, df, k=10, alpha=0.7)
    columns_to_keep = [
    "product_id", "product_url_y", "product_name_y", "product_description_y", 
    "product_images_y", "keyword_score", "combined_score","product_price_y"
    ]


    filtered_results = results[columns_to_keep]


    filtered_results_dict = filtered_results.to_dict(orient='records')


    filtered_results_json = json.dumps(filtered_results_dict, indent=4) 

    return filtered_results_json



if __name__ == '__main__':
    app.run(debug=True)