importPackage(java.util);
importPackage(java.lang);
importPackage(java.io);
importPackage(com.cloupia.lib.util);
importPackage(org.apache.commons.httpclient);
importPackage(org.apache.commons.httpclient.cookie);
importPackage(org.apache.commons.httpclient.methods);
importPackage(org.apache.commons.httpclient.auth);
importPackage(org.apache.commons.httpclient.protocol);
importClass(org.apache.commons.httpclient.protocol.SecureProtocolSocketFactory);
importPackage(com.cloupia.lib.cIaaS.vcd.api);

/****************************************************************************************
**                                                                                      **
**    Author: Russ Whitear (rwhitear@cisco.com)                                         **
**                                                                                      **
**    IMPORTANT NOTE: THIS SCRIPT WILL NOT WORK WITH UCS DIRECTOR                       **
**                    VERSIONS PRIOR TO 5.4                                             **
**                                                                                      **
**    Version: 1.0                                                                      **
**                                                                                      **
**    Taskname: CSP_GET_Resources                                                       **
**                                                                                      **
**    Returns: JSON representation of the CSP system. Something like so:                **
**                                                                                      **
**    {                                                                                 **
**      "resource:resource": {                                                          **
**        "resource_name": "csp-2100",                                                  **
**        "ip_address": "10.87.30.100",                                                 **
**        "netmask": "255.255.255.0",                                                   **
**        "default_gw": "10.87.30.2",                                                   **
**        "mgmt_mtu": 1500,                                                             **
**        "mgmt_pnic": "enp3s0f2",                                                      **
**        "mgmt_pnic_mode": "dedicated",                                                **
**        "mgmt_vlan": 1,                                                               **
**        "host_name": "csp-penneast",                                                  **
**        "dns_server": "192.168.1.1",                                                  **
**        "domain_name": "shlisky.net",                                                 **
**        "csp_version": "02.01.00.24",                                                 **
**        "num_cpus_total": 3,                                                          **
**        "ram_total_mb": 11737,                                                        **
**        "disk_space_total_gb": 819                                                    **
**      }                                                                               **
**    }                                                                                 **                                                                                    **
**                                                                                      **
 ****************************************************************************************/


// main()

// CSP Access Information.
var cspServerName = input.cspServerName+"";
var cspServerPort = input.cspServerPort+"";
var cspUserName = input.cspUserName+"";
var cspPassword = input.cspPassword+"";

// URI for this GET request.
var uri = "/api/running/resources/resource/csp-2100";

// Web proxy requirement to access CSP server.
var useProxy = input.useProxy+"";
var proxyName = input.proxyName+"";
var proxyPort = input.proxyPort+"";

// Create new httpClient object.
var httpClient = new HttpClient();

// Tolerate SSL self signed certs and no hostname verification.
httpClient = CustomEasySSLSocketFactory.getIgnoreSSLClient(cspServerName, cspServerPort);

httpClient.getParams().setCookiePolicy("default");

// Configure Basic Auth for accessing the CSP2100 REST API
httpClient.getParams().setAuthenticationPreemptive(true);
var defaultcreds = new UsernamePasswordCredentials(cspUserName, cspPassword);
httpClient.getState().setCredentials(new AuthScope(cspServerName, -1, null), defaultcreds);


if( useProxy.match("true") ) {
  logger.addInfo("PROXY: Using " +proxyName+ ":" +proxyPort+ ".");
  var config = httpClient.getHostConfiguration();
  config.setProxy(proxyName, proxyPort);
} else {
  logger.addInfo("PROXY: No proxy configured.")
}

// GET Method.
var httpMethod = new GetMethod(uri);

// Add the appropriate HTTP headers.
httpMethod.addRequestHeader("Accept", "*/*");
httpMethod.addRequestHeader("Content-Type", "application/json");
httpMethod.addRequestHeader("Connection", "close");

// Execute the GET request
httpClient.executeMethod(httpMethod);

// Retrieve HTTP status code and response data.
var statusCode = httpMethod.getStatusCode();
var response = httpMethod.getResponseBodyAsString();

// Release the connection.
httpMethod.releaseConnection();

logger.addInfo("statusCode: " +statusCode);
logger.addInfo("response: " +response);
