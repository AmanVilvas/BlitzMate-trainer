# BLITZMATE PRODUCTION SCALING PLAN
## Production-Ready Chess Puzzle Platform for 200 Concurrent Users

**Prepared For**: Client Integration Meeting  
**Date**: January 2026  
**Version**: Production v3.0 Proposal  
**Target Capacity**: 200 concurrent users (scalable to 10,000+)

---

## EXECUTIVE SUMMARY

### Current State vs. Required State

| Aspect | Current (MVP) | Phase 1 (200 users) | Future Scale (5k-10k) |
|--------|---------------|---------------------|----------------------|
| **Users** | Single user, client-side | 200 concurrent | 5,000-10,000 concurrent |
| **Data** | LocalStorage (browser only) | Centralized database | Distributed database |
| **Puzzles** | 50 static puzzles | 10,000+ from Lichess API | 100,000+ puzzles |
| **Authentication** | None | User accounts with JWT | Enterprise auth |
| **Analytics** | Basic (streak, accuracy) | Comprehensive tracking | Real-time analytics |
| **Scalability** | Not scalable | Single server + DB | Auto-scaling infrastructure |
| **Cost** | $0 (static hosting) | ~$50-80/month | ~$300-500/month |

---

## ⚡ PHASE 1: SIMPLIFIED SETUP FOR 200 USERS

**Good News**: With only 200 concurrent users, the infrastructure is **dramatically simpler and cheaper**!

### Key Changes from Original Plan:

| Aspect | Original (10k users) | Phase 1 (200 users) | Savings |
|--------|---------------------|---------------------|---------|
| **Servers** | 4-5 app servers | 1 app server | -75% |
| **Database** | Large instance + replicas | Small single instance | -60% |
| **Load Balancer** | Required | Optional | -100% |
| **Auto-scaling** | Required | Optional | -100% |
| **Monthly Cost** | $300-500 | **$50-80** | **-85%** |
| **Development Time** | 16 weeks | **8-10 weeks** | **-50%** |
| **Development Cost** | $31,500 | **$18,000-22,000** | **-40%** |

### What This Means:

✅ **Much Lower Cost**: ~$50-80/month instead of $300-500  
✅ **Faster Development**: 8-10 weeks instead of 16 weeks  
✅ **Simpler Setup**: Single server architecture  
✅ **Easier Maintenance**: Less infrastructure to manage  
✅ **Future-Proof**: Can scale up when you need more capacity  

### Recommended Phase 1 Infrastructure:

```
┌─────────────────────────────────────────┐
│     CLIENT'S WEBSITE                     │
│  (Your existing website)                 │
└────────────────┬────────────────────────┘
                 │
                 │ Embed chess widget
                 │
┌────────────────▼────────────────────────┐
│   SINGLE VPS SERVER (All-in-One)        │
│                                          │
│  ┌──────────────────────────────┐      │
│  │  Node.js Backend API         │      │
│  │  (Handles 200 concurrent)    │      │
│  └──────────────┬───────────────┘      │
│                 │                        │
│  ┌──────────────▼───────────────┐      │
│  │  PostgreSQL Database         │      │
│  │  (User data, puzzles, stats) │      │
│  └──────────────┬───────────────┘      │
│                 │                        │
│  ┌──────────────▼───────────────┐      │
│  │  Redis Cache (Optional)      │      │
│  │  (For better performance)    │      │
│  └──────────────────────────────┘      │
│                                          │
│  Server: 4GB RAM, 2 vCPU, 80GB SSD     │
└──────────────────────────────────────────┘
         │
         │ Daily sync
         ▼
┌─────────────────┐
│  LICHESS API    │
│  (Free puzzles) │
└─────────────────┘
```

**Why This Works for 200 Users**:
- Modern servers can handle 1,000+ concurrent connections
- Single server = no synchronization complexity
- Database fits in memory = super fast
- No load balancer needed = simpler deployment
- Room to grow 5-10x before needing upgrade

---

## TABLE OF CONTENTS

