---
title: 'TemanTaman'
description: 'Auction-based marketplace eliminating intermediary margins in ornamental plant supply chains via real-time bidding, escrow settlement, and fair price discovery. 3rd Place at PNB IT Competition.'
thumbnail: 'https://picsum.photos/seed/temantaman/800/600'
tags: ['React', 'Node.js', 'PostgreSQL', 'Business Plan', 'Marketplace', 'E-Commerce']
date: 2024-10-15
featured: false
---

## Overview

**TemanTaman** is an auction-based digital marketplace platform engineered to modernize supply chains and fair price discovery for ornamental plant farmers and botanical collectors. Addressing high intermediary margins, fragmented regional access, and the unique logistics of living plants, TemanTaman was awarded **3rd Place** at the _PNB IT Business Development Competition #16_.

---

## Auction & Escrow Settlement Workflow

The platform pairs real-time competitive bidding with escrow-backed financial security to protect both botanical sellers and buyers. The sequence diagram below traces the complete lifecycle from specimen certification and live bidding increments to climate-controlled logistics and escrow fund release.

```mermaid
sequenceDiagram
    autonumber
    actor Farmer as Verified Plant Farmer
    actor Collector as Botanical Collector
    participant Platform as TemanTaman Web Platform
    participant Engine as Real-Time Auction Engine
    participant Escrow as Escrow Payment Service
    participant Courier as Verified Plant Logistics Partner

    Farmer->>Platform: List Botanical Specimen + Health Certification
    Platform->>Platform: Verify Plant Provenance & Open Bidding

    Collector->>Platform: Submits Bid on Live Specimen
    Platform->>Engine: Process Bid Increment & Validate Ceiling
    Engine-->>Platform: Broadcast Highest Bidder to Active Room

    Note over Platform,Engine: Countdown Timer Expires
    Engine->>Collector: Declare Winner & Prompt Escrow Checkout
    Collector->>Escrow: Deposit Funds into Secure Escrow Account
    Escrow-->>Farmer: Issue Packaging & Safe Shipping Notice

    Farmer->>Courier: Hand over Specimen in Climate-Controlled Box
    Courier->>Collector: Deliver Specimen to Destination
    Collector->>Platform: Confirm Receipt & Plant Health Condition
    Escrow->>Farmer: Release Funds to Farmer Account
```

This milestone-driven escrow protocol eliminates payment fraud and guarantees that rare living specimens arrive in verified healthy condition before transactions finalize. Real-time WebSocket broadcasting ensures bidding transparency across nationwide collector rooms.

---

## System Architecture

TemanTaman is structured as a distributed web application separating real-time auction event processing from traditional marketplace management portals.

```mermaid
graph TD
    subgraph Client Portals
        A[Collector Web Application]
        B[Farmer Management Portal]
    end

    subgraph Core Backend Services
        C[REST API Gateway - Node.js]
        D[Real-Time WebSocket Auction Engine]
        E[Escrow & Settlement Microservice]
    end

    subgraph Data & Assets Layer
        F[(PostgreSQL Relational Database)]
        G[Botanical Health Certificate Storage]
    end

    A <-->|HTTPS / WebSocket| C
    B <-->|HTTPS / WebSocket| C
    C <--> D
    C <--> E
    C --> F
    C --> G
```

This architecture separates high-frequency WebSocket bid broadcasts from core transactional billing routines, preventing auction concurrency spikes from degrading platform stability. PostgreSQL stores relational audit trails for all bids, shipments, and health certificates.

---

## Key Architectural Decisions

- **Market-Driven Price Discovery**: Implemented a real-time WebSocket bidding engine that connects growers directly with nationwide collectors, eliminating predatory intermediary commissions.
- **Escrow-Protected Financial Safeguards**: Designed a milestone-based escrow settlement architecture where funds are only disbursed once the collector verifies live plant health upon delivery.
- **Botanical Provenance Certification**: Created standardized inspection metadata tracking root stability, variegation genetics, and pest-free health certifications.
- **Logistics Integration Protocol**: Engineered packaging compliance guidelines and courier routing algorithms optimized for temperature-sensitive botanical transport.
