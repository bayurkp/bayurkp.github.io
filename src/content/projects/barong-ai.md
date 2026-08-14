---
title: 'BarongAI'
description: 'Cultural AI assistant preserving Balinese folklore via a semantic RAG retrieval pipeline over dual LLM models, with async speech synthesis narration.'
thumbnail: 'https://picsum.photos/seed/barongai/800/600'
tags: ['FastAPI', 'Python', 'Next.js', 'LangChain', 'Llama 3.2', 'Gemini 2.0 Flash', 'RAG', 'TTS']
date: 2026-07-05
featured: false
---

## Overview

**BarongAI** is a cultural intelligence platform and conversational AI assistant engineered to preserve, translate, and explore Balinese literature and folklore (_Satua Bali_). By pairing a semantic vector retriever with multi-model LLM generation and real-time speech synthesis, BarongAI provides culturally grounded answers, historical context, and automated story narrations in both Balinese and Indonesian.

---

## RAG & Speech Synthesis Pipeline

The system bridges user exploration with authentic cultural knowledge by routing queries through a semantic vector store before invoking large language models. The sequence below outlines the retrieval-augmented generation lifecycle alongside asynchronous voice synthesis streaming.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Client as Next.js Web Application
    participant API as FastAPI Backend Server
    participant VectorStore as Vector Store (Satua Bali Index)
    participant LLM as Llama 3.2 / Gemini 2.0 Flash
    participant TTS as Speech Synthesis Engine

    User->>Client: Enters Cultural Query (e.g. "Ceritakan kisah I Siap Selem")
    Client->>API: POST /prompt { question, model }
    API->>VectorStore: Execute Semantic Similarity Retrieval
    VectorStore-->>API: Return Top Relevant Satua Text Chunks & Translations

    API->>LLM: Invoke Chain with Grounded Cultural Context
    LLM-->>API: Synthesized Culturally-Accurate Response
    API-->>Client: Return JSON Payload { answer, relevant_docs }

    User->>Client: Triggers "Listen to Audio Story"
    Client->>API: POST /speech { text }
    API->>TTS: Generate Dynamic Voice Audio Stream (.wav)
    TTS-->>Client: Stream Audio Response
    Client->>User: Play Natural Voice Narration
```

This pipeline ensures that AI answers remain grounded in authenticated historical literature rather than hallucinated generalizations. Audio narration is streamed on-demand using background worker threads to keep interface interactions fluid and responsive.

---

## System Infrastructure Topology

BarongAI is architected with a decoupled Next.js web application interfacing with an asynchronous FastAPI backend service that orchestrates vector retrievers, multi-LLM endpoints, and speech generation engines.

```mermaid
graph TD
    subgraph Frontend Application
        A[Next.js 15 Client - TypeScript & Tailwind CSS]
    end

    subgraph FastAPI Core Engine
        B[FastAPI Asynchronous Gateway]
        C[RAG Document Retriever]
        D[LangChain Dynamic Prompt Chain]
        E[Background Task Audio Generator]
    end

    subgraph Knowledge Base & Models
        F[(Vector Store - Satua Bali Corpus)]
        G[Llama 3.2 Local LLM]
        H[Gemini 2.0 Flash Cloud Model]
        I[MeloTTS / Piper Speech Synthesis Engine]
    end

    A -->|POST /prompt| B
    A -->|POST /speech| B
    B --> C
    B --> E
    C --> F
    C --> D
    D --> G
    D --> H
    E --> I
```

By decoupling retrieval mechanics from speech generation, the architecture supports high concurrent user sessions without GPU inference bottlenecks. Dynamic model switching allows users to select between local privacy-first inference or cloud-accelerated reasoning on demand.

---

## Key Architectural Decisions

- **Specialized Cultural Vector Index**: Curated and indexed a bilingual corpus of authentic Balinese folklore (_Satua Bali_), ensuring LLM responses are grounded in legitimate cultural narratives rather than generic hallucinations.
- **Dynamic Dual-Model Routing**: Engineered runtime model switching between local edge models (Llama 3.2) and cloud APIs (Gemini 2.0 Flash) to balance privacy and reasoning performance.
- **Asynchronous Audio Streaming**: Utilized FastAPI background tasks to synthesize voice narrations on-the-fly, returning streamed WAV responses with automated temporary file cleanup.
- **Bilingual Translation Alignment**: Structured LangChain prompt templates to seamlessly cross-reference Balinese dialect idioms with standard Indonesian and English translations.
