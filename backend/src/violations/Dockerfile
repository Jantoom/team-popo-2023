FROM ubuntu:latest
# Installing dependencies and cleaning up
RUN apt-get -o Acquire::Check-Valid-Until=false -o Acquire::Check-Date=false update && \
        apt-get -o Acquire::Check-Valid-Until=false -o Acquire::Check-Date=false install -y python3 python3-pip postgresql-client libpq-dev libcurl4-openssl-dev libssl-dev && \
        apt-get clean && \
        rm -rf /var/lib/apt/lists/*
# Installing dependencies for model-related packages
RUN apt-get update && apt-get install -y ffmpeg libsm6 libxext6
# Install pipenv
RUN pip3 install pipenv
# Setting the working directory
WORKDIR /app
# Install pipenv dependencies
COPY backend/Pipfile backend/Pipfile.lock ./
RUN pipenv install --system --deploy
# Copying our AWS credentials
COPY credentials /root/.aws/credentials
# Copying our application into the container
COPY backend/src/core src/core
COPY backend/src/violations src/violations
COPY backend/src/model src/model
# Running our application
RUN chmod +x src/core/docker-entrypoint
ENTRYPOINT ["src/core/docker-entrypoint"]
CMD ["serve", "violations"]