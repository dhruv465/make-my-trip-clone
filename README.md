 ## Getting Started

                            To clone this repository from GitHub, follow these steps:

                            1. Open your terminal or command prompt.
                            2. Navigate to the directory where you want to clone the repository.
                            3. Run the following command to clone the repository:

                                ```
                               https://github.com/dhruv465/make-my-trip-clone.git
                                ```

                                Replace `your-username` with your GitHub username and `your-repo` with the name of the repository you want to clone.

                            4. Once the cloning process is complete, navigate into the cloned repository:

                                ```
                                cd client/server
                                ```

                            5. You can now start working with the code in your local environment.

                            ## Installing Dependencies

                            Before running the project, make sure to install the necessary dependencies. In the root directory of the cloned repository, run the following command:

                            ```
                            npm install
                            ```

                            This will install all the required dependencies specified in the `package.json` file.


                            ## Adding Environment Variables

                            To run the project successfully, you need to add environment variables to both the frontend and backend. Follow the instructions below to add the `.env` file to each:

                            ### Frontend

                            1. Navigate to the `client` directory in the cloned repository.
                            2. Create a new file named `.env` in the `client` directory.
                            3. Open the `.env` file in a text editor.
                            4. Add the following lines to the `.env` file:

                            ```
                            REACT_APP_GOOGLE_CLIENT_ID= Add your Google Client ID 
                            REACT_APP_BACKEND_URL=Add your Backend link 
                            ```

                            5. Save the `.env` file.

                            ### Backend

                            1. Navigate to the `server` directory in the cloned repository.
                            2. Create a new file named `.env` in the `server` directory.
                            3. Open the `.env` file in a text editor.
                            4. Add the following lines to the `.env` file:

                            ```
                            PORT=8080 {Your actual port number}
                            FRONTEND_URL=http://localhost:3000 {Your frontend url}
                            MONGO_URI= Your mongodb url
                            REACT_APP_GOOGLE_CLIENT_ID=Add your Google Client ID 
                            JWT_SECRET='Your jwt secret key'
                            EMAIL_USERNAME= Your email id
                            EMAIL_PASSWORD= Your email password 
                            TWILIO_ACCOUNT_SID= Twilio account id
                            TWILIO_AUTH_TOKEN= Auth token
                            ```

                            5. Save the `.env` file.

                            Once you have added the `.env` files to both the frontend and backend, you can proceed with running the project.


                            ## Running the Project

                            To run the project locally, use the following command:

                            ```
                            npm start
                            ```

                            This will start the development server and open the application in your default browser. Any changes you make to the code will automatically be reflected in the browser.

                            ## Building the Project

                            If you want to build the project for production, you can use the following command:

                            ```
                            npm run build
                            ```

                            This will create a `build` directory with optimized and minified files ready for deployment.

                            ## Deployment

                            To deploy the project to a hosting platform, refer to the [deployment documentation](https://facebook.github.io/create-react-app/docs/deployment) for more information.