1. [Phase 1 Simplified Architecture](#1-phase-1-simplified-architecture-200-users)
2. [Phase 1 Cost Breakdown](#2-phase-1-cost-breakdown-200-users)
3. [Database Design](#3-database-design) *(same for all scales)*
4. [Lichess API Integration](#4-lichess-api-integration) *(same for all scales)*
5. [User Management System](#5-user-management-system) *(same for all scales)*
6. [Frontend Integration](#6-frontend-integration) *(same for all scales)*
7. [Future Scaling Strategy](#7-future-scaling-strategy-when-you-grow)
8. [Security & Compliance](#8-security--compliance)
9. [Monitoring & Analytics](#9-monitoring--analytics)
10. [Deployment Pipeline](#10-deployment-pipeline)
11. [Phase 1 Timeline](#11-phase-1-timeline-8-10-weeks)
12. [Original Architecture (10k users)](#12-original-architecture-for-reference)

---

## 1. PHASE 1 SIMPLIFIED ARCHITECTURE (200 Users)

### 1.1 Single-Server Setup

For 200 concurrent users, we can run **everything on ONE powerful server**. This is the most cost-effective and simple approach.

#### Server Specifications

**Recommended: DigitalOcean Premium Droplet**
- **CPU**: 2 vCPUs (Intel)
- **RAM**: 4GB
- **Storage**: 80GB SSD
- **Bandwidth**: 4TB/month
- **Cost**: **$24/month**

**Can Handle**:
- 500+ concurrent users (2.5x headroom)
- 50-100 requests per second
- 10,000+ daily active users
- Millions of database records

#### What Runs on This Server:

1. **Node.js Backend** (Port 3000)
   - REST API endpoints
   - Authentication (JWT)
   - Business logic
   - Puzzle management

2. **PostgreSQL Database** (Port 5432)
   - User accounts
   - Puzzle library (10,000+ puzzles)
   - Match history
   - Statistics

3. **Redis Cache** (Port 6379) - Optional but recommended
   - Session storage
   - Puzzle caching
   - Leaderboard caching
   - 10x faster response times

4. **Nginx** (Port 80/443)
   - Reverse proxy
   - SSL termination
   - Static file serving
   - Gzip compression

### 1.2 Network Architecture

```
Internet
   │
   │ HTTPS (SSL)
   │
   ▼
┌─────────────────────────────────────────────────┐
│  CLOUDFLARE (Free Tier)                         │
│  • Free SSL certificate                         │
│  • DDoS protection                              │
│  • CDN for static assets                        │
│  • DNS management                               │
└────────────────┬────────────────────────────────┘
                 │
                 │ HTTPS
                 │
┌────────────────▼────────────────────────────────┐
│  YOUR VPS SERVER (4GB RAM, 2 vCPU)             │
│  IP: xxx.xxx.xxx.xxx                            │
│                                                  │
│  ┌────────────────────────────────────────┐   │
│  │  NGINX (Reverse Proxy)                 │   │
│  │  Port 80 → redirect to 443             │   │
│  │  Port 443 → SSL + proxy to backend     │   │
│  └──────────────┬─────────────────────────┘   │
│                 │                               │
│  ┌──────────────▼─────────────────────────┐   │
│  │  NODE.JS BACKEND                       │   │
│  │  Port 3000                             │   │
│  │  • REST API                            │   │
│  │  • JWT Authentication                  │   │
│  │  • Business Logic                      │   │
│  │  Express.js + TypeScript               │   │
│  └──────────────┬─────────────────────────┘   │
│                 │                               │
│       ┌─────────┴──────────┬─────────────┐    │
│       │                    │             │    │
│  ┌────▼────────┐  ┌────────▼──────┐  ┌──▼───┐│
│  │ POSTGRESQL  │  │  REDIS CACHE  │  │ LOGS ││
│  │ Port 5432   │  │  Port 6379    │  │      ││
│  │ 2GB RAM     │  │  512MB RAM    │  │      ││
│  └─────────────┘  └───────────────┘  └──────┘│
└──────────────────────────────────────────────────┘
```

### 1.3 Performance Expectations

**Response Times**:
- API calls: 20-50ms average
- Database queries: 1-5ms
- Cached queries: <1ms
- Full page load: <500ms

**Capacity**:
- 200 concurrent users: ✅ Comfortable
- 500 concurrent users: ✅ Still works well
- 1,000 concurrent users: ⚠️ Time to upgrade
- 2,000+ concurrent users: ❌ Need multiple servers

**Resource Usage** (Expected at 200 concurrent):
- CPU: 30-40% average
- RAM: 2.5-3GB used (1GB free buffer)
- Disk I/O: Minimal (<10% usage)
- Network: ~5-10 Mbps

### 1.4 Why This Works

**Modern servers are powerful**:
- Node.js is non-blocking (handles many connections efficiently)
- PostgreSQL can handle 100+ queries/second on basic hardware
- Redis caching reduces database load by 80-90%
- No network latency between components (all on same server)

**Real-world comparison**:
- Instagram started on a single server with 1 million users
- WhatsApp served 450 million users on 32 servers
- Your 200 users = tiny workload for modern hardware

### 1.5 Upgrade Path (When You Grow)

**200-500 users**: Current setup, no changes needed  
**500-1,000 users**: Add more RAM (upgrade to 8GB droplet, +$24/month)  
**1,000-3,000 users**: Separate database to its own server (+$60/month)  
**3,000-10,000 users**: Full multi-server setup from original plan (+$300/month)

---

## 2. PHASE 1 COST BREAKDOWN (200 Users)

### 2.1 Monthly Infrastructure Costs

| Service | Provider | Specification | Cost/Month |
|---------|----------|---------------|------------|
| **VPS Server** | DigitalOcean | 4GB RAM, 2 vCPU, 80GB SSD | $24 |
| **CDN + SSL** | Cloudflare | Free tier (CDN + DDoS) | $0 |
| **Domain** | Namecheap | .com domain | $1 |
| **Backups** | DigitalOcean | Weekly automated backups | $5 |
| **Monitoring** | UptimeRobot | Free tier (5 monitors) | $0 |
| **Email Service** | SendGrid | Free tier (100/day) | $0 |
| **TOTAL** | | | **$30/month** |

**Optional Add-ons**:
| Service | Purpose | Cost/Month |
|---------|---------|------------|
| Database backups to S3 | Off-site backup | $2 |
| SSL wildcard cert | Multiple subdomains | $0 (Let's Encrypt) |
| Premium monitoring | Datadog basic | $15 |
| Email (paid) | 10,000 emails/month | $15 |
| **With Optional** | | **$32-62/month** |

### 2.2 Development Costs (One-Time)

| Task | Hours | Cost @ $75/hr |
|------|-------|---------------|
| **Backend Development** |
| - API implementation | 50 hours | $3,750 |
| - Database setup | 25 hours | $1,875 |
| - Authentication | 30 hours | $2,250 |
| - Lichess integration | 20 hours | $1,500 |
| **Frontend Development** |
| - Widget development | 40 hours | $3,000 |
| - Integration | 15 hours | $1,125 |
| - Mobile responsive | 20 hours | $1,500 |
| **DevOps** |
| - Server setup | 20 hours | $1,500 |
| - Deployment | 15 hours | $1,125 |
| - Testing | 25 hours | $1,875 |
| **Total** | **260 hours** | **$19,500** |

**Payment Structure**:
- 50% upfront: $9,750
- 25% at halfway (week 5): $4,875
- 25% on completion: $4,875

### 2.3 Total Cost of Ownership

**Year 1**:
| Item | Cost |
|------|------|
| Development (one-time) | $19,500 |
| Infrastructure (12 months) | $360 |
| Buffer/contingency (10%) | $2,000 |
| **TOTAL YEAR 1** | **$21,860** |

**Year 2+ (Ongoing)**:
| Item | Cost/Year |
|------|-----------|
| Infrastructure | $360 |
| Maintenance (5 hours/month) | $4,500 |
| Updates/features (10 hours/month) | $9,000 |
| **TOTAL YEAR 2+** | **$13,860/year** |

### 2.4 Cost Comparison

| Scale | Setup Cost | Monthly Cost | Total Year 1 |
|-------|------------|--------------|--------------|
| **Phase 1** (200 users) | $19,500 | $30 | $21,860 |
| **Phase 2** (1,000 users) | $25,000 | $100 | $26,200 |
| **Phase 3** (10,000 users) | $31,500 | $300 | $35,100 |

**Savings by starting small**: **$13,240 in Year 1**

---

## 3. DATABASE DESIGN

### 1.1 High-Level System Design

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT'S WEBSITE                          │
│  (Your existing website - React/Vue/Angular/etc.)           │
└──────────────────┬──────────────────────────────────────────┘
                   │ Embed via iframe or React component
                   │
┌──────────────────▼──────────────────────────────────────────┐
│              BLITZMATE FRONTEND (React SPA)                  │
│  • Responsive UI                                             │
│  • Level Selection (Beginner/Intermediate/Advanced/Expert)  │
│  • Interactive Chess Board                                   │
│  • Real-time feedback                                        │
└──────────────────┬──────────────────────────────────────────┘
                   │ HTTPS API Calls (REST/GraphQL)
                   │
┌──────────────────▼──────────────────────────────────────────┐
│              API GATEWAY (AWS API Gateway / Nginx)           │
│  • Rate Limiting: 1000 req/min per user                     │
│  • Authentication validation                                 │
│  • Request routing                                           │
│  • CORS handling                                             │
└──────────────────┬──────────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────────┐
│              LOAD BALANCER (AWS ALB / Nginx)                 │
│  • Distributes traffic across multiple servers               │
│  • Health checks                                             │
│  • SSL termination                                           │
└──────────────────┬──────────────────────────────────────────┘
                   │
         ┌─────────┴─────────┬──────────────┐
         │                   │              │
┌────────▼────────┐ ┌────────▼────────┐ ┌──▼──────────┐
│   APP SERVER 1  │ │   APP SERVER 2  │ │  SERVER N   │
│   (Node.js)     │ │   (Node.js)     │ │  (Node.js)  │
│  • REST API     │ │  • REST API     │ │  • REST API │
│  • Business     │ │  • Business     │ │  • Business │
│    Logic        │ │    Logic        │ │    Logic    │
│  • Validation   │ │  • Validation   │ │  • Validation│
└─────────────────┘ └─────────────────┘ └─────────────┘
         │                   │              │
         └─────────┬─────────┴──────────────┘
                   │
         ┌─────────▼─────────────────┬───────────────┐
         │                           │               │
┌────────▼────────┐     ┌────────────▼───────┐   ┌──▼──────────┐
│   POSTGRESQL    │     │   REDIS CACHE      │   │  LICHESS    │
│   (Primary DB)  │     │   (Session/Cache)  │   │  API        │
│  • User data    │     │  • Hot data        │   │  • Puzzles  │
│  • Match history│     │  • Rate limiting   │   │  • Ratings  │
│  • Statistics   │     │  • Puzzle cache    │   │             │
└─────────────────┘     └────────────────────┘   └─────────────┘
```

### 1.2 Key Architectural Principles

1. **Microservices Ready**: Separates concerns (auth, puzzles, analytics)
2. **Horizontal Scaling**: Add more servers as load increases
3. **Caching Strategy**: Redis for frequently accessed data
4. **Stateless Backend**: Each request is independent (enables scaling)
5. **Database Replication**: Primary-Replica setup for read scaling
6. **CDN Integration**: Static assets served from edge locations

---

## 2. BACKEND INFRASTRUCTURE

### 2.1 Technology Stack

#### Programming Language: **Node.js (TypeScript)**

**Why?**
- **Same language as frontend** (React/TypeScript) - easier for team
- **Non-blocking I/O** - handles 10,000 concurrent connections efficiently
- **NPM ecosystem** - 2M+ packages, including chess libraries
- **Performance** - V8 engine, comparable to Java/Go for I/O operations

**Alternative**: Go (better for CPU-intensive, but harder to find developers)

#### Framework: **Express.js** or **Fastify**

**Express.js** (Recommended):
- Industry standard, massive community
- Middleware ecosystem
- Easy to learn

**Fastify** (Alternative):
- 2x faster than Express
- Built-in schema validation
- Better for high-performance needs

### 2.2 API Design

#### RESTful API Endpoints

```typescript
// Authentication
POST   /api/auth/login              // Login user
POST   /api/auth/register           // Register new user
POST   /api/auth/refresh            // Refresh JWT token
POST   /api/auth/logout             // Logout user

// User Management
GET    /api/users/me                // Get current user profile
PUT    /api/users/me                // Update user profile
GET    /api/users/me/stats          // Get user statistics
GET    /api/users/me/history        // Get match history

// Puzzle System
GET    /api/puzzles/next            // Get next puzzle (level-based)
POST   /api/puzzles/:id/submit      // Submit puzzle solution
GET    /api/puzzles/:id             // Get specific puzzle
POST   /api/puzzles/:id/hint        // Request hint
POST   /api/puzzles/:id/skip        // Skip puzzle

// Leaderboard
GET    /api/leaderboard/daily       // Daily top players
GET    /api/leaderboard/weekly      // Weekly top players
GET    /api/leaderboard/all-time    // All-time top players
GET    /api/leaderboard/level/:level // Level-specific leaderboard

// Analytics (Admin)
GET    /api/admin/stats/overview    // System overview
GET    /api/admin/stats/users       // User statistics
GET    /api/admin/stats/puzzles     // Puzzle statistics
```

#### Example API Request/Response

**Request**: Get Next Puzzle
```http
GET /api/puzzles/next?level=intermediate
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Response 200 OK:
{
  "puzzle": {
    "id": "abc123",
    "fen": "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
    "moves": ["f3g5", "d7d5", "e4d5"],
    "level": "intermediate",
    "themes": ["fork", "tactics"],
    "rating": 1200,
    "popularity": 95.2
  },
  "userProgress": {
    "streak": 5,
    "totalSolved": 23,
    "accuracy": 78.5,
    "levelProgress": {
      "current": "intermediate",
      "solved": 15,
      "required": 30
    }
  }
}
```

**Request**: Submit Solution
```http
POST /api/puzzles/abc123/submit
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "moves": ["f3g5", "d7d5", "e4d5"],
  "timeSpent": 45,  // seconds
  "hintsUsed": 0
}

Response 200 OK:
{
  "success": true,
  "correct": true,
  "stats": {
    "streak": 6,
    "totalSolved": 24,
    "accuracy": 79.2,
    "pointsEarned": 10,
    "levelUp": false
  },
  "nextPuzzle": { /* next puzzle data */ }
}
```

### 2.3 Server Specifications

#### For 5,000-10,000 Concurrent Users

**Calculation**:
- Average request: 2KB payload
- Average response time: 50ms
- Concurrent connections: 10,000
- Requests per second: ~500-1,000

**Recommended Setup**:

**Option 1: AWS (Most Popular)**
- **Instance Type**: t3.medium × 3-5 instances
  - 2 vCPUs, 4GB RAM each
  - $0.0416/hour = ~$30/month per instance
  - Total: $90-150/month for compute

**Option 2: DigitalOcean (Cost-Effective)**
- **Droplet**: Premium Intel × 3-5 droplets
  - 2 vCPUs, 4GB RAM each
  - $24/month per droplet
  - Total: $72-120/month

**Option 3: Google Cloud (Enterprise)**
- **Instance Type**: e2-standard-2 × 3-5 instances
  - 2 vCPUs, 8GB RAM each
  - $50/month per instance
  - Total: $150-250/month

### 2.4 Auto-Scaling Configuration

```yaml
# Example: AWS Auto Scaling Policy
AutoScalingGroup:
  MinSize: 2              # Always run at least 2 servers
  MaxSize: 10             # Scale up to 10 servers max
  DesiredCapacity: 3      # Normal operation: 3 servers
  
  ScalingPolicies:
    - PolicyName: "ScaleUp"
      Trigger: CPU > 70% for 5 minutes
      Action: Add 2 servers
      
    - PolicyName: "ScaleDown"
      Trigger: CPU < 30% for 10 minutes
      Action: Remove 1 server
```

**Benefits**:
- **Cost Optimization**: Scale down during low traffic (nights, weekends)
- **Handle Spikes**: Automatically scale up during peak hours
- **Reliability**: If one server crashes, others handle the load

---

## 3. DATABASE DESIGN

### 3.1 Database Choice: **PostgreSQL** (Same for all scales)

**NOTE**: This database design works for both Phase 1 (200 users) and future scaling (10,000+ users). The structure doesn't change, only the server size.

**For Phase 1 (200 users)**:
- Runs on the same server as your app
- 2GB RAM allocated to PostgreSQL
- Can store millions of records
- Handles 100+ queries/second easily

**Why PostgreSQL?**
- **ACID Compliance**: Guaranteed data consistency
- **JSON Support**: Store complex data (match history, stats)
- **Performance**: Handles millions of rows efficiently
- **Mature**: 30+ years of development
- **Cost**: Free, open-source

**Alternatives**:
- MongoDB (NoSQL) - Good for flexibility, but harder to ensure data consistency
- MySQL - Good alternative, but PostgreSQL has better features

### 3.2 Database Schema

```sql
-- ==========================================
-- USERS TABLE
-- ==========================================
CREATE TABLE users (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email               VARCHAR(255) UNIQUE NOT NULL,
  username            VARCHAR(50) UNIQUE NOT NULL,
  password_hash       VARCHAR(255) NOT NULL,
  
  -- Profile
  display_name        VARCHAR(100),
  avatar_url          VARCHAR(500),
  country             VARCHAR(2),      -- ISO country code
  
  -- Progress
  current_level       VARCHAR(20) DEFAULT 'beginner',  -- beginner/intermediate/advanced/expert
  total_points        INTEGER DEFAULT 0,
  current_streak      INTEGER DEFAULT 0,
  longest_streak      INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at          TIMESTAMP DEFAULT NOW(),
  updated_at          TIMESTAMP DEFAULT NOW(),
  last_login_at       TIMESTAMP,
  
  -- Indexes for performance
  INDEX idx_users_email (email),
  INDEX idx_users_username (username),
  INDEX idx_users_level (current_level)
);

-- ==========================================
-- PUZZLES TABLE
-- ==========================================
CREATE TABLE puzzles (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lichess_id          VARCHAR(50) UNIQUE,    -- Original Lichess puzzle ID
  
  -- Puzzle Data
  fen                 TEXT NOT NULL,          -- Chess position
  moves               JSONB NOT NULL,         -- Solution moves array
  level               VARCHAR(20) NOT NULL,   -- beginner/intermediate/advanced/expert
  rating              INTEGER,                -- Lichess rating (600-2800)
  themes              JSONB,                  -- ["fork", "pin", "mate"]
  
  -- Metadata
  popularity          FLOAT,                  -- 0-100 score
  difficulty_score    FLOAT,                  -- Our calculated difficulty
  solve_rate          FLOAT,                  -- % of users who solve it
  avg_time_seconds    INTEGER,                -- Average solve time
  
  -- Usage Stats
  times_played        INTEGER DEFAULT 0,
  times_solved        INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at          TIMESTAMP DEFAULT NOW(),
  updated_at          TIMESTAMP DEFAULT NOW(),
  
  -- Indexes
  INDEX idx_puzzles_level (level),
  INDEX idx_puzzles_rating (rating),
  INDEX idx_puzzles_popularity (popularity)
);

-- ==========================================
-- USER_MATCHES TABLE (Complete history)
-- ==========================================
CREATE TABLE user_matches (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID REFERENCES users(id) ON DELETE CASCADE,
  puzzle_id           UUID REFERENCES puzzles(id) ON DELETE CASCADE,
  
  -- Match Details
  status              VARCHAR(20) NOT NULL,   -- 'solved', 'failed', 'skipped'
  time_spent_seconds  INTEGER NOT NULL,       -- How long they took
  moves_made          JSONB,                  -- Array of moves they made
  hints_used          INTEGER DEFAULT 0,
  attempts            INTEGER DEFAULT 1,      -- How many tries
  
  -- Points & Rewards
  points_earned       INTEGER DEFAULT 0,
  accuracy_score      FLOAT,                  -- 0-100
  
  -- Timestamps
  started_at          TIMESTAMP DEFAULT NOW(),
  completed_at        TIMESTAMP,
  
  -- Indexes for queries
  INDEX idx_matches_user (user_id),
  INDEX idx_matches_puzzle (puzzle_id),
  INDEX idx_matches_status (status),
  INDEX idx_matches_date (completed_at)
);

-- ==========================================
-- USER_STATISTICS TABLE (Aggregated stats)
-- ==========================================
CREATE TABLE user_statistics (
  user_id             UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  
  -- Overall Stats
  total_matches       INTEGER DEFAULT 0,
  total_wins          INTEGER DEFAULT 0,
  total_losses        INTEGER DEFAULT 0,
  total_skipped       INTEGER DEFAULT 0,
  overall_accuracy    FLOAT DEFAULT 0.0,      -- Percentage
  
  -- Per-Level Stats
  beginner_solved     INTEGER DEFAULT 0,
  intermediate_solved INTEGER DEFAULT 0,
  advanced_solved     INTEGER DEFAULT 0,
  expert_solved       INTEGER DEFAULT 0,
  
  -- Time Stats
  total_time_played   INTEGER DEFAULT 0,      -- Total seconds
  avg_solve_time      FLOAT,                  -- Average seconds per puzzle
  fastest_solve_time  INTEGER,                -- Best time
  
  -- Streaks
  current_streak      INTEGER DEFAULT 0,
  longest_streak      INTEGER DEFAULT 0,
  
  -- Last Updated
  updated_at          TIMESTAMP DEFAULT NOW(),
  
  -- Indexes
  INDEX idx_stats_accuracy (overall_accuracy),
  INDEX idx_stats_wins (total_wins)
);

-- ==========================================
-- LEADERBOARD TABLE (Materialized View for Performance)
-- ==========================================
CREATE MATERIALIZED VIEW leaderboard_daily AS
SELECT 
  u.id,
  u.username,
  u.display_name,
  u.avatar_url,
  u.current_level,
  COUNT(um.id) as puzzles_today,
  SUM(um.points_earned) as points_today,
  AVG(um.accuracy_score) as accuracy_today
FROM users u
LEFT JOIN user_matches um ON u.id = um.user_id 
  AND um.completed_at >= CURRENT_DATE
WHERE um.status = 'solved'
GROUP BY u.id
ORDER BY points_today DESC, accuracy_today DESC
LIMIT 100;

-- Refresh daily at midnight
CREATE INDEX idx_leaderboard_points ON leaderboard_daily(points_today DESC);

-- ==========================================
-- SESSION TOKENS (For JWT refresh)
-- ==========================================
CREATE TABLE refresh_tokens (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID REFERENCES users(id) ON DELETE CASCADE,
  token               VARCHAR(500) UNIQUE NOT NULL,
  expires_at          TIMESTAMP NOT NULL,
  created_at          TIMESTAMP DEFAULT NOW(),
  
  INDEX idx_tokens_user (user_id),
  INDEX idx_tokens_token (token)
);
```

### 3.3 Database Sizing & Costs

**For 10,000 Users**:

| Item | Estimate | Calculation |
|------|----------|-------------|
| Users | 10,000 rows | ~1KB per row = 10MB |
| Puzzles | 100,000 rows | ~2KB per row = 200MB |
| User Matches | 1M rows/month | ~500 bytes per row = 500MB/month |
| Statistics | 10,000 rows | ~500 bytes per row = 5MB |
| **Total** | **~715MB/month growth** | ~8.5GB per year |

**Database Hosting Costs**:

**AWS RDS PostgreSQL**:
- Instance: db.t3.medium (2 vCPU, 4GB RAM)
- Storage: 100GB SSD
- Backups: Daily automated
- **Cost**: ~$80-100/month

**DigitalOcean Managed PostgreSQL**:
- 2GB RAM, 1 vCPU
- 25GB storage
- Daily backups
- **Cost**: ~$15/month (smaller scale)
- Scale up to $60/month for production

**Self-Managed (Cheaper)**:
- Same droplet as app servers
- Manual backups to S3
- **Cost**: ~$0 (included in server cost)
- **Risk**: Higher, requires DevOps expertise

---

## 4. LICHESS API INTEGRATION

### 4.1 Lichess API Overview

**Base URL**: `https://lichess.org/api`

**Key Features**:
- **2+ Million puzzles** in database
- **Free tier**: 300 requests/hour (IP-based)
- **No API key required** for basic puzzles
- **Rate limits**: Enforced by IP address

### 4.2 Available Endpoints

#### 1. Daily Puzzle
```http
GET https://lichess.org/api/puzzle/daily

Response:
{
  "game": {
    "id": "XiqIDUiq",
    "pgn": "1. e4 e5 2. Nf3 Nc6 3. Bc4...",
    "clock": "10+0"
  },
  "puzzle": {
    "id": "00AeK",
    "rating": 1668,
    "plays": 4145,
    "initialPly": 32,
    "solution": ["e5f3", "g2f3", "d8h4"],
    "themes": ["advantage", "long", "middlegame"]
  }
}
```

#### 2. Puzzle by ID
```http
GET https://lichess.org/api/puzzle/{puzzleId}

Example: https://lichess.org/api/puzzle/00AeK
```

#### 3. Puzzle Database (Most Powerful!)
```http
GET https://lichess.org/api/puzzle/batch

Headers:
  Accept: application/x-ndjson

Response: Stream of puzzles
{"id":"00AeK","fen":"...","rating":1668,...}
{"id":"00AeL","fen":"...","rating":1702,...}
{"id":"00AeM","fen":"...","rating":1523,...}
...
```

**Note**: Returns puzzles in **NDJSON** format (Newline Delimited JSON)

### 4.3 Integration Strategy

#### Option 1: **Real-Time Fetching** (Not Recommended)

```typescript
// Problem: Hit rate limits quickly
async function getPuzzleFromLichess(level: string) {
  const rating = levelToRating(level);
  const response = await fetch(
    `https://lichess.org/api/puzzle/daily`
  );
  const data = await response.json();
  return transformPuzzle(data);
}
```

**Issues**:
- 300 requests/hour = ~0.08 requests/second
- 10,000 users = impossible
- Each user needs multiple puzzles per session

#### Option 2: **Bulk Import + Caching** (Recommended)

**Process**:

1. **Initial Bulk Import** (One-time, 24 hours):
```typescript
// Run once to populate database
async function bulkImportPuzzles() {
  const response = await fetch(
    'https://lichess.org/api/puzzle/batch',
    { headers: { 'Accept': 'application/x-ndjson' } }
  );
  
  const stream = response.body;
  let count = 0;
  
  // Process streaming response
  for await (const line of stream) {
    const puzzle = JSON.parse(line);
    
    // Transform and save to our database
    await db.puzzles.create({
      lichess_id: puzzle.id,
      fen: puzzle.fen,
      moves: puzzle.solution,
      rating: puzzle.rating,
      themes: puzzle.themes,
      level: ratingToLevel(puzzle.rating),
      popularity: puzzle.plays
    });
    
    count++;
    if (count % 1000 === 0) {
      console.log(`Imported ${count} puzzles`);
    }
    
    // Respect rate limits (sleep every 300 requests)
    if (count % 300 === 0) {
      await sleep(3600000); // Sleep 1 hour
    }
  }
  
  console.log(`Total imported: ${count} puzzles`);
}
```

2. **Daily Sync** (Update puzzle stats):
```typescript
// Run daily via cron job
async function syncPuzzleStats() {
  // Get updated popularity, play counts
  const recentPuzzles = await fetch(
    'https://lichess.org/api/puzzle/batch?limit=1000'
  );
  
  // Update our database
  for (const puzzle of recentPuzzles) {
    await db.puzzles.update(
      { lichess_id: puzzle.id },
      { 
        popularity: puzzle.plays,
        updated_at: new Date()
      }
    );
  }
}
```

3. **Serve from Our Database**:
```typescript
// Fast, no API calls
async function getPuzzleForUser(userId: string, level: string) {
  // Get from our PostgreSQL database
  const puzzle = await db.puzzles.findOne({
    where: {
      level: level,
      // Exclude already solved by this user
      id: { 
        notIn: await getUserSolvedPuzzleIds(userId) 
      }
    },
    order: db.raw('RANDOM()') // Random selection
  });
  
  return puzzle;
}
```

### 4.4 Rate Limiting Strategy

**Problem**: 300 requests/hour per IP

**Solutions**:

1. **Multiple IP Addresses**:
   - Use 5 different servers for import
   - 300 × 5 = 1,500 requests/hour
   - Import 100,000 puzzles in ~66 hours

2. **Rotating Proxies** (Advanced):
   - Use proxy service (Bright Data, Oxylabs)
   - Cost: $50-100/month
   - Unlimited requests

3. **Request Batching**:
   - Batch endpoint returns multiple puzzles
   - More efficient than single requests

### 4.5 Lichess API Costs

| Aspect | Free Tier | Cost |
|--------|-----------|------|
| Basic puzzle access | 300 req/hour | **FREE** |
| Bulk database access | No limit (one-time) | **FREE** |
| Daily puzzle | Unlimited | **FREE** |
| Proxy service (optional) | N/A | $50-100/month |
| **Total** | | **$0-100/month** |

**Note**: Lichess API is completely free for non-commercial use. For commercial use, consider:
- Supporting Lichess with donation ($5-50/month)
- Mentioning "Powered by Lichess" on your site

---

## 5. USER MANAGEMENT SYSTEM

### 5.1 Authentication Flow

#### JWT (JSON Web Tokens) Strategy

**Why JWT?**
- **Stateless**: No session storage on server
- **Scalable**: Works across multiple servers
- **Secure**: Cryptographically signed
- **Standard**: Industry best practice

**Token Types**:
1. **Access Token** (Short-lived: 15 minutes)
   - Used for API requests
   - Contains user ID, level, permissions
   - Stored in memory (not localStorage)

2. **Refresh Token** (Long-lived: 7 days)
   - Used to get new access tokens
   - Stored in httpOnly cookie (secure)
   - Can be revoked in database

#### Authentication Flow Diagram

```
┌─────────────┐
│   User      │
│  (Browser)  │
└──────┬──────┘
       │
       │ 1. Login (email, password)
       │
       ▼
┌─────────────────────────────────────┐
│        Backend API Server           │
│                                     │
│  2. Validate credentials            │
│  3. Generate tokens:                │
│     - Access Token (15 min)         │
│     - Refresh Token (7 days)        │
│                                     │
│  4. Save refresh token to DB        │
└─────────────┬───────────────────────┘
              │
              │ 5. Return tokens
              │
              ▼
┌─────────────────────────────────────┐
│   User Browser                      │
│                                     │
│  6. Store:                          │
│     - Access token (memory)         │
│     - Refresh token (httpOnly       │
│       cookie, secure)               │
└─────────────┬───────────────────────┘
              │
              │ 7. Make API request
              │    Authorization: Bearer <access_token>
              │
              ▼
┌─────────────────────────────────────┐
│   Backend API (Protected Route)    │
│                                     │
│  8. Verify access token             │
│  9. Extract user ID                 │
│  10. Process request                │
│  11. Return response                │
└─────────────────────────────────────┘
```

### 5.2 Integration Methods

#### Option 1: **Iframe Embed** (Easiest)

```html
<!-- Client's website -->
<iframe 
  src="https://chess.yourapp.com?userId=abc123&theme=dark"
  width="100%"
  height="800px"
  frameborder="0"
  allow="fullscreen"
>
</iframe>
```

**Pros**:
- Simple integration (one line of code)
- Isolated styling (won't conflict)
- Can be embedded anywhere

**Cons**:
- Limited parent-child communication
- SEO limitations
- Can't access parent page data easily

#### Option 2: **NPM Package** (Best for React)

```bash
npm install @yourcompany/chess-puzzle-widget
```

```jsx
// Client's React app
import { ChessPuzzleWidget } from '@yourcompany/chess-puzzle-widget';

function GamePage() {
  return (
    <div>
      <h1>Practice Chess Tactics</h1>
      <ChessPuzzleWidget
        userId={currentUser.id}
        level="intermediate"
        theme="dark"
        onComplete={(stats) => {
          console.log('Puzzle completed:', stats);
          // Update your own stats
        }}
      />
    </div>
  );
}
```

**Pros**:
- Native React integration
- Full control over styling
- Two-way data flow
- TypeScript support

**Cons**:
- Requires build process
- Version management
- Larger initial bundle

#### Option 3: **Vanilla JavaScript Widget** (Most Compatible)

```html
<!-- Client's website -->
<div id="chess-puzzle-container"></div>

<script src="https://cdn.yourapp.com/chess-widget.js"></script>
<script>
  ChessPuzzle.init({
    container: '#chess-puzzle-container',
    userId: 'user123',
    level: 'beginner',
    apiKey: 'your-api-key',
    onComplete: function(result) {
      console.log('Puzzle solved!', result);
    }
  });
</script>
```

**Pros**:
- Works with any framework (Vue, Angular, vanilla JS)
- Simple script tag
- Progressive enhancement

**Cons**:
- Less type safety
- Potential styling conflicts

### 5.3 Level System

**Mapping Lichess Ratings to Levels**:

| Level | Rating Range | Description | Target Audience |
|-------|--------------|-------------|-----------------|
| **Beginner** | 400-800 | Basic tactics, checkmates | New players |
| **Intermediate** | 800-1400 | Forks, pins, skewers | Club players |
| **Advanced** | 1400-2000 | Complex combinations | Tournament players |
| **Expert** | 2000-2800 | Master-level tactics | Strong players |
| **Master** | 2800+ | Grandmaster puzzles | Titled players |

**Level Progression System**:

```typescript
interface LevelRequirements {
  level: string;
  requiredPuzzles: number;
  minAccuracy: number;
  unlockPoints: number;
}

const levelSystem: LevelRequirements[] = [
  {
    level: 'beginner',
    requiredPuzzles: 0,      // Start here
    minAccuracy: 0,
    unlockPoints: 0
  },
  {
    level: 'intermediate',
    requiredPuzzles: 30,     // Solve 30 beginner puzzles
    minAccuracy: 70,         // With 70% accuracy
    unlockPoints: 100
  },
  {
    level: 'advanced',
    requiredPuzzles: 50,     // Solve 50 intermediate puzzles
    minAccuracy: 75,
    unlockPoints: 300
  },
  {
    level: 'expert',
    requiredPuzzles: 100,    // Solve 100 advanced puzzles
    minAccuracy: 80,
    unlockPoints: 1000
  }
];

// Check if user can level up
function checkLevelUp(user: User): boolean {
  const nextLevel = getNextLevel(user.current_level);
  const stats = getUserStats(user.id);
  
  const currentLevelStats = stats[user.current_level];
  const requirements = levelSystem.find(l => l.level === nextLevel);
  
  return (
    currentLevelStats.solved >= requirements.requiredPuzzles &&
    currentLevelStats.accuracy >= requirements.minAccuracy
  );
}
```

### 5.4 User Tracking & Analytics

**Key Metrics to Track**:

```typescript
interface UserAnalytics {
  // Session Metrics
  session_id: string;
  session_start: Date;
  session_duration: number;  // seconds
  puzzles_attempted: number;
  
  // Performance Metrics
  accuracy_rate: number;     // 0-100
  avg_solve_time: number;    // seconds
  streak: number;
  
  // Engagement Metrics
  hints_used: number;
  puzzles_skipped: number;
  level_ups: number;
  
  // Device Info
  device_type: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  ip_address: string;
  country: string;
}
```

**Real-Time Analytics Dashboard** (For Client):

```typescript
// Example API for client's admin panel
GET /api/admin/analytics/realtime

Response:
{
  "current_online": 342,           // Users online now
  "today": {
    "unique_users": 1,247,
    "total_puzzles_solved": 3,892,
    "avg_accuracy": 76.3,
    "avg_session_time": "8m 32s"
  },
  "puzzles_per_minute": 45,
  "level_distribution": {
    "beginner": 45%,
    "intermediate": 35%,
    "advanced": 15%,
    "expert": 5%
  },
  "top_performers_today": [
    { "username": "ChessMaster", "solved": 28, "accuracy": 92% },
    { "username": "TacticPro", "solved": 25, "accuracy": 88% }
  ]
}
```

---

## 6. FRONTEND INTEGRATION

### 6.1 Changes from Current System

| Current | Production Version |
|---------|-------------------|
| User enters rating | Client passes user ID + level |
| LocalStorage for stats | Database for all data |
| Static 50 puzzles | Dynamic 100,000+ puzzles |
| No user accounts | Full user management |
| Offline | Requires internet |

### 6.2 Widget Configuration

```typescript
// Configuration interface
interface ChessPuzzleConfig {
  // Required
  userId: string;              // Client's user ID
  apiKey: string;              // Authentication
  
  // Optional
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  theme?: 'light' | 'dark' | 'blue' | 'green';
  showLeaderboard?: boolean;
  showStats?: boolean;
  autoLevelUp?: boolean;
  language?: 'en' | 'es' | 'fr' | 'de';
  
  // Callbacks
  onComplete?: (result: PuzzleResult) => void;
  onLevelUp?: (newLevel: string) => void;
  onError?: (error: Error) => void;
}

// Example integration
ChessPuzzle.init({
  userId: currentUser.id,
  apiKey: 'pk_live_abc123',
  level: 'intermediate',
  theme: 'dark',
  onComplete: (result) => {
    // Update client's own database
    updateUserProgress(result);
    
    // Show notification
    showNotification(`Puzzle solved! +${result.points} points`);
  },
  onLevelUp: (newLevel) => {
    showCelebration(`Level up! You're now ${newLevel}!`);
  }
});
```

### 6.3 Customization Options

**CSS Variables** (For theming):

```css
:root {
  --chess-primary-color: #ea580c;
  --chess-success-color: #4ade80;
  --chess-error-color: #f87171;
  --chess-background: #030303;
  --chess-card-bg: rgba(255, 255, 255, 0.05);
  --chess-border-color: rgba(255, 255, 255, 0.1);
  --chess-font-family: 'Inter', sans-serif;
}
```

**White-Label Option**:
- Remove "Powered by Blitzmate" branding
- Custom domain (chess.clientwebsite.com)
- Custom colors, fonts, styling
- Additional cost: +$100/month

---

## 7. FUTURE SCALING STRATEGY (When You Grow)

### 7.1 Growth Path from Phase 1

**Phase 1: Single Server** (0-500 users) - **CURRENT PLAN**
```
┌──────────────────┐
│   All-in-One     │
│   VPS Server     │
│  (App + DB)      │
└──────────────────┘
Cost: $30/month
```

**Phase 2: RAM Upgrade** (500-1,000 users)
```
┌──────────────────┐
│   Bigger Server  │
│   8GB RAM        │
│  (App + DB)      │
└──────────────────┘
Cost: $54/month (+$24)
```

**Phase 3: Split Architecture** (1,000-3,000 users)
```
┌──────────────┐     ┌──────────────┐
│  App Server  │────▶│   Database   │
│  (4GB RAM)   │     │   Server     │
└──────────────┘     │  (4GB RAM)   │
                     └──────────────┘
Cost: $100/month (+$46)
```

**Phase 4: Multi-Server** (3,000-10,000 users)
```
     ┌──────────────┐
     │Load Balancer │
     └───────┬──────┘
        ┌────┴────┬────────┐
        │         │        │
    ┌───▼───┐ ┌──▼───┐ ┌──▼───┐
    │ App 1 │ │ App 2│ │ App 3│
    └───┬───┘ └──┬───┘ └──┬───┘
        └────────┼────────┘
                 │
         ┌───────▼───────┐
         │   Database    │
         │  + Replicas   │
         └───────────────┘
Cost: $300-500/month
```

### 7.2 When to Upgrade?

**Monitoring Triggers**:

| Metric | Current | Action Needed |
|--------|---------|---------------|
| CPU Usage | >70% for 30min | Upgrade server |
| RAM Usage | >80% sustained | Upgrade server |
| Response Time | >500ms average | Add caching or upgrade |
| Database Queries | >200/sec | Separate DB server |
| Concurrent Users | >500 | Start planning upgrade |

### 7.3 Horizontal Scaling (Future)

**Full Production Architecture** (5,000-10,000 users):

| Concurrent Users | Servers Needed | Monthly Cost |
|------------------|----------------|--------------|
| **0-500** | **1 server (Phase 1)** | **$30** ✅ |
| 500-1,000 | 1 bigger server | $54 |
| 1,000-3,000 | 2 servers (app + db) | $100 |
| 3,000-5,000 | 3-4 servers | $150 |
| 5,000-10,000 | 5-8 servers | $300 |
| 10,000-50,000 | 10-20 servers | $600 |

**Auto-Scaling** (Only needed at Phase 4):
- Peak hours: More servers
- Night/Weekends: Fewer servers (save money)
- Instant response to traffic spikes

### 7.2 Database Scaling

**Phase 1: Single Database** (0-5,000 users)
- One PostgreSQL instance
- Sufficient for initial launch

**Phase 2: Read Replicas** (5,000-20,000 users)
```
┌─────────────┐
│   Primary   │ ← Writes (INSERT, UPDATE, DELETE)
│  (Master)   │
└──────┬──────┘
       │ Replication
       ├─────────────┬─────────────┐
       │             │             │
┌──────▼──────┐ ┌────▼──────┐ ┌───▼───────┐
│  Replica 1  │ │ Replica 2 │ │ Replica 3 │
│  (Read)     │ │ (Read)    │ │ (Read)    │
└─────────────┘ └───────────┘ └───────────┘
```

**Phase 3: Sharding** (20,000+ users)
- Split users by region or ID range
- Each shard is independent database
- More complex, but handles millions

### 7.3 Caching Strategy

**Redis Cache Layers**:

1. **Puzzle Cache**:
```typescript
// Cache popular puzzles for 1 hour
const cachedPuzzle = await redis.get(`puzzle:${level}:${id}`);
if (cachedPuzzle) return JSON.parse(cachedPuzzle);

// If not cached, fetch from DB
const puzzle = await db.puzzles.findOne({ id });
await redis.setex(`puzzle:${level}:${id}`, 3600, JSON.stringify(puzzle));
return puzzle;
```

2. **User Session Cache**:
```typescript
// Cache user data for 5 minutes
await redis.setex(`user:${userId}`, 300, JSON.stringify(userData));
```

3. **Leaderboard Cache**:
```typescript
// Update leaderboard every 10 minutes
await redis.setex('leaderboard:daily', 600, JSON.stringify(topPlayers));
```

**Cache Hit Ratio Target**: 80-90%
- 80-90% requests served from cache (fast)
- 10-20% requests hit database (slower)

**Cost**: Redis
- AWS ElastiCache: $15-50/month
- DigitalOcean Managed Redis: $15/month
- Self-hosted: $0

---

## 8. COST BREAKDOWN

### 8.1 Monthly Infrastructure Costs

| Service | Provider | Specification | Cost/Month |
|---------|----------|---------------|------------|
| **Compute** | DigitalOcean | 4× Premium (2vCPU, 4GB) | $96 |
| **Database** | DigitalOcean | Managed PostgreSQL (2GB) | $60 |
| **Cache** | DigitalOcean | Managed Redis (1GB) | $15 |
| **Load Balancer** | DigitalOcean | 1× LB | $12 |
| **CDN** | Cloudflare | Pro plan | $20 |
| **Monitoring** | Datadog | Basic plan | $15 |
| **Backups** | AWS S3 | 100GB storage | $3 |
| **Domain** | Namecheap | .com domain | $1 |
| **SSL** | Let's Encrypt | Free certificate | $0 |
| **Email** | SendGrid | 10K emails/month | $15 |
| **Lichess Proxy** | Optional | Rotating proxies | $0-50 |
| **SUBTOTAL** | | | **$237-287** |
| **Buffer (20%)** | | Unexpected costs | **$47-57** |
| **TOTAL** | | | **~$284-344/month** |

### 8.2 Alternative: AWS Setup (More Expensive but Better Support)

| Service | Specification | Cost/Month |
|---------|---------------|------------|
| EC2 Instances | 4× t3.medium | $120 |
| RDS PostgreSQL | db.t3.medium | $85 |
| ElastiCache Redis | cache.t3.micro | $15 |
| Application Load Balancer | Standard | $23 |
| CloudFront CDN | 1TB transfer | $85 |
| Route 53 | DNS hosting | $1 |
| CloudWatch | Monitoring | $10 |
| **TOTAL** | | **~$339/month** |

### 8.3 Cost Optimization Strategies

1. **Reserved Instances** (Save 30-40%):
   - Commit to 1 year
   - Pay upfront
   - $284/month → $170/month

2. **Spot Instances** (Save 70%, but risky):
   - Use for non-critical workers
   - Can be terminated anytime
   - Good for batch jobs

3. **Auto-Scaling**:
   - Scale down at night (save 40% compute)
   - $284/month → ~$200/month average

### 8.4 Development Costs (One-Time)

| Task | Time Estimate | Cost @ $75/hr |
|------|---------------|---------------|
| **Backend Development** |
| - API design & implementation | 80 hours | $6,000 |
| - Database design & setup | 40 hours | $3,000 |
| - Authentication system | 40 hours | $3,000 |
| - Lichess API integration | 30 hours | $2,250 |
| - Testing & bug fixes | 40 hours | $3,000 |
| **Frontend Development** |
| - Widget development | 60 hours | $4,500 |
| - Integration code | 20 hours | $1,500 |
| - Mobile optimization | 30 hours | $2,250 |
| **DevOps** |
| - Server setup & deployment | 40 hours | $3,000 |
| - CI/CD pipeline | 20 hours | $1,500 |
| - Monitoring & alerts | 20 hours | $1,500 |
| **Total Development** | **420 hours** | **$31,500** |

**Maintenance** (Ongoing):
- Bug fixes: 10 hours/month = $750/month
- Feature updates: 20 hours/month = $1,500/month
- Infrastructure management: 5 hours/month = $375/month
- **Total Maintenance**: ~$2,625/month

### 8.5 Total Cost of Ownership (First Year)

| Category | Cost |
|----------|------|
| Development (one-time) | $31,500 |
| Infrastructure (12 months) | $3,408 |
| Maintenance (12 months) | $31,500 |
| **TOTAL YEAR 1** | **$66,408** |
| **TOTAL YEAR 2+** | **~$35,000/year** |

---

## 9. SECURITY & COMPLIANCE

### 9.1 Security Measures

1. **API Security**:
   - HTTPS only (TLS 1.3)
   - JWT authentication
   - Rate limiting (1000 req/min per user)
   - Input validation & sanitization
   - SQL injection prevention (parameterized queries)

2. **Data Protection**:
   - Password hashing (bcrypt, 12 rounds)
   - Encrypted database backups
   - No sensitive data in logs
   - GDPR compliance (data export, deletion)

3. **DDoS Protection**:
   - Cloudflare protection
   - Rate limiting at multiple layers
   - IP-based throttling

### 9.2 Compliance

**GDPR** (If EU users):
- Right to data export
- Right to deletion
- Cookie consent
- Privacy policy

**COPPA** (If under-13 users):
- Parental consent required
- Limited data collection
- Special terms of service

---

## 10. MONITORING & ANALYTICS

### 10.1 Key Metrics Dashboard

**For Client's Business Team**:
- Daily Active Users (DAU)
- Weekly Active Users (WAU)
- Average session time
- Conversion rate (free → paid if applicable)
- Churn rate
- Revenue (if monetized)

**For Technical Team**:
- API response time (P50, P95, P99)
- Error rate
- Server CPU/Memory usage
- Database query performance
- Cache hit ratio

### 10.2 Monitoring Tools

**APM (Application Performance Monitoring)**:
- New Relic or Datadog
- Tracks every request
- Identifies slow queries
- Alerts on errors

**Uptime Monitoring**:
- UptimeRobot (free)
- Pings every 5 minutes
- SMS alerts on downtime

**Log Aggregation**:
- ELK Stack (Elasticsearch, Logstash, Kibana)
- Centralized log viewing
- Search across all servers

---

## 11. DEPLOYMENT PIPELINE

### 11.1 CI/CD Process

```
Developer Push Code
       ↓
GitHub Repository
       ↓
GitHub Actions Triggered
       ↓
┌───────────────────────┐
│   Automated Tests     │
│  - Unit tests         │
│  - Integration tests  │
│  - E2E tests          │
└──────────┬────────────┘
           │ If tests pass
           ↓
┌───────────────────────┐
│   Build & Deploy      │
│  - Build Docker image │
│  - Push to registry   │
│  - Deploy to staging  │
└──────────┬────────────┘
           │ Manual approval
           ↓
┌───────────────────────┐
│   Production Deploy   │
│  - Blue-green deploy  │
│  - Zero downtime      │
│  - Auto-rollback      │
└───────────────────────┘
```

### 11.2 Environments

1. **Development**: Local machine
2. **Staging**: Mirror of production for testing
3. **Production**: Live system

---

## 11. PHASE 1 TIMELINE (8-10 Weeks)

### 11.1 Simplified Development Roadmap

**Week 1-2: Foundation**
- ✅ Single server setup (DigitalOcean)
- ✅ PostgreSQL database schema
- ✅ Basic Node.js API structure
- ✅ JWT authentication setup
- **Deliverable**: Working API with user registration/login

**Week 3-4: Core Features**
- ✅ Lichess puzzle import (5,000-10,000 puzzles)
- ✅ Puzzle API endpoints (get, submit, skip)
- ✅ User statistics tracking
- ✅ Level system implementation
- **Deliverable**: Complete backend functionality

**Week 5-6: Frontend Widget**
- ✅ React widget development
- ✅ Chess board integration
- ✅ Level selection UI
- ✅ Stats display
- **Deliverable**: Standalone widget working

**Week 7-8: Integration & Testing**
- ✅ Embed widget in client's website
- ✅ Testing with 50-100 beta users
- ✅ Performance optimization
- ✅ Bug fixes
- **Deliverable**: Production-ready system

**Week 9-10: Launch Preparation** (Optional, if needed)
- ✅ Documentation
- ✅ Admin dashboard (basic)
- ✅ Monitoring setup
- ✅ Final security audit
- **Deliverable**: Live production launch

**Total Timeline**: 8-10 weeks (2-2.5 months)

### 11.2 Weekly Milestones

| Week | Focus | Hours | Status |
|------|-------|-------|--------|
| 1 | Server + Database | 30 | 🔄 |
| 2 | Auth + API basics | 30 | ⏳ |
| 3 | Lichess integration | 25 | ⏳ |
| 4 | Puzzle engine | 25 | ⏳ |
| 5 | Widget development | 30 | ⏳ |
| 6 | Widget polish | 30 | ⏳ |
| 7 | Integration + testing | 30 | ⏳ |
| 8 | Launch prep | 30 | ⏳ |
| 9-10 | Buffer/polish | 30 | ⏳ |
| **Total** | | **260 hrs** | |

---

## 12. ORIGINAL ARCHITECTURE (For Reference - Future Scaling)

This section shows the full enterprise architecture for 5,000-10,000 concurrent users. **You won't need this for Phase 1**, but it's here for future reference.

---

## 13. RISK MITIGATION

### 13.1 Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Lichess API down | High | Low | Cache puzzles locally |
| Database overload | High | Medium | Read replicas, caching |
| Server crash | High | Low | Auto-scaling, multiple servers |
| DDoS attack | Medium | Medium | Cloudflare protection |
| Data loss | Critical | Very Low | Daily backups, replication |

### 13.2 Business Risks

| Risk | Mitigation |
|------|------------|
| Low user adoption | A/B testing, user feedback |
| High churn rate | Engagement features, gamification |
| Budget overruns | Monthly cost monitoring, alerts |
| Performance issues | Load testing before launch |

---

## 13. RECOMMENDATIONS

### 13.1 ✅ RECOMMENDED: Phase 1 Approach (200 users)

**Start Simple, Scale Later**

**Infrastructure**:
- 1× All-in-one VPS (4GB RAM, 2 vCPU)
- Cloudflare CDN (Free tier)
- Let's Encrypt SSL (Free)
- **Cost**: ~$30/month

**Why This Is Smart**:
1. **Prove the concept first** - See if users engage before spending more
2. **Lower risk** - $30/month vs $300/month commitment
3. **Faster development** - 8 weeks vs 16 weeks
4. **Same features** - Users get the exact same experience
5. **Easy upgrade path** - Can scale up in a few hours when needed

**Development Priority** (MVP):
1. ✅ User accounts & JWT auth
2. ✅ Level-based puzzle selection
3. ✅ Core puzzle functionality
4. ✅ User statistics (matches, accuracy, wins, losses)
5. ✅ Match history tracking
6. ⚠️ Basic leaderboard (can be added later)
7. ⚠️ Admin dashboard (can be added later)

### 13.2 Future Enhancement Path

**When you hit 500+ concurrent users** (6-12 months from launch):

**Stage 2 Upgrade**:
- Upgrade to 8GB RAM server (+$24/month)
- Add managed Redis cache (+$15/month)
- Add advanced monitoring (+$15/month)
- **New Cost**: ~$84/month

**Stage 3 Scale-Out** (1,000+ users):
- Separate database server (+$60/month)
- Add second app server (+$24/month)
- Load balancer (+$12/month)
- **New Cost**: ~$180/month

**Stage 4 Enterprise** (5,000-10,000 users):
- Full multi-server architecture
- Auto-scaling
- Read replicas
- Advanced analytics
- **Cost**: ~$300-500/month

### 13.3 Feature Roadmap

**Phase 1 Launch** (Weeks 1-8):
- Core puzzle trainer
- User accounts
- Level system
- Basic stats

**Phase 2 Enhancement** (Month 2-3):
- Leaderboards
- Achievement system
- Social sharing
- Email notifications

**Phase 3 Advanced** (Month 4-6):
- Friend challenges
- Tournament mode
- Mobile app
- Advanced analytics dashboard

### 13.4 Cost Summary by Phase

| Phase | Users | Infrastructure | Development | Total Year 1 |
|-------|-------|----------------|-------------|--------------|
| **Phase 1** | 0-500 | $30/mo | $19,500 | $21,860 |
| **Phase 2** | 500-1,000 | $84/mo | +$5,000 | $26,860 |
| **Phase 3** | 1,000-10,000 | $300/mo | +$8,000 | $34,860 |

---

## 14. SUCCESS METRICS

### 14.1 Phase 1 Launch Goals (First 3 Months)

**User Metrics**:
- **Target**: 200+ total registered users
- **Active Users**: 50-100 daily active users
- **Retention**: 60%+ retention rate (7 days)
- **Engagement**: 6+ minutes average session time
- **Puzzles**: 1,000+ puzzles solved per week

**Technical Metrics**:
- **Response Time**: <100ms API response (P95)
- **Uptime**: 99.5%+ uptime
- **Error Rate**: <0.1% of requests
- **Load**: <50% server CPU/RAM usage
- **Database**: <50ms query time average

**Business Metrics**:
- **Cost per User**: ~$0.15/user/month
- **Infrastructure**: Stay within $30-50/month budget
- **Development**: Launch within 8-10 weeks
- **Satisfaction**: 80%+ user satisfaction score

### 14.2 Growth Goals (Months 4-12)

**User Growth**:
- **Month 6**: 500 registered users, 150 concurrent at peak
- **Month 12**: 1,000-2,000 registered users, 200-500 concurrent

**Engagement**:
- **Session Time**: 8-10 minutes average
- **Daily Puzzles**: 100-200 puzzles solved per day
- **Return Rate**: 40%+ users return within 7 days

**Technical Readiness**:
- **Upgrade Trigger**: Plan upgrade when hitting 500 concurrent
- **Performance**: Maintain <100ms response times
- **Monitoring**: Track all metrics weekly

---

## 15. CONCLUSION

This **Phase 1 production plan** provides a **simple, cost-effective roadmap** for launching Blitzmate with 200 concurrent users, with a clear path to scale to 10,000+ users in the future.

### 🎯 Key Takeaways:

1. **Start Small**: Single server for $30/month (vs $300/month for full scale)
2. **Fast Launch**: 8-10 weeks (vs 16 weeks for full enterprise)
3. **Low Risk**: $21,860 Year 1 total (vs $35,000+ for full scale)
4. **Same Features**: Users get identical experience regardless of architecture
5. **Future-Proof**: Easy upgrade path when you grow

### 💰 Cost Summary:

| Item | Phase 1 (200 users) | Full Scale (10k users) | Savings |
|------|---------------------|------------------------|---------|
| **Development** | $19,500 | $31,500 | **-$12,000** |
| **Monthly Cost** | $30 | $300-500 | **-90%** |
| **Year 1 Total** | $21,860 | $35,000+ | **-$13,000** |
| **Timeline** | 8-10 weeks | 16 weeks | **-50%** |

### 📊 Phase 1 Infrastructure:

**Single VPS Server**:
- 4GB RAM, 2 vCPU, 80GB SSD
- Node.js Backend + PostgreSQL + Redis
- Handles 200 concurrent users comfortably
- Room to grow to 500+ users before upgrade needed
- DigitalOcean Premium Droplet: $24/month

**What's Included**:
- ✅ User authentication (JWT)
- ✅ Level-based puzzle system
- ✅ Complete user tracking (matches, wins, losses, accuracy)
- ✅ Match history
- ✅ Statistics dashboard
- ✅ 10,000+ Lichess puzzles
- ✅ Responsive widget for any website
- ✅ Daily automated backups
- ✅ Free SSL certificate
- ✅ DDoS protection (Cloudflare)

### 🚀 Next Steps:

1. **Review & Approve** this Phase 1 approach
2. **Choose integration method**: iframe, NPM package, or vanilla JS
3. **Sign agreement**: $19,500 development + $30/month hosting
4. **Kick off Week 1**: Server setup + database design
5. **Weekly demos**: See progress every Friday
6. **Beta launch**: Week 7 (soft launch with 20-50 users)
7. **Production launch**: Week 8-10 (full public launch)

### ❓ Questions for Client:

1. **Launch Date**: When do you want to go live? (8-10 weeks from start)
2. **Budget Approval**: $19,500 development + $30/month infrastructure?
3. **Integration Method**: How should we embed the widget?
   - iframe (easiest)
   - React component (best for React sites)
   - Vanilla JS (works everywhere)
4. **User Authentication**: Should we integrate with your existing user system or create new accounts?
5. **Branding**: Keep "Powered by Blitzmate" or white-label (+$100/month)?
6. **Custom Domain**: Use your domain (e.g., chess.clientsite.com) or our subdomain?
7. **Additional Features**: Any must-haves beyond core functionality?

### 🎁 Bonus Features (Can Add Later):

**Phase 2 Enhancements** (Months 2-4):
- Real-time leaderboards
- Achievement badges
- Email notifications
- Social sharing
- Daily challenge

**Phase 3 Advanced** (Months 5-12):
- Friend system
- Private challenges
- Tournament mode
- Mobile apps (iOS/Android)
- Advanced analytics dashboard

---

## 💡 RECOMMENDATION

**Start with Phase 1** (200 users, $30/month, 8-10 weeks)

**Why?**
1. **Prove the concept** with real users before investing heavily
2. **Lower financial risk** ($21k vs $35k in Year 1)
3. **Faster to market** (launch in 2 months vs 4 months)
4. **Same user experience** (users won't notice the difference)
5. **Easy to upgrade** when you need more capacity (can be done in 2-4 hours)

**When to Upgrade?**
- When you consistently hit 500+ concurrent users
- When response times exceed 200ms
- When server CPU/RAM exceeds 70%
- When you want advanced features (tournaments, mobile apps, etc.)

**What Changes When Upgrading?**
- Infrastructure scales up (more servers)
- Costs increase proportionally ($30 → $100 → $300)
- Features can be added incrementally
- **User experience stays the same** (transparent to users)

---

**Prepared by**: Blitzmate Development Team  
**Contact**: [Your Contact Info]  
**Last Updated**: January 2026
