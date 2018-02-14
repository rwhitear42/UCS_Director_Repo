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

importClass(java.io.BufferedReader);
importClass(java.io.IOException);
importClass(java.io.InputStreamReader);
importClass(java.security.KeyManagementException);
importClass(java.security.KeyStoreException);
importClass(java.security.NoSuchAlgorithmException);
importClass(java.util.Base64);
importPackage(java.lang);

importClass(org.apache.commons.httpclient.HttpException);
importClass(org.apache.http.HttpHost);
importClass(org.apache.http.HttpResponse);
importClass(org.apache.http.auth.AuthScope);
importClass(org.apache.http.auth.UsernamePasswordCredentials);
importClass(org.apache.http.client.CredentialsProvider);
importClass(org.apache.http.client.methods.HttpPatch);
importClass(org.apache.http.conn.ssl.SSLConnectionSocketFactory);
importClass(org.apache.http.conn.ssl.SSLContextBuilder);
importClass(org.apache.http.conn.ssl.TrustSelfSignedStrategy);
importClass(org.apache.http.entity.StringEntity);
importClass(org.apache.http.impl.client.BasicCredentialsProvider);
importClass(org.apache.http.impl.client.CloseableHttpClient);
importClass(org.apache.http.impl.client.HttpClients);
importClass(org.apache.http.impl.conn.DefaultProxyRoutePlanner);


var username = input.userName + "";
var password = input.passWord + "";
var iface = input.interFace + "";
var state = input.State + "";
var host = input.host + "";
var hostPort = input.hostPort + "";
var uri = "/api/running/pnics/pnic";

var proxyName = "proxy.esl.cisco.com";
var proxyPort = 80;

var bodytext = "{\"pnic\": {\"name\" : \""+iface+"\", \"lldp\":\""+state+"\"}}";
var url = "https://" + host + ":" + hostPort + uri;

var response = null;
var rd = null;
var result = new StringBuffer();
var line = "";

var token = username + ":" + password;

//logger.addInfo("token (cleartext): " + token);

// Encode the username:password to Base64.
var hash = Base64.getEncoder().encodeToString(token.getBytes("utf-8"));

//logger.addInfo("Hash: " + hash);

logger.addInfo("Interface: " + iface);
logger.addInfo("State: " + state);

// Configure proxy settings.
var proxy = new HttpHost(proxyName, proxyPort);
var routePlanner = new DefaultProxyRoutePlanner(proxy);

// Configure SSL factory with self signed certs and no hostname verification.
var builder = new SSLContextBuilder();
builder.loadTrustMaterial(null, new TrustSelfSignedStrategy());
var sslsf = new SSLConnectionSocketFactory( builder.build(),SSLConnectionSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);

// Create HTTPS connection with proxy.
var httpclient = HttpClients.custom().setSSLSocketFactory(sslsf).setRoutePlanner(routePlanner).build();

var httpPatch = new HttpPatch(url);

httpPatch.setEntity(new StringEntity(bodytext));

httpPatch.addHeader("Content-Type", "application/vnd.yang.data+json");

httpPatch.addHeader("Authorization", "Basic " + hash);

httpPatch.addHeader("Accept", "*/*");

response = httpclient.execute(httpPatch);

httpPatch.releaseConnection();

logger.addInfo("Status Code: " +  response.getStatusLine().getStatusCode());
