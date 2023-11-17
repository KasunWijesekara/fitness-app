# Dockerfile

# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install Flask
RUN pip install Flask

# Make port 5003 available to the world outside this container
EXPOSE 5003

# Define environment variable
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Run app.py when the container launches
CMD ["flask", "run", "--host=0.0.0.0", "--port=5003"]
