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

/*******************************************************************************
 * Copyright (c) 2016 Cisco and/or its affiliates
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *******************************************************************************/

/****************************************************************************************
**                                                                                      **
**    Author: Russ Whitear (rwhitear@cisco.com)                                         **
**                                                                                      **
**    IMPORTANT NOTE: THIS SCRIPT WILL NOT WORK WITH UCS DIRECTOR                       **
**                    VERSIONS PRIOR TO 5.4                                             **
**                                                                                      **
**    Version: 1.0                                                                      **
**                                                                                      **
**    Taskname: CSP_GET_pNIC_Info                                                       **
**                                                                                      **
**    Returns: JSON representation of the pNIC configuration. Something like so:        **
**                                                                                      **
**    {                                                                                 **
**      "pnic:pnics": {                                                                 **
**        "pnic": [                                                                     **
**          {                                                                           **
**            "name": "enp3s0f0"                                                        **
**          },                                                                          **
**          {                                                                           **
**            "name": "enp3s0f1"                                                        **
**          },                                                                          **
**          {                                                                           **
**            "name": "enp3s0f2"                                                        **
**          }                                                                           **
**        ]                                                                             **
**     }                                                                                **
**   }                                                                                  **
**                                                                                      **
 ****************************************************************************************/


// main()

// CSP Access Information.
var cspServerName = input.cspServerName+"";
var cspServerPort = input.cspServerPort+"";
var cspUserName = input.cspUserName+"";
var cspPassword = input.cspPassword+"";

// URI for this GET request.
var uri = "/api/running/pnics";

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
