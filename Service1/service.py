
#for diskspace
import psutil

import requests

from flask import Flask, request, abort, redirect, url_for

from http.server import HTTPServer, BaseHTTPRequestHandler

import logging

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)


#free disk
def get_space():
    free = psutil.disk_usage('/')
    print(free.free)
    free.free / (1024.0 ** 3)
    #return free.free
    return free.free/1000000


# uptime
def get_uptime():
    with open('/proc/uptime', 'r') as f:
        uptime_seconds = float(f.readline().split()[0])

    #return uptime_seconds
    return uptime_seconds/3600


def get_message():
    msg = "Timestamp1 uptime; " + str(get_uptime()) + " hours, free disk in root: " + str(get_space()) + " Mbytes"
    print("In Getmessage function")
    return msg



app = Flask(__name__)


@app.route('/log', methods=['GET'])
def get_log():
    
    logs = requests.get('http://storage:8080/log').content
    return logs
       

@app.route('/status', methods=['GET'])
def get_status():
    service1_status = get_message()
    service2_status = requests.get('http://service-2:8000').content
    system_status = service1_status.encode() + service2_status
  
    f = open("app/vStorage.log", "a+")
    f.write(str(system_status )+"\n")

    requests.post('http://storage:8080/log',service1_status)
    return system_status
    
    


if __name__ == '__main__':
    app.run(host='service-1', port=8199)




