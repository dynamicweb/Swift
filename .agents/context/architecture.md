# Architecture — Dynamicweb10

## Overview

Dynamicweb10 is the monorepo for **Dynamicweb CMS** (v10.25.0-PreRelease), a .NET-based platform providing content management, e-commerce, data integration, scheduling, and extensibility. It multi-targets `net10.0` and `net8.0`.

---

## Solution Layers

```
┌─────────────────────────────────────────────────────────┐
│  Hosts                                                  │
│  Dynamicweb.CoreUI.Host  /  Dynamicweb.Host.Core        │
├─────────────────────────────────────────────────────────┤
│  Application / Providers                                │
│  src/Application/Providers/  (DataIntegration, AI,      │
│  OTEL, Rendering, Auth, LoadBalancing, Indexing)        │
├─────────────────────────────────────────────────────────┤
│  Features                                               │
│  src/Features/  (Content, Ecommerce, DataIntegration,   │
│  Users, Forms, Frontend, Tracking, EmailMarketing,      │
│  QueryPublisher, DataPortability)                       │
├─────────────────────────────────────────────────────────┤
│  Core                                                   │
│  src/Core/  (Caching, Config, Data, Extensibility,      │
│  Environment, Imaging, Indexing, Logging, Mailing,      │
│  Scheduling, Security, SmartSearch, Updates, ...)       │
├─────────────────────────────────────────────────────────┤
│  Standalone Services                                    │
│  Dynamicweb.Scheduler  /  Dynamicweb.Marketplace        │
└─────────────────────────────────────────────────────────┘
```

---

## Project Map

### Hosts

| Project | Description |
|---------|-------------|
| `Dynamicweb.CoreUI.Host` | Main ASP.NET Core web host |
| `Dynamicweb.Host.Core` | Shared host infrastructure (middleware, startup) |
| `Dynamicweb.CoreUI.Rendering/` | TypeScript/npm frontend — must `npm run build` before hosting |

### Application / Providers (`src/Application/Providers/`)

| Project | Description |
|---------|-------------|
| `Dynamicweb.DataIntegration.Providers.CsvProvider` | CSV source/destination provider |
| `Dynamicweb.DataIntegration.Providers.ExcelProvider` | Excel source/destination provider |
| `Dynamicweb.AI.Azure` | Azure OpenAI integration |
| `Dynamicweb.AI.MsExtensionsAI` | Microsoft.Extensions.AI integration |
| `Dynamicweb.OpenTelemetry.Azure` | Azure Monitor / OTEL exporter |
| `Dynamicweb.Indexing.Lucene4` | Lucene-based search index |
| `Dynamicweb.LoadBalancing` | Load balancing provider |
| `Dynamicweb.Rendering.Providers.NetCore` | .NET Core rendering adapter |
| `Dynamicweb.ExternalAuthentication` | External auth provider base |

### Features (`src/Features/`)

| Project | Domain |
|---------|--------|
| `Content/Dynamicweb` | CMS — pages, modules, routing, Razor rendering |
| `Ecommerce/Dynamicweb.Ecommerce` | Commerce — products, orders, cart, pricing, shops, international, discounts |
| `DataIntegration/Dynamicweb.DataIntegration` | ETL — jobs, mappings, providers, source/destination writers |
| `Users/` | User management, user groups, external login |
| `Forms/` | Form builder and submission handling |
| `Tracking/` | Analytics, event tracking |
| `Frontend/` | Classic frontend API (products, content) |
| `EmailMarketing/` | Email campaign management |
| `QueryPublisher/` | Query-based data feed publishing |
| `DataPortability/` | GDPR data export |

### Core Libraries (`src/Core/`)

