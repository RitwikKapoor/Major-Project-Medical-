# Doctor Appointment Website

Welcome to our Doctor Appointment Website project named Medicify! This platform enables patients to easily book appointments with doctors at their preferred day and time. Additionally, doctors can apply to be onboarded, with their applications being reviewed and accepted or rejected via the admin panel.

## Setting Up the Project

To get started with setting up the project, follow these steps:

1. **Environment Variables Setup:**

    - For the client folder, create a `.env.local` file and configure the following variables:
    
        ```
        VITE_APP_CLOUD_NAME=
        VITE_APP_PRESET=
        VITE_APP_BASE_URL=
        ```

    - For the backend, create a `.env` file and set up the following environment variables:
    
        ```
        PORT=
        JWT_SECRET=
        DB_URL=
        FRONTEND_URL=
        STRIPE_SECRET_KEY=
        STRIPE_WEBHOOK_SECRET=
        ```

2. **Docker Compose:**
   
   Run the following command to set up the environment using Docker Compose:
   
   ```bash
   docker-compose up

   
