# How to run the project with Docker

Follow the steps below to run the frontend using Docker and Nginx:

## Prerequisites

- [Docker](https://www.docker.com/) installed on your machine

## Steps

1. **Build the Docker image**

   With the existing Dockerfile in the project root, run:
   ```sh
   docker build -t app-monitor-frontend .
   ```

2. **Run the container**

   ```sh
   docker run -d -p 80:80 --name app-monitor-frontend app-monitor-frontend
   ```

   The app will be available at [http://localhost](http://localhost).

3. **API configuration**

   Make sure the backend API address is correct in the `proxy_pass` line of the `nginx.conf` file.