| Library | Responsibility |
|---------|---------------|
| `Dynamicweb.Core` | Primitives: strings, dates, reflection, service locator |
| `Dynamicweb.Caching` | `ICacheManager` — memory/distributed cache abstraction |
| `Dynamicweb.Configuration` | `ISystemConfigurationProvider`, settings XML |
| `Dynamicweb.Data` | SQL helpers, connection management |
| `Dynamicweb.Extensibility` | `DependencyProvider`, `AddIn` system, `Notifications` observer pattern |
| `Dynamicweb.Environment` | Request context, virtual paths, file system abstraction |
| `Dynamicweb.Imaging` | Image manipulation and caching |
| `Dynamicweb.Indexing` | Search index abstraction + task scheduling for indexing |
| `Dynamicweb.Logging` | Structured logging abstraction |
| `Dynamicweb.Mailing` | Email sending abstraction |
| `Dynamicweb.Scheduling` | Scheduled task AddIn infrastructure |
| `Dynamicweb.Security` | Permissions, cryptography, user sessions |
| `Dynamicweb.SmartSearch` | Full-text search orchestration |
| `Dynamicweb.Updates` | Database migration / update scripts |
| `Dynamicweb.Deployment` | Deployment utilities |
| `Dynamicweb.Dashboard` | Admin dashboard widgets |

### Standalone Services

| Project | Description |
|---------|-------------|
| `Dynamicweb.Scheduler` | Windows/Linux scheduling service |
| `Dynamicweb.Marketplace` | Marketplace add-on management |

---

## Dependency Flow

```
Host → Application/Providers → Features → Core
                               ↑
                    (Ecommerce ← Content, EmailMarketing)
                    (DataIntegration ← Ecommerce, Content, Marketplace, Scheduler)
```

Key inter-feature dependencies (from `.csproj` references):
- `DataIntegration` depends on: `Ecommerce`, `Content` (`Dynamicweb`), `Marketplace`, `Scheduler`
- `Ecommerce` depends on: `Content` (`Dynamicweb`), `EmailMarketing`

---

## DI Architecture

All service registration flows through `DependencyProvider` subclasses. Each project defines its own `XxxDependencyProvider : DependencyProvider` and overrides `ConfigureServices(DependencyContainer container)`. The host discovers providers via reflection at startup.

```csharp
// Pattern
internal sealed class CoreDependencyProvider : DependencyProvider
{
    protected override void ConfigureServices(DependencyContainer container)
    {
        container.AddSingleton<ICacheManager, MemoryCacheManager>();
        container.AddSingleton<ISystemConfigurationProvider, DefaultSystemConfigurationProvider>();
        // ...
    }
}
```

---

## Extensibility Model

- **Add-ins**: classes decorated with `[AddInName]`, `[AddInDescription]` from `Dynamicweb.Extensibility.AddIns`, discovered via reflection
- **Notifications**: typed observer pattern — `Notification<T>` subscribers registered via `NotificationManager`
- **DataIntegration providers**: extend `BaseProvider` (implements `ISource`, `IDestination`); three required constructors. Built-in providers live under `src/Features/DataIntegration/Dynamicweb.DataIntegration/Providers/`; external providers live under `src/Application/Providers/`

---

## CI/CD Pipeline Architecture

```
Pipelines/
├── DW10.yml                         — master branch: FastBuild + NuGet push
├── DW10 - PR Build.yml              — PR build validation
├── DW10 - PR Test and Analyze.yml   — PR test run + code analysis
├── DW10 - Code review.yml           — automated code review
├── DW10Docker.yml                   — Docker image build
├── DW10-GH-Mirror.yml               — GitHub mirror sync
└── dw10-management-api-tests.yml    — management API integration tests
```

- Build pool: `DW10` (on-premises agent)
- dotnet SDK: 10.0.0 (locked via `global.json`)
- Frontend: npm build cached by `package-lock.json` hash
- Packages published to: `nuget.org` and `core.nuget.dynamicweb-cms.com`

---

## Local Dev Stack (Docker)

```yaml
# docker-compose.yml
services:
  mssql:   MS SQL Edge — database, ports 1433
  sqlpad:  SQL UI — port 3000
  dw:      Dynamicweb CMS — ports 8000 (http), 8001 (https)
```
