# Use an official Nginx image as a parent image
FROM nginx

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the SSL certificate and key
COPY /etc/letsencrypt/live/01api.online/fullchain.pem /etc/ssl/cert.pem
COPY /etc/letsencrypt/live/01api.online/privkey.pem /etc/ssl/key.pem