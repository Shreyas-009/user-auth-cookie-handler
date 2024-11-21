# Express.js and React Cookie Handling with JSON Responses  

This project demonstrates cookie handling and sending JSON data with various HTTP response codes using an Express.js backend and a React frontend.  

## Links  

- Frontend: [Cookie Handling Frontend](https://user-auth-cookie-handler.vercel.app/)  
- Backend: [Cookie Handling Backend](https://user-auth-cookie-handler-backend.vercel.app/)  

## Project Overview  

This project implements a system to demonstrate how cookies are set, retrieved, and sent in HTTP responses. It also handles JSON responses with various HTTP status codes. The React frontend interacts with the Express.js backend to test and showcase these functionalities.  

## What I Learned  

- **Cookie Handling in Express.js**:  
  - Setting cookies using `res.cookie()`.  
  - Reading cookies using `req.cookies`.  
  - Configuring options like `httpOnly`, `secure`, and `sameSite` for secure cookie handling.  
- **Sending JSON Responses**:  
  - Creating routes with different HTTP status codes and JSON payloads.  
  - Structuring API responses with appropriate messages and status indicators.  
- **Frontend Interaction**:  
  - Sending requests using `Axios` with `withCredentials: true` for cookies.  
  - Displaying HTTP responses in a user-friendly way using React.  
- **Error Handling**:  
  - Handling backend errors gracefully in both backend routes and the React frontend.  
- **Deploying Full-Stack Apps**:  
  - Hosting the frontend and backend on **Vercel** for seamless integration.  

This project highlights practical implementation techniques for cookie-based authentication and structured JSON responses, ensuring security and clarity in client-server communication.  
