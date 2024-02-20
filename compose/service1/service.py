import http.client
import time
import datetime
import socket


ip_addrs = socket.gethostbyname("service-2")

rounds = 22


#20 + 1 rounds
for i in range(1,rounds):
 
 time.sleep(2)
 msg = str(i) + " " + str(datetime.datetime.now()) + " " + str(ip_addrs)
 
 if i == 21:
  msg = "STOP"

 if i == 1:
  f = open("app/logs/service1.log", "w").close()
 
 #Writes a log message in the log file
 f = open("app/logs/service1.log", "a")
 f.write(str(msg)+"\n")
 
 #Closes log file after 20 rounds
 if i == 21:
  f.close()
  
 #Tries to connect to service2
 try:
  connection = http.client.HTTPConnection("service-2:8000")

  headers= {'Content-type': 'text/plain'}

  connection.request("POST", "/", msg, headers)
  response = connection.getresponse()
 
  connection.close()

 #If sending fails catches the exeption and makes note of it in the log file
 except:
  f = open("app/logs/service1.log", "a")
  f.write("Connection failure")
  f.close()





