---
title: 'Kelompok Setia Hati (KSH)'
description: 'Multi-region community and event management ecosystem for Kelompok Setia Hati built with Next.js and Laravel, featuring 6-tier RBAC, automated certificate generation, and regional donation tracking.'
thumbnail: 'https://picsum.photos/seed/kshplatform/800/600'
tags:
  ['Next.js', 'React', 'TypeScript', 'Laravel', 'PHP', 'Tailwind CSS', 'Shadcn UI', 'MySQL', 'RBAC']
repo: 'https://github.com/KSH-Project/ksh-fe-v2'
date: 2025-09-15
featured: true
---

## Overview

**Kelompok Setia Hati (KSH)** is an enterprise-scale community governance, spiritual wellness workshop management, and donation transparency platform engineered to support global community chapters. Built with a decoupled architecture pairing a **Next.js 15** frontend client with a high-performance **Laravel 10** REST API, KSH coordinates event lifecycles, attendance tracking, mentor-guided reflection journals, automated certificate issuance, and regional donation ledgers.

---

## Event Lifecycle & Automated Certification Workflow

The platform streamlines the operational journey from initial attendee registration and live session check-ins to mentor evaluations and verifiable PDF certificate generation. The sequence below traces this end-to-end lifecycle.

```mermaid
sequenceDiagram
    autonumber
    actor Member as Community Member
    participant Frontend as Next.js Portal (App Router)
    participant API as Laravel REST API Gateway
    participant Auth as Sanctum & Spatie RBAC
    participant DB as MySQL Relational Database
    participant Cert as Dynamic PDF Engine

    Member->>Frontend: Registers for Multi-Session Workshop
    Frontend->>API: POST /api/events/{id}/register
    API->>Auth: Validate Member Permissions & Capacity
    API->>DB: Persist Event Registration Record

    Member->>Frontend: Checks in at Scheduled Meeting (QR / Link)
    Frontend->>API: GET /api/events/{id}/meetings/{mId}/attend
    API->>DB: Log Verified Meeting Attendance

    Member->>Frontend: Submits Post-Session Reflection Journal
    Frontend->>API: PUT /api/events/{id}/journals/{jId}
    API->>DB: Store Participant Reflection & Insights

    Note over API,DB: Regional Admin Evaluates Completion Matrix
    Member->>Frontend: Triggers "Generate Verified Certificate"
    Frontend->>API: POST /api/events/{id}/completions/generate-certificate
    API->>Cert: Render Custom Template with Dynamic Layout
    Cert-->>Frontend: Issue Canonical Certificate (KSH-IDN-20250915-001-00001.pdf)
```

By standardizing attendance thresholds and mandatory journal reflections, the platform guarantees that certificates are only issued to verified attendees. The PDF generation engine formats layout coordinates dynamically based on per-event configuration templates stored in the database.

---

## Multi-Region System Architecture

Kelompok Setia Hati coordinates decentralized international chapters through a hierarchical structure (`Region` -> `Country` -> `City`), granting localized administration while preserving global auditability.

```mermaid
graph TD
    subgraph Client Application Tier - Next.js 15
        A[Public Community Portal - Landing, Events, Articles]
        B[Backoffice Admin Dashboard - Role-Scoped Views]
        C[Theme Preset Engine - 5 Visual Styles + Dark/Light]
        D[i18n Localization Engine - Cookie Cached Dictionary]
    end

    subgraph API & Governance Tier - Laravel 10
        E[Laravel API Gateway & Sanctum Auth]
        F[Spatie 6-Tier RBAC Guard Engine]
        G[Event & Attendance Operations]
        H[Donation & Financial Audit Service]
        I[Dynamic Certificate Engine]
    end

    subgraph Data & Storage Tier
        J[(MySQL Relational Database)]
        K[Static Asset & Document Storage]
    end

    A -->|HTTPS REST / JSON| E
    B -->|Bearer JWT Session| E
    C --> A
    D --> A
    E --> F
    F --> G
    F --> H
    F --> I
    G --> J
    H --> J
    I --> J
    I --> K
```

This decoupled topology allows regional administrators to manage localized content, financial records, and event schedules independently. Cookie-cached data dictionaries enable instant multilingual switching across English and Indonesian without redundant API roundtrips.

---

## Key Architectural Decisions

- **6-Tier Role-Based Access Control (RBAC)**: Enforced strict permission boundaries across `super_admin`, `regional_admin`, `editor`, `mentor`, `member`, and `alumni` roles using Spatie Laravel Permission.
- **Dynamic Certificate Numbering Standard**: Implemented an automated serial certificate generator enforcing canonical naming schemes: `KSH-{COUNTRYCODE}-{YYYYMMDD}-{EVENTID_PADDED}-{COMPLETIONID_PADDED}`.
- **Database-Backed i18n Localization**: Built a dynamic multi-language dictionary stored in MySQL with cookie-backed caching on the Next.js client, enabling non-technical admins to update copy in real time.
- **Adaptive 5-Preset Theming System**: Engineered a versatile design system in Next.js supporting _Default, Modern, Brutalist, Soft-Pop, and Twitter_ visual themes with seamless Light/Dark mode toggling.
- **Regional Financial & Donation Transparency**: Partitioned donation centers by geographical territory, recording multi-currency inflows, admin confirmations, and cash flow reports for complete fiscal accountability.
