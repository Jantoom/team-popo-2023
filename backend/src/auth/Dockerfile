FROM ubuntu:latest
# Installing dependencies and cleaning up

RUN apt-get -o Acquire::Check-Valid-Until=false -o Acquire::Check-Date=false update && \
        apt-get -o Acquire::Check-Valid-Until=false -o Acquire::Check-Date=false install -y python3 python3-pip postgresql-client libpq-dev libcurl4-openssl-dev libssl-dev && \
        apt-get clean && \
        rm -rf /var/lib/apt/lists/*
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
COPY backend/src/core core
COPY backend/src/auth auth
# Running our application
RUN chmod +x auth/docker-entrypoint
ENTRYPOINT ["auth/docker-entrypoint"]
CMD ["serve"]