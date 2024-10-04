# Sage AI - Natural Language Recommendation System

![Sage AI Screenshot](./public/Screenshot 2024-10-04 at 11.38.12.png)

**Sage AI** is an intelligent recommendation system that uses various AI techniques to provide personalized suggestions based on natural language inputs. This application leverages the power of AI to semantically understand user queries and offer recommendations in a user-friendly interface.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Backend Proxy](#backend-proxy)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Natural Language Processing:** Sage AI processes user input using advanced AI models to extract meaning and context.
- **Recommendation Engine:** Provides personalized recommendations based on the user’s query and intent.
- **AI Techniques:** Utilizes a mix of machine learning models, semantic search, and recommendation algorithms.
- **User-Friendly Interface:** Built using Next.js for an optimized and responsive user experience.

## Project Structure

sage-ai/
├── backend-proxy/
│   └── main.py           # Python backend handling the recommendation logic
├── components/           # UI components for the Next.js frontend
├── pages/                # Next.js pages (home, about, recommendations, etc.)
├── public/               # Static assets (images, fonts, etc.)
├── styles/               # Global CSS and styling
├── README.md             # Project documentation
├── package.json          # Project dependencies and scripts
├── .env.local            # Environment variables for Next.js app
└── …                   # Other Next.js specific files

## Technologies Used

- **Frontend:**
  - [Next.js](https://nextjs.org/) - React framework for building server-rendered web apps
  - Tailwind CSS - Utility-first CSS framework for styling

- **Backend:**
  - **Python** - Language used for the recommendation engine
  - **FastAPI** - For building REST APIs in `backend-proxy/main.py`
  - **AI Techniques:** NLP models, semantic search, recommendation algorithms

## Getting Started

### Prerequisites

- **Node.js** and **npm** (or **yarn**) installed on your machine
- **Python 3.9+**
- **Virtual Environment** tools such as `venv` or `virtualenv` (recommended)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/sage-ai.git
   cd sage-ai

	2.	Install frontend dependencies:

npm install


	3.	Set up environment variables:
Create a .env.local file in the root directory and add the necessary environment variables for your Next.js app.
	4.	(Optional) Install Python dependencies for the backend:
Navigate to the backend-proxy folder:

cd backend-proxy

Create a virtual environment and install the dependencies:

python3 -m venv venv
source venv/bin/activate  # For Linux/macOS
venv\Scripts\activate  # For Windows

pip install -r requirements.txt



Backend Proxy

The backend for Sage AI is located in the backend-proxy directory, where the core recommendation logic is written in Python. This backend serves as a proxy to handle requests from the Next.js frontend and provide AI-powered recommendations.

	•	File Structure:
	•	main.py: Contains the FastAPI code that handles user requests and routes them to the recommendation engine.
	•	Starting the Backend:

cd backend-proxy
source venv/bin/activate  # Activate your virtual environment
uvicorn main:app --reload

This will start the backend server locally, running at http://localhost:8000.

Running the Application

Running the Frontend

To run the Next.js frontend, use:

npm run dev

This will start the development server at http://localhost:3000.

