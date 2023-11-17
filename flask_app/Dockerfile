# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt


#Testing ngrok and gunicorn
CMD gunicorn --bind 0.0.0.0:5003 flask_app.wsgi:app

# Make port 5003 available to the world outside this container
# EXPOSE 5003

# Define environment variable
# ENV FLASK_APP=app.py
# ENV FLASK_RUN_HOST=0.0.0.0
# ENV FLASK_RUN_PORT=5003

# Run app.py when the container launches
# CMD ["flask", "run"]
