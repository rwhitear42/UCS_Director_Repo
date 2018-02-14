# CSP2100 GET pNIC Info

This workflow task was written to retrieve the pNIC information from a Cisco CSP2100.

User is required to supply the following at a workflow task level:

* CSP2100 Server IP or FQDN.
* CSP2100 Server port.
* CSP2100 Username for REST API access.
* CSP2100 Password for REST API access.
* Select whether Proxy access is required (true/false).
* (Optional): Proxy IP or FQDN.
* (Optional): Proxy port.

#### The following files are included:

```CSP_GET_pNIC_Info_UCSD_6_6_0_0B1.wfdx``` - UCS Director exported custom workflow task.

```CSP_GET_pNIC_Info.js``` - CloupiaScript code used in the above.