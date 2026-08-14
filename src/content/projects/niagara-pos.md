---
title: 'Niagara POS'
description: 'Offline-first Point of Sale and multi-branch management system with bilateral SQLite-to-cloud sync, queue-backed conflict resolution, and zero-downtime transaction guarantees.'
thumbnail: 'https://picsum.photos/seed/niagarapos/800/600'
tags:
  [
    'Flutter',
    'Dart',
    'SQLite',
    'Supabase',
    'Brick ORM',
    'Offline-First',
    'Clean Architecture',
    'Research',
  ]
date: 2025-11-20
featured: true
---

## Overview

**Niagara POS** is an enterprise-grade, offline-first Point of Sale (POS) and inventory management system designed for multi-branch retail and F&B MSMEs. Engineered upon **Clean Architecture** principles, the platform directly orchestrates Backend-as-a-Service (Supabase / PostgreSQL) from the mobile client, eliminating the latency and maintenance overhead of intermediate middleware servers.

The architectural design and empirical validation of Niagara POS are published in _Buletin Teknologi Informasi_ under the title **"Domain and Data Layer Design for Offline-First Multi-Tenant POS with BaaS Integration"** (Bayu Rizky Kurnia Pratama et al., Universitas Udayana & Politeknik Negeri Bali).

---

## 1. Client-Side Clean Architecture & Layer Decoupling

The platform isolates pure business logic from database and network infrastructure by establishing a strict boundary between the Domain and Data layers.

```mermaid
graph TD
    subgraph Presentation Layer
        A[UI Widgets & Cashier Screens]
    end

    subgraph Domain Layer
        B[Use Cases & Interactors]
        C[Business Entities]
        D[Hierarchical Auth Middleware]
        E[Abstract Repository Interfaces]
    end

    subgraph Data Layer
        F[Concrete Repository Implementations]
        G[Brick ORM Mapping Engine]
        H[(Encrypted Local SQLite - SQLCipher)]
        I[(Cloud Database - Supabase PostgreSQL)]
    end

    A --> B
    B --> D
    D --> E
    E -.->|Dependency Inversion| F
    F --> G
    G --> H
    G -->|Asynchronous Sync| I
```

This decoupled design ensures the Domain Layer processes business use cases independently, returning standardized Result objects to the Presentation Layer without direct coupling to database drivers. The Data Layer encapsulates all schema transformations, encryption, and network synchronization mechanics.

---

## 2. Push Synchronization Workflow (Mutations & FIFO Queue)

When cashiers execute sales, inventory adjustments, or catalog changes, mutations are instantly written to the local SQLite database and stamped with deterministically generated **UUIDv5** identifiers to mathematically eliminate primary key collisions. Synchronization payloads are then processed sequentially through a local First-In-First-Out (FIFO) queue (`HttpJobs`).

```mermaid
sequenceDiagram
    autonumber
    actor Client
    participant LocalDB as Local DB (SQLite)
    participant Queue as Queue Worker (HttpJobs)
    participant Remote as Remote DB (Supabase)

    Client->>LocalDB: Upsert local records (UUIDv5 Key)
    LocalDB-->>Client: Local update successful (Instant 15-20ms)

    Client->>Queue: Enqueue synchronization request (FIFO)
    Queue-->>Client: Request queued

    Note over Queue,Remote: Background Synchronization Worker
    loop Process Serial Queue
        Queue->>Queue: Retrieve oldest pending request
        Queue->>Remote: Push queued changes
        Remote->>Remote: Resolve synchronization conflicts (LWW / Event Sourcing)
        alt Synchronization Successful
            Remote-->>Queue: Success Response
            Queue->>Queue: Remove processed request from queue
        else Synchronization Failed (Offline / Network Error)
            Remote-->>Queue: Failure Response
            Queue->>Queue: Retain request in queue for automatic retry
        end
    end
```

By delegating network transmissions entirely to a background serial queue, local write latency remains constant between 15 to 20 milliseconds even during severe network degradation (300ms latency with 15% packet loss). The queue strictly processes payloads sequentially to preserve chronological ordering across related transactional mutations.

---

## 3. Pull Synchronization Workflow (TTL-Based Delta Sync)

To maintain catalog freshness across multi-branch environments without saturating mobile bandwidth, Niagara POS implements a Time-To-Live (TTL) delta synchronization engine.

