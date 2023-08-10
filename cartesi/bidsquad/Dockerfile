# syntax=docker.io/docker/dockerfile:1.4
FROM --platform=linux/riscv64 cartesi/python:3.10-slim-jammy

WORKDIR /opt/cartesi/dapp

# Install necessary tools and libraries
RUN apt-get update && \
    apt-get install -y gcc g++ cmake libssl-dev python3-opencv && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Upgrade pip
RUN pip install --upgrade pip

# Copy requirements and install Python dependencies
COPY ./requirements.txt .
RUN pip install -r requirements.txt --no-cache

RUN pip install numpy --upgrade

# Copy the rest of the files
COPY ./entrypoint.sh .
COPY ./bidsquad.py .
COPY ./core ./core
COPY ./model ./model
COPY ./deployments ./deployments

# Keep container running with an interactive shell
CMD ["/bin/bash"]
