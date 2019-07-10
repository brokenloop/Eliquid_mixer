FROM jfloff/alpine-python:3.7

MAINTAINER Daniel Jordan <danieljordandev@gmail.com>

RUN mkdir -p /app
WORKDIR /app
COPY /*.py /app/
COPY /*.txt /app/

RUN cd /app
RUN pip install -r requirements.txt

CMD ["gunicorn", "-b", "0.0.0.0:5000", "flask_server"]
