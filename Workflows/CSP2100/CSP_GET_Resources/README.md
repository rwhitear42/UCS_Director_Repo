# CSP2100 GET Resources

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
  "resource:resource": {
    "resource_name": "csp-2100",
    "ip_address": "10.87.30.100",
    "netmask": "255.255.255.0",
    "default_gw": "10.87.30.2",
    "mgmt_mtu": 1500,
    "mgmt_pnic": "enp3s0f2",
    "mgmt_pnic_mode": "dedicated",
    "mgmt_vlan": 1,
    "host_name": "csp-penneast",
    "dns_server": "192.168.1.1",
    "domain_name": "shlisky.net",
    "csp_version": "02.01.00.24",
    "num_cpus_total": 3,
    "ram_total_mb": 11737,
    "disk_space_total_gb": 819
  }
}
```

#### The following files are included:

```CSP_GET_Resources_UCSD_6_6_0_0B1.wfdx``` - UCS Director exported custom workflow task.

```CSP_GET_Resources.js``` - CloupiaScript code used in the above.
