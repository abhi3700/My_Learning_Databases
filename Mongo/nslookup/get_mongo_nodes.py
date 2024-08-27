""" 
   For mongodb srv lookup.
   
   To extract the nodes (replicaSet) from the srv record, you can use the following command:

   ```sh
   nslookup -type=SRV _mongodb._tcp.cluster0.xrlfvc5.mongodb.net
   ```

   I was getting an error getting the nodes (replicaSet) from the srv record.
   This script is to help debug the issue.
"""

import srvlookup #pip install srvlookup
import sys 
import dns.resolver #pip install dnspython 

# host = "cluster0.xrlfvc5.mongodb.net" 
host = "cluster0.blrc4.mongodb.net" 

if len(sys.argv) > 1 : 
   host = sys.argv[1] 

if host : 
   services = srvlookup.lookup("mongodb", domain=host) 
   print(services) # debug
   for i in services:
      print("%s:%i" % (i.hostname, i.port)) 
   for txtrecord in dns.resolver.resolve(host, 'TXT'): 
      print("%s: %s" % ( host, txtrecord))

else: 
  print("No host specified")