---
title: 'Requirementor'
description: 'Agentic product planning toolkit that exposes PRD authoring and live Kanban orchestration to local AI coding agents via the Model Context Protocol (MCP).'
thumbnail: 'https://picsum.photos/seed/requirementor/800/600'
tags: ['TypeScript', 'Node.js', 'MCP', 'React', 'Tailwind CSS', 'AI', 'Developer Tools']
repo: 'https://github.com/bayurkp/requirementor'
date: 2026-06-01
featured: true
---

## Overview

**Requirementor** is an open-source product planning and agentic execution toolkit designed to bridge the gap between high-level architectural design and autonomous AI development. It unifies an interactive AI PRD (Product Requirements Document) studio with a live Kanban system that local AI coding agents (such as Antigravity, Cursor, Cline, and Claude Code) can read from and orchestrate autonomously through the **Model Context Protocol (MCP)**.

---

## Agentic Execution Workflow

Requirementor operates through an interactive cycle where human engineers shape formal specifications and autonomous AI coding agents retrieve, execute, and verify tasks programmatically. The sequence below demonstrates the MCP tool-calling lifecycle connecting human brainstorming to AI code generation.

```mermaid
sequenceDiagram
    autonumber
    actor Developer
    participant Studio as Requirementor Studio (React UI)
    participant Server as Requirementor MCP Server (Node.js)
    participant Agent as AI Coding Agent (Cursor / AGY)
    participant LocalDB as Local Database (.reqm/db.json)

    Developer->>Studio: Collaborative AI PRD Brainstorming
    Studio->>LocalDB: Generate & Persist Structured PRD + Tasks

    Developer->>Agent: "Execute task #12 from Requirementor"
    Agent->>Server: Invoke Tool: get_prds() / get_tasks()
    Server->>LocalDB: Fetch Context & Acceptance Criteria
    Server-->>Agent: Returns Formal Requirements & Constraints

    Agent->>Agent: Implements Code & Runs Verifications
    Agent->>Server: Invoke Tool: update_task_status(taskId, 'DONE')
    Server->>LocalDB: Mutate Task State
    Server-->>Studio: WebSocket Broadcast (Kanban Card Moves to Done)
```

Through this protocol handshake, AI agents gain full situational awareness without manual prompt copying or specification drift. Live Kanban boards update automatically as tasks transition from backlog to verified implementations.

---

## System Architecture

The Requirementor ecosystem is architected around lightweight, self-contained local developer tooling. The diagram below illustrates the relationship between the web-based Studio UI, the local MCP stdio server, and external AI agents.

```mermaid
graph LR
    subgraph Developer Interface
        A[Developer] -->|Browser :1945| B[Requirementor Studio - React + Vite]
    end

    subgraph CLI & Stdio Core
        C[CLI Command: reqm studio / reqm mcp]
        D[MCP Stdio Server Interface]
    end

    subgraph Autonomous AI Agents
        E[Antigravity / Cursor / Claude Code] -->|Model Context Protocol| D
    end

    subgraph Storage Layer
        F[(Local .reqm/db.json)]
    end

    B <-->|REST / WebSocket| C
    D <--> F
    C <--> F
```

This decoupled architecture allows developers to run Requirementor entirely offline with zero mandatory cloud dependencies. The local JSON persistence layer ensures instant response times and complete source control tracking within the user repository.

---

## Key Architectural Decisions

- **Direct Model Context Protocol (MCP) Integration**: Built a native MCP stdio server exposing programmatic primitives (`get_prd`, `get_tasks`, `update_task_status`, `create_task`), eliminating context-switching between human planning and agent execution.
- **RFC 2119 Compliant Spec Generator**: Engineered prompt workflows that synthesize user input into strict requirement specifications using unambiguous RFC keywords (_MUST_, _SHALL_, _SHOULD_).
- **Embedded Diagram Rendering**: Built native parser integrations for Mermaid.js diagrams, allowing developers and AI agents to visualize entity-relationship schemas and sequence workflows directly inside markdown PRDs.
- **Zero-Cloud Local State Machine**: Stored all project PRDs, user stories, and task matrices in a human-readable `.reqm/db.json` database committed directly to the project Git repository.
