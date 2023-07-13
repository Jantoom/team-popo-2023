FROM ubuntu:latest
# Installing dependencies for running a python application
RUN apt-get update && apt-get install -y python3 python3-pip postgresql-client libpq-dev libcurl4-openssl-dev libssl-dev
# Installing dependencies for model-related packages
RUN apt-get update && apt-get install -y ffmpeg 
RUN apt-get update && apt-get install -y libsm6 
RUN apt-get update && apt-get install -y libxext6
# Install pipenv
RUN pip3 install pipenv
# Setting the working directory
WORKDIR /app
# Install pipenv dependencies
COPY backend/Pipfile backend/Pipfile.lock ./
RUN pipenv install --system --deploy
COPY model/Pipfile model/Pipfile.lock extra/
RUN cd extra && pipenv install --system --deploy && cd ..
# Copying our AWS credentials
COPY credentials /root/.aws/credentials
# Copying our application into the container
COPY backend/src/core src/core
COPY model/src/model backend/src/model src/model/
# Running our application
CMD ["celery", "--app", "src.model.classify", "worker", "--loglevel=info"]
