# CSP2100 ADD NTP Server

This workflow task was written to add a new NTP server to a Cisco CSP2100.

User is required to supply the following at a workflow task level:

* CSP2100 Server IP or FQDN.
* CSP2100 Server port.
* CSP2100 Username for REST API access.
* CSP2100 Password for REST API access.
* Select whether Proxy access is required (true/false).
* (Optional): Proxy IP or FQDN.
* (Optional): Proxy port.
* NTP Server IP or FQDN.

#### The following files are included:

```CSP_ADD_NTP_Server_UCSD_6_6_0_0B1.wfdx``` - UCS Director exported custom workflow task.

```CSP_ADD_NTP_Server.js``` - CloupiaScript code used in the above.
