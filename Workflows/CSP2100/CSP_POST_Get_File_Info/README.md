# CSP2100 GET File Info

This workflow task was written to retrieve the server resources information from a Cisco CSP2100.

User is required to supply the following at a workflow task level:

* CSP2100 Server IP or FQDN.
* CSP2100 Server port.
* CSP2100 Username for REST API access.
* CSP2100 Password for REST API access.
* Select whether Proxy access is required (true/false).
* (Optional): Proxy IP or FQDN.
* (Optional): Proxy port.

Currently, the only output is an SR log entry showing the returned HTTP status and response text. In the future, this will be modified to parse and handle the JSON output in the response. Typical output would be:

```
{
  "output": {
    "image": [
      {
        "name": "config.sav"
      }
    ]
  }
}
```

#### The following files are included:

```CSP_GET_File_Info_UCSD_6_6_0_0B1.wfdx``` - UCS Director exported custom workflow task.

```CSP_GET_File_Info.js``` - CloupiaScript code used in the above.
