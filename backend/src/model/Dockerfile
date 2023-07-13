FROM ubuntu:latest
# Installing dependencies for running a python application
RUN apt-get update && apt-get install -y python3 python3-pip postgresql-client libpq-dev libcurl4-openssl-dev libssl-dev
# Installing dependencies for model-related packages
RUN apt-get update && apt-get install -y ffmpeg libsm6 libxext6
# Install pipenv
RUN pip3 install pipenv
# Setting the working directory
WORKDIR /app
# Install pipenv dependencies
COPY backend/Pipfile backend/Pipfile.lock ./
RUN pipenv install --system --deploy && rm Pipfile Pipfile.lock
COPY model/Pipfile model/Pipfile.lock ./
RUN pipenv install --system --deploy
# Copying our AWS credentials
COPY credentials /root/.aws/credentials
# Copying our application into the container
COPY backend/src/core src/core
COPY backend/src/model src/model
COPY model/src/model src/model
COPY model/__init__.py ./
# Running our application
CMD ["celery", "--app", "src.model.classify", "worker", "--loglevel=info"]