```mermaid
sequenceDiagram
    autonumber
    actor Client
    participant BG as Background Thread
    participant LocalDB as Local DB (SQLite)
    participant RemoteDB as Remote DB (Supabase)

    Client->>BG: Access entity records (Category, Product, Member)
    BG->>LocalDB: Retrieve synchronization state
    LocalDB-->>BG: Return last sync timestamp (or null)

    alt Initial Sync (First Launch / Clean Install)
        BG->>RemoteDB: Request all records
        RemoteDB-->>BG: Return full entity snapshot
        BG->>LocalDB: Upsert records & Save initial sync timestamp
        BG->>LocalDB: Retrieve local records
        LocalDB-->>BG: Return local records
        BG-->>Client: Return local records
    else Delta Sync (Subsequent Reads)
        BG->>LocalDB: Retrieve local records
        LocalDB-->>BG: Return local records
        BG-->>Client: Return cached local records immediately (Zero Wait <10ms)

        Note over BG,RemoteDB: Background Delta Sync Check
        BG->>BG: Check synchronization interval (TTL)
        alt TTL Expired & Sync Required
            BG->>RemoteDB: Request delta changes (updated_at > last_sync)
            RemoteDB-->>BG: Return changed / new records
            BG->>LocalDB: Upsert delta records & Update sync state timestamp
        else TTL Valid (Sync Not Required)
            Note over BG: Local records are already fresh
        end
    end
```

During subsequent read operations, the application serves local cached records in under 10 milliseconds. If the local Time-To-Live interval has expired, the background thread retrieves only records modified after the last recorded synchronization timestamp, updating the local database without UI freezing.

---

## 4. Multi-Tenant Data Isolation (Shared Database, Shared Schema)

Multi-tenant security is enforced at both cloud and client boundaries to prevent data leakage across distinct business entities (`business_id`) and branch locations (`branch_id`).

```mermaid
graph TD
    subgraph Client Application Tier
        A[Mobile POS Client - Business A]
        B[Mobile POS Client - Business B]
    end

    subgraph Client-Side Security Layer
        C[Deterministic Local SQLite Query Predicates]
    end

    subgraph Supabase Cloud Tier - PostgreSQL
        D[JWT Authentication Hook]
        E[Role-Binding Claims Injection]
        F[PostgreSQL Row Level Security - RLS Policies]
        G[(Shared Multi-Tenant Database Schema)]
    end

    A --> C
    B --> C
    C -->|API Request + Bearer JWT| D
    D --> E
    E --> F
    F --> G
```

At the cloud level, a custom PostgreSQL authentication hook injects tenant role-binding claims into user JWTs, allowing Row Level Security (RLS) policies to intercept and reject cross-tenant queries natively at the database engine level. On the client device, deterministic filtering predicates are injected into every SQLite query execution to prevent cross-tenant exposure on shared hardware.

---

## Key Architectural Decisions & Empirical Findings

- **Hybrid Conflict Resolution Engine**:
  - **Last Write Wins (LWW)**: Applied to general master entities (categories, product details) using chronological `updated_at` timestamps.
  - **Event Sourcing Pattern**: Applied to cumulative entities susceptible to race conditions (stock movements, loyalty points) by recording state changes as immutable entries in dedicated ledger tables (`stock_movements`).
  - **Deterministic UUIDv5 Generation**: Generates namespace-hashed primary keys on offline devices to eliminate UUID collisions during mass cloud synchronization.
- **100% Functional Pass Rate**: Validated across **325 automated test scenarios** covering 26 operational business modules using Grey Box Integration Testing with real SQLite and Supabase database instances.
- **Stable Write Latency (15–20 ms)**: Maintained flat write performance under artificially degraded network profiles (300 ms latency, 15% packet loss), significantly outperforming online-only architectures which fluctuated between 250 and 400+ ms with frequent connection dropouts.
- **Zero-Loss Extreme Recovery**: Evaluated under extreme offline conditions by accumulating **1,000 offline sales transactions** (over **5,000 discrete queued instructions**). Upon network restoration, the queue drained in ~600 seconds with an **absolute 0% data loss record** (1,010 local transactions perfectly reconciled with 1,010 Supabase cloud records).
- **Embedded SQLCipher Storage**: Secured offline transactional records, cash drawer ledgers, and authentication tokens using 256-bit AES encryption at rest.
