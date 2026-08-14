---
title: 'Flikee'
description: 'Automated AI video generation pipeline synthesizing scripts into polished short-form videos with Pexels and Pixabay footage curation, TTS voiceover, and synced subtitles.'
thumbnail: 'https://picsum.photos/seed/flikee/800/600'
tags:
  [
    'FastAPI',
    'Python',
    'React',
    'TypeScript',
    'Pexels API',
    'Pixabay API',
    'Video Processing',
    'NLP',
  ]
repo: 'https://github.com/bayurkp/flikee'
date: 2025-06-19
featured: false
---

## Overview

**Flikee** is an automated video synthesis and stock footage curation platform engineered to transform raw text scripts into fully produced, narrated short-form videos. Built with a **FastAPI** backend and **React** frontend, Flikee automates the complete multi-stage video production pipeline: NLP keyword extraction, multi-source footage querying from **Pexels** and **Pixabay**, semantic relevance scoring, automated text-to-speech (TTS) voiceover, and synchronized dynamic subtitle rendering.

---

## Video Generation & Curation Pipeline

The core generation pipeline processes raw script inputs through parallel asset fetching and sequential media stitching. The sequence diagram below traces the end-to-end flow from keyword analysis to final MP4 composition.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant App as React Frontend Client
    participant API as FastAPI Backend Server
    participant NLP as Keyword Extractor & Scorer
    participant Pexels as Pexels Video API
    participant Pixabay as Pixabay Video API
    participant Media as TTS & Subtitle Engine
    participant VideoProc as FFmpeg Video Processor

    User->>App: Submits Video Script / Text
    App->>API: POST /generate { text }

    API->>Media: Generate Voiceover (.wav) & Calculate Duration
    API->>Media: Generate Synchronized Subtitles (.srt / .ass)

    API->>NLP: Extract Semantic Keywords from Script
    NLP-->>API: Ranked Search Queries

    par Multi-Source Video Curation
        API->>Pexels: Query Stock Footage by Keyword
        API->>Pixabay: Query Stock Footage by Keyword
    end

    Pexels-->>API: Return Video Candidates & Metadata
    Pixabay-->>API: Return Video Candidates & Metadata

    API->>NLP: Compute Semantic Similarity Scores
    API->>API: Rank & Select Optimal Video Sequences

    API->>VideoProc: Stitch Videos, Overlay Voiceover & Burn Subtitles
    VideoProc-->>API: Render Final Composed MP4
    API-->>App: Return Streamable Video URL (/storage/output.mp4)
    App->>User: Renders Video Player & Download Options
```

Through automated parallel querying across Pexels and Pixabay, Flikee maximizes visual variety while selecting clips based on semantic alignment with the generated voiceover timeline. FFmpeg processes transitions, audio normalization, and dynamic subtitle burning in a single consolidated rendering pass.

---

## System Infrastructure Topology

Flikee separates lightweight client-side script authoring from resource-intensive media processing microservices.

```mermaid
graph TD
    subgraph Client Application Tier
        A[React + Vite Frontend Client]
    end

    subgraph FastAPI Core Engine
        B[FastAPI REST Gateway]
        C[NLP Keyword Extraction Service]
        D[Stock Footage Curator Engine]
        E[TTS Voiceover & Subtitle Generator]
        F[FFmpeg Media Composition Pipeline]
    end

    subgraph External Stock Video APIs
        G[Pexels Video API Gateway]
        H[Pixabay Video API Gateway]
    end

    subgraph Storage & Output Tier
        I[(Local Artifact & Output Storage)]
    end

    A -->|POST /generate| B
    B --> C
    B --> D
    B --> E
    D -->|Search Queries| G
    D -->|Search Queries| H
    G --> D
    H --> D
    D --> F
    E --> F
    F --> I
    I -.->|Static Stream /storage| A
```

This decoupled architecture allows the FastAPI server to process media tasks independently without blocking client user interfaces. Temporary audio stems, downloaded video segments, and final renders are partitioned in isolated timestamped storage buckets for automatic cleanup.

---

## Key Architectural Decisions

- **Multi-Source Footage Curation**: Integrated both **Pexels API** and **Pixabay API** to broaden stock video coverage, eliminating visual repetition across generated clips.
- **Semantic Similarity Scoring**: Implemented text-similarity algorithms comparing video descriptions and metadata against script keywords to guarantee contextually relevant footage selection.
- **Automated Voiceover & Subtitle Synchronization**: Aligned Text-to-Speech (TTS) audio timestamps with subtitle cue generators, ensuring word-by-word subtitle display matches spoken pacing precisely.
- **Efficient Video Assembly Pipeline**: Orchestrated video concatenation, audio mixing, resolution scaling, and hardcoded subtitle overlays through an optimized FFmpeg processing pipeline.
- **FastAPI Asynchronous Architecture**: Leveraged asynchronous request handling and isolated disk storage namespaces to execute multi-step rendering pipelines cleanly.
