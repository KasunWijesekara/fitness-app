FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY /etc/letsencrypt/live/01api.online/fullchain.pem /etc/ssl/cert.pem
COPY /etc/letsencrypt/live/01api.online/privkey.pem /etc/ssl/key.pem