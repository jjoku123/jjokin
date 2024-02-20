FROM python:3
ADD service.py service.py
RUN apt-get install -y python3
VOLUME [ "/app" ]
CMD [ "python3", "./service.py"]
