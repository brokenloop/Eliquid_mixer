FROM jfloff/alpine-python:3.7

MAINTAINER Your Name <danieljordandev@gmail.com>

RUN mkdir -p /app
WORKDIR /app
COPY /*.py /app/
COPY /*.txt /app/

RUN cd /app
RUN pip install -r requirements.txt

ENTRYPOINT ["python"]
CMD ["server.py"]