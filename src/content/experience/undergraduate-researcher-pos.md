---
title: 'Undergraduate Researcher'
company: 'Udayana University'
location: 'Jimbaran, Bali'
startDate: 'Jan 2026'
endDate: 'Jun 2026'
current: false
description: 'Architected an offline-first multi-tenant POS utilizing Clean Architecture and bilateral SQLite-to-Supabase synchronization.'
---

- Architected a multi-tenant and offline-first Point of Sale application utilizing Clean Architecture principles to ensure high system resiliency for SMEs.
- Engineered the Data Layer to map local SQLite databases with cloud-based Supabase and implemented bidirectional synchronization queues using the Brick library.
- Resolved data conflicts through Event Sourcing and a Last Write Wins timestamp strategy while enforcing strict data privacy isolation via Row Level Security (RLS).
- Designed the Domain Layer to separate business logic from physical storage details and utilized middleware to manage access hierarchies directly at the Use Case level.
- Formulated comprehensive integration testing with over 300 scenarios to ensure reliable business logic execution and data consistency.
- Validated system resiliency and offline-first capabilities by successfully synchronizing 1,000+ simulated offline transactions with zero data loss upon network reconnection.
- Optimized local data processing, maintaining sub-20ms latency during transaction execution under simulated poor network conditions.
