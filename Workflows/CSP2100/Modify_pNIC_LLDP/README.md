# CSP2100 Modify pNIC LLDP State

This workflow task was written to modify the pNIC LLDP state for a Cisco CSP2100.

It assumes the following:

* ```Web Proxy``` required for access (This could be easily removed if required).
* SSL connection with tolerance of self signed certs and hostname verification.
* ```Basic Auth``` used for access to CSP2100's REST API.
