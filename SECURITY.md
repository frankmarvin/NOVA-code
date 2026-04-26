🔐 SECURITY POLICY — NOVA Code
🚀 Overview

NOVA Code is a browser-based development environment that includes:

File system access (workspace only)
Real-time terminal execution
Git operations
Extension system

Because of these capabilities, security is a critical part of the system design.

⚠️ IMPORTANT WARNING

NOVA Code executes code and terminal commands on the host machine (development mode).

Do NOT deploy publicly without sandboxing.

🧱 Security Principles

NOVA Code is built with the following principles:

1. Workspace Isolation

All file operations are restricted to:

/server/workspace/

No access is allowed outside this directory.

2. No Remote Command Execution

The system does NOT allow:

Remote code injection
External command execution via API
Arbitrary system-level access from HTTP requests

Only terminal input from authenticated WebSocket sessions is allowed.

3. Terminal Safety (CRITICAL)

The terminal uses:

node-pty
System shell (bash / powershell)
⚠️ Risk:

If exposed publicly, users could run harmful commands.

✔️ Required Production Fix:

Use one of the following:

Docker container per user
VM sandbox per session
Restricted shell (rbash / jailed shell)
4. Authentication (Recommended for Production)

Currently development version has no auth.

For production, implement:

JWT authentication
Session cookies (HTTP-only)
Role-based access (admin/user)
5. Rate Limiting

To prevent abuse:

Limit API requests per user
Limit terminal input rate
Limit file write operations

Recommended:

express-rate-limit
6. File System Protection

Rules:

Only read/write inside /workspace
No ../ path traversal allowed
Validate all file paths

Example safeguard:
```Bash
if (!filePath.startsWith(ROOT)) {
  throw new Error("Access denied");
}
```
7. WebSocket Security
Validate all socket connections
Disconnect inactive sessions
Restrict input size per message
8. Extension Security

Extensions run in trusted environment.

⚠️ DO NOT:

Load remote extensions without verification
Execute untrusted scripts

✔️ Recommended:

Signed extensions only
Local whitelist system
🛡️ Vulnerability Reporting

If you discover a security issue:

📧 Contact:
Create a private issue in the repository
Or report directly to project maintainer

Do NOT publicly disclose vulnerabilities before patching.

🔒 Production Deployment Checklist

Before deploying NOVA Code publicly:

 Enable authentication system
 Add Docker sandbox for terminal
 Restrict file system access
 Enable HTTPS only
 Add rate limiting
 Disable unrestricted shell access
 Log all user actions
🚨 Known Risks
| Feature         |   Risk Level  	|  Mitigation            |
|-----------------|-----------------|------------------------|
| Terminal access |   High          |  Sandbox (Docker)      |
| File system	    |   Medium	      |  Workspace restriction |
| Extensions	    |   Medium	      |  Trusted-only loading  |
| WebSocket input | 	Low	          |  Validation            |

📜 Security Philosophy

NOVA Code prioritizes:

Flexibility for developers
+
Safety through controlled execution environments

🧠 Final Note

NOVA Code is safe for local development use only by default.

For cloud deployment, treat it as a remote code execution platform and secure it accordingly.
