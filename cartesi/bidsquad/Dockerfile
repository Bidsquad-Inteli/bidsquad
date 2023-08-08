# syntax=docker.io/docker/dockerfile:1.4
FROM --platform=linux/riscv64 cartesi/python:3.10-slim-jammy

WORKDIR /opt/cartesi/dapp

RUN apt-get update && apt-get install -y gcc
RUN apt-get update && apt-get install -y g++

RUN pip install --upgrade pip
RUN apt-get update && apt-get install -y cmake

RUN apt-get update && apt-get install -y libssl-dev

# COPY ./requirements.txt .
# RUN pip install -r requirements.txt --no-cache \
#     && find /usr/local/lib -type d -name __pycache__ -exec rm -r {} +

COPY ./entrypoint.sh .
COPY ./bidsquad.py .
COPY ./core ./core

# Keep container running with an interactive shell
CMD ["/bin/bash"]
