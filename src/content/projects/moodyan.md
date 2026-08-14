---
title: 'Moodyan'
description: 'Web3-native mental wellness app with cryptographic on-chain journal storage on ICP and localized Llama 3.2 sentiment analysis. 1st Place at ICP Indonesia Hackathon.'
thumbnail: 'https://picsum.photos/seed/moodyan/800/600'
tags: ['React', 'TypeScript', 'ICP', 'Motoko', 'Web3', 'Llama 3.2', 'Security']
repo: 'https://github.com/bayurkp/moodyan'
date: 2025-05-10
featured: true
---

## Overview

**Moodyan** is a Web3-native mental wellness application designed for users who require absolute data sovereignty and cryptographic privacy for their personal reflections. Awarded **1st Place** at the _ICP Indonesia Hackathon_ (Team _Hackathon Dadakan_), Moodyan replaces centralized cloud surveillance with encrypted on-chain storage on the Internet Computer Protocol (ICP) and localized sentiment inference via Llama 3.2.

---

## Cryptographic Security & Reflection Workflow

The core user journey prioritizes zero-knowledge privacy from the moment a user authenticates. The sequence below details the client-side AES-GCM encryption handshake, decentralized canister consensus, and localized LLM inference.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Client as React Web3 Frontend
    participant Auth as Internet Identity (ICP)
    participant Canister as Motoko Smart Contract Canister
    participant AI as Local / Edge Llama 3.2 Model

    User->>Client: Connect Wallet / Authenticate
    Client->>Auth: Request Delegation Token
    Auth-->>Client: Anonymous Cryptographic Session Identity

    User->>Client: Writes Highly Sensitive Journal Entry
    Client->>Client: Client-Side AES-GCM Payload Encryption (Local Key)
    Client->>Canister: Submit Encrypted Blob (On-Chain Motoko Canister)
    Canister-->>Client: Immutable Block Inclusion Confirmed

    Client->>AI: Request Reflection Analysis (Llama 3.2:8B)
    AI-->>Client: Empathetic Psychological Guidance & Trend Vectors
    Client->>User: Display Private Emotional Trajectory Dashboard
```

Because payload encryption occurs exclusively in the browser before network transmission, neither the blockchain nodes nor network sniffers can decipher user journal contents. Localized AI models interpret sentiment directly on the client machine to generate private wellness insights.

---

## Canister & Smart Contract Architecture

Moodyan partitions its decentralized infrastructure across specialized Internet Computer canisters to separate authentication, persistent storage, and cryptographic key derivations.

```mermaid
graph TD
    subgraph Client Tier
        A[React + Vite Web3 Client] --> B[ICP Agent-JS Integration Layer]
    end

    subgraph Internet Computer Network (ICP Canisters)
        C[Internet Identity Authentication Canister]
        D[Journal Storage & State Canister - Motoko]
        E[Access Control & Cryptographic Canister]
    end

    subgraph Edge Intelligence Tier
        F[Llama 3.2:8B Sentiment Analysis Engine]
    end

    B -->|Zero-Knowledge Auth Handshake| C
    B -->|Encrypted State Mutate/Query| D
    B -->|Session Key Pair Derivation| E
    B -->|Client-Side Inference RPC| F
```

This multi-canister architecture enforces strict caller verification through cryptographic principal identities. Canister memory structures in Motoko provide sub-second query speeds while guaranteeing permanent, tamper-resistant history.

---

## Key Architectural Decisions

- **Zero-Knowledge Authentication**: Utilized Internet Identity to provide cryptographic authentication without collecting personally identifiable information (PII) such as emails, names, or phone numbers.
- **Client-Side AES-GCM Encryption**: Enforced end-to-end payload encryption on the client prior to blockchain submission, ensuring smart contracts only ever store opaque ciphertext.
- **Canister State Management**: Implemented high-efficiency smart contracts in Motoko to manage decentralized data partitioning, caller access controls, and cross-canister calls.
- **Localized Sentiment Intelligence**: Integrated Llama 3.2:8B for deep contextual mood categorization, providing empathetic, actionable feedback without leaking unencrypted text to external APIs.
