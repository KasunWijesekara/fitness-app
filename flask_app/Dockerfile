# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Make port 443 available to the world outside this container
EXPOSE 443

# Run app.py when the container launches
CMD gunicorn --bind 0.0.0.0:5000 wsgi:app