# JWT Security Lab

A controlled API security laboratory exploring JSON Web Token (JWT) authentication, common implementation weaknesses, secure token validation and defensive controls.

---

## Objective

Demonstrate how JWT-based authentication works and how weaknesses in token handling or validation can undermine API security.

The laboratory compares insecure and secure implementation patterns.

---

## What Is JWT?

JSON Web Token (JWT) is a compact format commonly used to represent claims between parties.

A JWT typically consists of three parts:

```text
Header.Payload.Signature

For example:

xxxxx.yyyyy.zzzzz

The three components represent:

Header — token metadata such as the signing algorithm
Payload — claims about the token or subject
Signature — cryptographic protection used to verify token integrity
Authentication Flow

A simplified JWT authentication flow looks like:

Client
  ↓
Login
  ↓
Credentials Verified
  ↓
JWT Issued
  ↓
Client Stores Token
  ↓
Token Sent With API Request
  ↓
Server Validates Token
  ↓
Access Granted / Denied
Security Boundaries

JWT security depends on correctly validating the token rather than simply decoding it.

Important validation considerations include:

Signature verification
Expected signing algorithm
Token expiration
Issuer validation
Audience validation
Required claims
Token integrity
Key management
Common Weaknesses

JWT implementations can become vulnerable when applications:

Accept improperly validated tokens
Fail to verify signatures
Trust attacker-controlled claims
Ignore token expiration
Use weak or improperly managed signing keys
Fail to validate issuer or audience where required
Confuse decoding with verification

The exact impact depends on how the token is used by the application.

Vulnerable Implementation

The vulnerable implementation will demonstrate an intentionally insecure JWT validation pattern.

The purpose is to understand the security assumption that creates the weakness.

JWT
 ↓
Token Processing
 ↓
Insufficient Validation
 ↓
Security Decision
Secure Implementation

The secure implementation will demonstrate explicit validation of security-critical token properties.

JWT
 ↓
Signature Verification
 ↓
Algorithm Validation
 ↓
Claim Validation
 ↓
Expiration Check
 ↓
Authorization Decision

Security decisions should be based on validated claims rather than untrusted token contents.

Root Cause Analysis

JWT vulnerabilities frequently arise when developers treat a token as trusted data before establishing its authenticity and validity.

A useful distinction is:

Decode
  ≠
Verify

Decoding reveals token contents.

Verification establishes whether the token can be trusted according to the application's security requirements.

Security Controls

Recommended controls include:

Verify JWT signatures server-side
Explicitly configure accepted algorithms
Use strong key management practices
Validate expiration
Validate issuer when applicable
Validate audience when applicable
Validate required claims
Keep token lifetimes appropriate to risk
Avoid placing unnecessary sensitive information in tokens
Protect signing keys
Implement appropriate token revocation or session invalidation strategies where required
Testing Methodology

JWT security testing should consider:

Token Acquisition
        ↓
Token Structure Analysis
        ↓
Signature Validation
        ↓
Algorithm Validation
        ↓
Claim Validation
        ↓
Expiration Handling
        ↓
Authorization Behavior
        ↓
Security Boundary Verification

Testing should be performed only against systems where testing is authorized.

Lab Structure
jwt/
│
├── README.md
│
├── vulnerable/
│   ├── server.js
│   └── package.json
│
└── secure/
    ├── server.js
    └── package.json
Technology
JavaScript
JSON
HTTP
JWT
Classification

Category: API Security

Area: Authentication

Technology: JSON Web Token (JWT)

Ethics & Scope

This laboratory is intentionally designed for:

Local testing
Controlled security research
Educational purposes
Secure-coding demonstrations

No unauthorized systems or real user data are involved.
