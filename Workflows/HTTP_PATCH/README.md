# HTTP PATCH Example using Apache HTTPclient 4.3.2

A colleague of mine had a requirement for UCS Director to be able to send an HTTP PATCH request over SSL. The following was required:

* Tolerance of self signed certificates.
* No Hostname Verification.
* Basic Auth.
* Web proxy configuration.
