#Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container to /app
WORKDIR /app

# Add the current directory contents into the container at /app
ADD . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 2000

# Run app.py when the container launches
# CMD ["gunicorn", "--timeout=60",  "--workers=3", "--bind", "0.0.0.0:2000", "--access-logfile", "-", "--error-logfile", "-", "--log-level", "debug", "chatapp:app"]
CMD ["gunicorn", "--worker-class=gevent", "--workers=3", "--bind", "0.0.0.0:2000", "--timeout=60","--access-logfile", "-", "--error-logfile", "-", "--log-level", "debug", "chatapp:app"]
