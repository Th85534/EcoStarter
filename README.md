# EcoStarter

EcoStarter is a web application designed to help individuals adopt a more sustainable lifestyle. It provides personalized eco-friendly recommendations, tracks carbon footprints, and connects users with a community of like-minded individuals.

## Features

- **Personalized Plan**: Get a customized eco-friendly lifestyle plan based on your habits and goals.
- **Daily Challenges**: Complete fun and meaningful eco-challenges to build sustainable habits.
- **Community Support**: Join a community of eco-conscious individuals sharing tips and experiences.
- **Impact Tracking**: Measure and visualize your environmental impact over time.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication)
- **APIs**: Cloudinary for image uploads, Google Generative AI for lifestyle analysis

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/EcoStarter.git
    cd EcoStarter
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add your Firebase and Cloudinary configuration:
    ```env
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_firebase_app_id
    VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
    VITE_GEMINI_API_KEY=your_gemini_api_key
    ```

### Running the App

1. Start the development server:
    ```sh
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `src/components`: Reusable components
- `src/pages`: Application pages
- `src/store`: Zustand stores for state management
- `src/lib`: Utility libraries and API integrations
- `src/config`: Configuration files

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgements

- Icons by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Hosted on [Vercel](https://vercel.com/)
