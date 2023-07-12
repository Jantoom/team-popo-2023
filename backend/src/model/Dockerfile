FROM ubuntu:latest
# Installing dependencies for running a python application
RUN apt-get update && apt-get install -y python3 python3-pip postgresql-client libpq-dev libcurl4-openssl-dev libssl-dev
# Installing dependencies for model-related packages
RUN apt-get install ffmpeg libsm6 libxext6
# Install pipenv
RUN pip3 install pipenv
# Install hamilton
COPY hamilton /usr/local/bin/
# Setting the working directory
WORKDIR /app
# Install pipenv dependencies
COPY Pipfile Pipfile.lock ./
RUN pipenv install --system --deploy
# Copying our application into the container
COPY model/src src
COPY backend/src/model src/model
# Running our application
CMD ["celery", "--app", "main.tasks.hamilton", "worker", "--loglevel=info"]
