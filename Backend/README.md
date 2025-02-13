![NEWRR Home Page](https://animalimagebucket.s3.us-west-1.amazonaws.com/homepage-image)

## Project Overview

This backend system was developed for NEWRR's website (New England Wildlife Rescue and Rehabilitation) as part of Opportunity Hack 2024. NEWRR is dedicated to the rescue, rehabilitation, and release of wildlife in the New England area.

## Features

- User Authentication and Authorization
- Animal Management System
- Task Management (ToDo)
- Admin User Management
- Integration with External Services (e.g., Jotform)

## Technology Stack

- Node.js
- TypeScript
- MongoDB
- Express.js

## Project Structure

- `database/`: Database models and CRUD operations
- `server/`: Server configuration and route definitions
- `source/`:
  - `Controllers/`: Request handlers for different HTTP methods
  - `Handlers/`: Business logic for each endpoint
  - `Middleware/`: Custom middleware functions
- `library/`: Utility functions, interfaces, and global definitions

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run the development server: `npm run dev`

## API Documentation

API documentation is automatically generated using TypeDoc. After setting up the project, you can generate the documentation by running:
npm run docs

The generated documentation will be available in the `docs/` directory.

## Contributing

We welcome contributions to improve NEWRR's backend system. Please follow these steps:

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to your fork
5. Submit a pull request

## License

[Add your chosen license here]

## Contact

For any questions or concerns, please contact [Your Contact Information].

## Acknowledgments

- Opportunity Hack 2024 organizers and mentors
- NEWRR staff and volunteers
- All contributors to this project
