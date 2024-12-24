# jbook

## Getting Started

This is a Vite and NodeJs application.

### Prerequisites

Make sure you have the following installed on your machine:
- Node.js (v14 or higher)
- npm (v6 or higher)

## How to Run the App

1. **Install Node.js and npm**: Ensure you have Node.js and npm installed on your machine. You can download and install them from [nodejs.org](https://nodejs.org/).

2. **Clone the Repository**: Clone the repository containing the Vite Node.js app to your local machine using the following command:
    ```sh
    git clone https://github.com/jbricenoz/jbook.git
    ```

3. **Navigate to the Project Directory**: Change your current directory to the project directory:
    ```sh
    cd jbook
    ```

4. **Install Dependencies**: Install the required dependencies using npm:
    ```sh
    npm install
    ```

5. **Update Environment Variables**: Create a `.env` file in the root of the project directory and add any necessary environment variables. Refer to the `.env.example` file for the required variables and their formats.
    ```sh
    cp .env.example .env
    # Edit the .env file to include your specific environment variables
    ```
    Do not forget that this step might require to run the Supabase migrations in you local workspace to set the database. 

6. **Run the Development Server**: Start the development server using Vite:
    ```sh
    npm run dev
    ```

7. **Open the App in Your Browser**: Once the development server is running, open your browser and navigate to the URL provided in the terminal (usually `http://localhost:<port>` or `http://localhost:5173/`).

8. **Default users [Accounts will just available for 15 days.]**: 
    ```
    test@abatoolbox.com/test123 [Empty Account]
    joshua@jbook.com/test123 [Empty Account] 
    ```

8. **Or check the live preview in free netlify account**:
    ```
    https://joshuabriceno-remotely.netlify.app/
    ```

9. **Build for Production**: To build the app for production, run:
    ```sh
    npm run build
    ```

10. **Preview the Production Build**: To preview the production build locally, run:
    ```sh
    npm run serve
    ```

11. **Additional Scripts**: The project may include additional npm scripts for testing, linting, etc. Refer to the `package.json` file for more details.

# Note [Warnings]
The Application iw not fully completed in regards test-automation ready, accessibility, seo engine optimizations and Google LightHouse optimization. is focused in the functional aspects of the requirements. 