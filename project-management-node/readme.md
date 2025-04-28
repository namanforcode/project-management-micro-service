
## Microservices Setup and Start Guide

This folder contains all the microservices required to run the project. Follow the steps below to start all the microservices:

### Prerequisites
- Ensure you have Node.js installed on your system.
- Install dependencies for each microservice by running `npm install` in their respective directories.

### Starting the Microservices
To start all the microservices, navigate to the root directory of each microservice and run the following command:
```bash
npm run start
```
### Installing Node Modules for All Services
To simplify the installation of dependencies for all microservices, you can use a shell script or a single command to automate the process. Ensure you run this from the root directory of the project.

```bash
for dir in */; do (cd "$dir" && npm install); done
```

This command will navigate into each subdirectory and install the required Node.js dependencies.


### Available Microservices
1. **Authentication Service**: Handles user authentication and authorization.
2. **Project Management Service**: Manages projects and related tasks.
3. **Notification Service**: Sends notifications for project updates.
4. **Task Management Service**: Handles task creation, updates, and deletion.

### Notes
- Ensure that all required environment variables are properly configured for each microservice.
- Use a process manager like `pm2` if you want to run the services in the background.




<!-- Scores can be added -->
- On deletion of project all related tasks should be deleted using event emitter i.e. RabbitMQ Kafka
- Dockerize all services and use Docker Compose
- File uploads (task attachments, project docs) in s3
- 

