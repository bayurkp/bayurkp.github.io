---
title: 'SIM-PKMTI'
description: 'Academic competition and mentoring ecosystem for Udayana University IT Department featuring token-based dynamic team formation, multi-scheme PKM proposal lifecycles, milestone assistance tracking, and automated qualification matrices.'
thumbnail: 'https://picsum.photos/seed/simpkmti/800/600'
tags: ['Laravel', 'PHP', 'Inertia.js', 'React', 'Tailwind CSS', 'DaisyUI', 'MySQL', 'RBAC']
repo: 'https://github.com/pkmti/sim-pkmti'
date: 2024-03-02
featured: false
---

## Overview

**SIM-PKMTI** (_Sistem Informasi Pelatihan Program Kreativitas Mahasiswa Teknologi Informasi_) is an academic competition governance and student mentorship platform developed for the Information Technology Student Association (HMTI), Udayana University. Engineered as a full-stack monolithic Single Page Application (SPA) pairing **Laravel 10** with **Inertia.js** and **React 18**, the system manages the end-to-end operational lifecycle for annual PKM research training: token-based student team formation, multi-scheme proposal submissions (PKM-GFT, PKM-K, PKM-KC, PKM-PI, PKM-PM) with strict quota enforcement and word count validation, lecturer consultation tracking, and multi-factor student qualification assessments.

---

## Proposal & Mentorship Lifecycle Workflow

The platform coordinates the entire student journey from self-assembled team creation and quota-validated proposal drafting to supervising lecturer mentoring logs and final evaluation. The sequence below details this end-to-end lifecycle.

```mermaid
sequenceDiagram
    autonumber
    actor Leader as Student Team Leader
    actor Member as Student Member
    actor Lecturer as Supervising Lecturer
    participant SPA as Inertia.js React Client
    participant Gateway as Laravel HTTP Kernel & Auth Middleware
    participant DB as MySQL Relational Database
    participant Queue as Notification Queue Worker

    Leader->>SPA: Creates New Team ("Team Alpha")
    SPA->>Gateway: POST /teams { team_name }
    Gateway->>DB: Persist Team & Generate Unique 8-Char Token
    Leader-->>Member: Shares Invite Token (e.g. "X9kL2aP1")
    Member->>SPA: Enters Token at /teams/{token}/join
    SPA->>Gateway: GET /teams/{token}/join
    Gateway->>DB: Validate Quota (Max 5) & Attach User to Team

    Leader->>SPA: Selects Scheme & Submits Title/Abstract
    SPA->>Gateway: POST /teams/{id}/proposals
    Gateway->>Gateway: Validate Scheme Quota & Word Count (Max 20 Words)
    Gateway->>DB: Store Proposal (Status: Pending)

    Leader->>SPA: Logs Mentoring Session (URL & Date)
    SPA->>Gateway: POST /teams/{id}/assistance-proofs
    Gateway->>DB: Record Consultation Proof (Enforces >= 3 Sessions)

    Leader->>SPA: Submits Final Proposal Document URL
    SPA->>Gateway: PATCH /teams/{id}/proposals
    Lecturer->>SPA: Evaluates Proposal & Reviews Consultation History
    alt Proposal Approved
        Lecturer->>Gateway: PATCH /proposals/{id}/accept
        Gateway->>DB: Update Status to Approved
        Gateway->>Queue: Dispatch Approval Notification Job
    else Revision Required
        Lecturer->>Gateway: PATCH /proposals/{id}/reject { note }
        Gateway->>DB: Update Status to Rejected with Feedback Notes
        Gateway->>Queue: Dispatch Revision Notification Job
    end
```

By enforcing strict prerequisites across each stage, the system ensures that teams complete mandatory lecturer mentoring checkpoints before their final proposals can be reviewed and approved.

---

## Full-Stack Monolithic SPA Architecture

SIM-PKMTI is architected as an Inertia.js monolithic single-page application, seamlessly bridging the Laravel backend kernel with a component-driven React presentation layer without requiring a separate REST API gateway.

```mermaid
graph TD
    subgraph Client Application Tier - Inertia.js & React
        A[Interactive Landing & Public Guidebooks - Framer Motion / AOS]
        B[Student Team & Proposal Dashboard - PrimeReact]
        C[Lecturer Review & Mentoring Portal]
        D[Administrative Governance & Reporting Console - TanStack Table]
    end

    subgraph Application & Governance Tier - Laravel 10
        E[Laravel Router & Inertia Bridge Gateway]
        F[3-Tier RBAC Guard Engine - Admin / Participant / Lecturer]
        G[Team Lifecycle & Token Guard Service - has.no-team / has.proposal]
        H[Proposal Validation & Quota Enforcement Engine]
        I[Mentoring Assistance Audit Service]
        J[Queue Worker - Asynchronous Email Dispatcher]
    end

    subgraph Data & Persistence Tier
        K[(MySQL Relational Database)]
        L[Cloud Storage & External Document Assets]
    end

    A -->|Inertia Hydrated Props| E
    B -->|Inertia State Mutation| E
    C -->|Review & Scoring Actions| E
    D -->|Batch Queries & XLSX Export| E
    E --> F
    F --> G
    F --> H
    F --> I
    G --> K
    H --> K
    I --> K
    H --> J
    I --> L
```

This decoupled frontend-backend pairing within a unified monolith reduces network roundtrips and simplifies authorization checks via Laravel's native session middleware while maintaining a responsive, desktop-like user interface.

---

## Key Architectural Decisions

- **Inertia.js Monolithic SPA Architecture**: Eliminated client-server REST boilerplate and duplicated TypeScript/DTO models by using Inertia.js as a seamless bridge between Laravel 10 backend controllers and client-side React 18 view components.
- **Token-Driven Dynamic Team Lifecycle**: Designed a secure 8-character token invitation protocol that handles self-service team formation (3–5 members), leader delegation, member removal, and cascading automatic dissolution when single-member teams disband.
- **Multi-Scheme Proposal Rule Engine**: Enforced regulatory compliance with official Belmawa PKM guidelines through custom validation rules (`ValidProposalScheme`, `MaxWordCount`) and strict capacity caps (such as limiting the competitive PKM-GFT scheme to a maximum of 5 teams).
- **Milestone-Based Assistance Verification**: Established a prerequisite consultation checkpoint mandating teams to record at least three verified mentoring sessions with their designated lecturer before unlocking final submission clearance.
- **Multi-Factor Administrative Qualification Matrix**: Engineered an automated qualification pipeline that audits participant status against a 5-point completion matrix (team enrollment, lecturer assignment, proposal approval, final document submission, and &ge;3 assistance logs) for automated graduation assessment and spreadsheet generation.
