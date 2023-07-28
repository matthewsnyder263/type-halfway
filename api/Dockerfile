FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
RUN pip install psycopg2-binary
ENV PYTHONPATH=/app
WORKDIR /app

COPY requirements.txt requirements.txt
COPY main.py main.py

COPY db db
COPY routers routers
COPY authenticator.py authenticator.py
COPY tests tests

RUN python -m pip install -r requirements.txt

CMD uvicorn main:app --host 0.0.0.0 --port 80
