FROM python:3
#WORKDIR /usr/src/app
COPY requirements.txt ./
ADD service.py service.py
RUN apt-get install -y python3
RUN pip3 install --no-cache-dir --upgrade pip 
RUN pip3 install --root-user-action=ignore requests
RUN pip3 install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8199
VOLUME [ "/app" ]
CMD [ "python3", "./service.py"]