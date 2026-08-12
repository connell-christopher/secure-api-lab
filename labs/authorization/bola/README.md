# BOLA — Broken Object Level Authorization

A controlled API security laboratory demonstrating a Broken Object Level Authorization vulnerability and its secure remediation.

## Objective

Demonstrate how an API can correctly authenticate a user while incorrectly allowing that user to access another user's object.

## Scenario

The API contains resources belonging to multiple users.

For example:

```text
User 1 → Alice
User 2 → Bob

The API exposes an endpoint similar to:

GET /api/users/{id}

A secure API must verify both:

Who is making the request?
        +
Is that user authorized to access this object?
Vulnerable Flow
Authenticated User
        ↓
Request Object ID
        ↓
Object Exists?
        ↓
Return Object

The vulnerable implementation fails to enforce object-level authorization.

Secure Flow
Authenticated User
        ↓
Request Object ID
        ↓
Identify Object Owner
        ↓
Authorization Check
        ↓
Allow / Deny
Security Impact

Depending on the affected resource, BOLA can potentially expose:

Personal information
Account data
Orders
Documents
API resources
Internal records

The actual impact depends on the sensitivity of the affected objects.

Root Cause

The application treats authentication and authorization as if they were the same security control.

Authentication determines:

Who is the requester?

Authorization determines:

What is the requester allowed to access?

An authenticated user should not automatically have access to every object exposed by an API.

Remediation

The API should perform server-side authorization checks for every object-level request.

Recommended controls include:

Verify resource ownership
Enforce role-based permissions where applicable
Validate object access server-side
Do not rely on client-side restrictions
Apply authorization consistently across endpoints
Test horizontal and vertical access boundaries
Lab Structure
bola/
│
├── README.md
├── vulnerable/
└── secure/

The vulnerable implementation will intentionally demonstrate the authorization failure.

The secure implementation will demonstrate the corresponding security control.

Testing Philosophy

The laboratory is designed for local, controlled testing using dummy data.

The objective is to demonstrate:

Vulnerability
      ↓
Root Cause
      ↓
Impact
      ↓
Remediation
      ↓
Verification
Classification

Category: API Security

Vulnerability: Broken Object Level Authorization (BOLA)

OWASP Alignment: API authorization / access control

Ethics

This laboratory is intentionally vulnerable and is intended only for:

Local testing
Controlled security research
Educational purposes
Secure-coding demonstrations

No third-party systems or real user data are involved.
