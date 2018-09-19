#!/usr/bin/env python
# Import afanasy python module ( must be in PYTHONPATH)
import af, sys, json

# Load the data that PHP sent us
try:
    data = json.loads(sys.argv[1])
except:
    print "ERROR"
    sys.exit(1)

# Generate some data to send to PHP
result = {'status': 'Yes!'}
#folder = "/var/www/owncloud/" + data["folder"]

# Send it to stdout (to PHP)

# Create a job
job = af.Job(data["scene"])

job.setUserName(data["user"])
# Set maximum tasks that can be executed simultaneously
job.setMaxRunningTasks( 5)

# Create a block with provided name and service type
block = af.Block('maya', 'maya')

# Set block tasks working directory
block.setWorkingDirectory('/var/www/html/owncloud/data/'+data["user"]+ '/files'+data["directory"] + '/')

# Set block tasks command
block.setCommand('mayarender -r file -s @#@ -e @#@ -b 1 -proj "C:\Users\render\Desktop" -rd \"/var/www/html/owncloud/Nube_Multimedia/'+data["pathSave"]+'/\" \"/var/www/html/owncloud/data/'+ data["user"]+'/files/'+data["file_path"]+'\"')

# Set block tasks preview command arguments
block.setFiles(["/var/www/html/owncloud/html/Nube_Multimedia/"+data['pathSave']+"png"])

# Set block to numeric type, providing first, last frame and frames per host
block.setNumeric( data["frame_ini"], data["frame_fin"], 1)

# Add block to the job
job.blocks.append( block)

# Send job to Afanasy server
job.send()

#Imprimir un mensaje
print 'Trabajo renderizando'

print json.dumps(data)
