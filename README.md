# 🛍️ Fletchy

**Fletchy** is a modern e-commerce application built with **.NET 9 (C#)** on the backend and **React (TypeScript)** on the frontend.  
It combines traditional e-commerce functionality with **AI-powered shopping experiences**, using intelligent agents to assist users in product discovery and decision-making.

This project is under active development and serves as both a technical portfolio project and a demonstration of full-stack and AI integration.

---

## 📑 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Screenshots](#screenshots)
- [Setup](#setup)
- [Roadmap](#roadmap)
- [Contact](#contact)

---

## 🚀 Features

### ✅ Implemented
- Modern e-commerce UI built with **React + TypeScript**
- Backend REST API using **ASP.NET Core Web API**
- **Entity Framework Core** for data access
- **SQL Server** as the primary database
- **Authentication & Authorization** using ASP.NET Identity
- **Dependency Injection**
- **Docker** support for containerized deployment

### 🔄 In Progress
- Payment Integration** (Stripe / PayPal)  

### 🧠 Planned / Future Implementation
- **AI Shopping Assistant** (LLM-based) — enables smart product recommendations and chat-based search via an external Python AI service integrated with the .NET API.
- **Role Based Authentication  
- **Real-time notifications** using SignalR or WebSocket  

---
## 🧰 Tech Stack

**Frontend:**  
- React  
- TypeScript  
- Vite  
- Tailwind CSS + **Material UI** for modern, responsive design  
- **Zod** for client-side form validation  
- Axios for REST API communication  
- React Router for navigation  

**Backend:**  
- **ASP.NET Core 9 (Web API)** following **RESTful architecture**  
- C#  
- Entity Framework Core  
- ASP.NET Identity for authentication & authorization  
- **SQLite (development)** → **SQL Server (planned for staging/production)**
- Docker for containerization and deployment consistency  

**AI & Agents (planned):**  
- Python microservice for AI-agent communication  
- OpenAI / Hugging Face LLM integration for intelligent shopping assistance  

**Development Tools:**  
- Visual Studio 2022 / VS Code  
- Git & GitHub for version control  
- Docker Desktop for local containerized environments  
---


## 🏗️ Architecture

Fletchy follows a clean **client–server architecture** with a **React** frontend and an **ASP.NET Core Web API** backend.  
The backend communicates with the database using **Entity Framework Core**, and a separate **AI Agent Service** (Python + LLM) is planned for intelligent shopping assistance.

```text
+------------------+         +-------------------------+         +---------------------+
|  User (Browser)  |  HTTPS  |  React SPA (Redux/MUI)  |  Axios  | ASP.NET Core 9 API  |
+------------------+  ----->  +-------------------------+  -----> +---------------------+
        ^                           |   (dispatch)                       |
        |                           v                                     v
        |                   Forms (Zod validate)                 Services / Controllers
        |                           |                                     |
        |                           v                                     v
        |                    Render UI (MUI)                    EF Core (Repositories)
        |                                                                   |
        |                                                                   v
        |                                                           Database Provider
        |                                                        SQLite (Dev) / SQL Server (Prod)
        |                                                                   |
        +-------------------------------------------------------------------+
                                   JSON response (DTOs)
```
---


## Screenshots
---

## ⚙️ Setup

###  Prerequisites
Before running the project, make sure you have the following installed:

- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)  
- [Node.js (v18+)](https://nodejs.org/) and npm  
- [Git](https://git-scm.com/)  
- SQL Server *(optional, for production or staging)*  

> **Note:**  
> The project uses **SQLite** for local development and will later transition to **SQL Server** for staging/production environments.


###  Clone the Repository
```bash
git clone https://github.com/Safin-Sarker/Fletchy.git
cd Fletchy
```

### ⚙️ Backend Setup (ASP.NET Core API)
```bash
cd API
```
1.Restore dependencies
```bash
dotnet restore
```
2.Apply database migrations (for SQLite development)
```bash
dotnet ef database update

```

3.Run the API
```bash
dotnet run

```


4.Once running, the backend will be available at:
```bash
http://localhost:5000

```
💡 The backend uses SQLite for local development (appsettings.Development.json).
To use SQL Server in staging/production, update your connection string in appsettings.Production.json and set:

```bash
set ASPNETCORE_ENVIRONMENT=Production

```


### ⚙️ Frontend Setup (React + TypeScript)

```bash
cd ../Client

```

1.Install dependencies

```bash
npm install

```

2.Start the development server
```bash
npm run dev

```

2.Start the development server

```bash
http://localhost:5173

```

----

## 🗺️ Roadmap

The roadmap outlines the planned milestones for the Fletchy project — from the core e-commerce foundation to advanced AI-powered features.

| Phase | Milestone | Description | Status |
|:------|:-----------|:-------------|:--------|
| **Phase 1** | 🏗️ Project Setup & Architecture | Initialize ASP.NET Core 9 Web API, React TypeScript client, and SQLite setup | ✅ Completed |
| **Phase 2** | 🔐 Authentication & Authorization | Implement ASP.NET Identity for user registration, login, and JWT authentication | ✅ Completed |
| **Phase 3** | 🧾 Product Management | Implement product listing, pagination, and filtering with EF Core | ✅ Completed |
| **Phase 4** | 💳 Payment Integration | Integrate Stripe / PayPal for secure checkout and order processing | 🔄 In Progress |
| **Phase 5** | 🧑‍💻 Role-Based Authorization | Add admin and customer roles for restricted operations and dashboards | ⏳ Planned |
| **Phase 6** | 🔔 Real-Time Notifications | Implement SignalR / WebSocket for real-time order and payment updates | ⏳ Planned |
| **Phase 7** | 🤖 AI Shopping Assistant | Integrate AI microservice (Python + FastAPI + LLM) for chat-based product recommendations and semantic search | ⏳ Planned |
| **Phase 8** | 🧱 Deployment & Containerization | Dockerize both frontend and backend; deploy to cloud (Azure/AWS) | ⏳ Planned |
| **Phase 9** | 🧪 Testing & Optimization | Add unit tests (NUnit/xUnit), improve API performance, and introduce CI/CD | ⏳ Planned |

---

### 🧭 Long-Term Vision
- Integrate a **personalized recommendation system** powered by embeddings (OpenAI/Hugging Face).  
- Add **analytics dashboard** for admins (sales insights, customer trends).  
- Enable **multi-language and multi-currency** support.  
- Deploy AI service independently as a **microservice** with API gateway routing.  

---

### ✅ Current Focus
> - Finalizing **payment workflow**  
> - Preparing backend for **role-based authorization**  
> - Early design of **AI assistant architecture**

---

## 📬 Contact

**Md Safin Sarker**

- 💼 LinkedIn: https://www.linkedin.com/in/safin-sarker/
- 🐙 GitHub: https://github.com/Safin-Sarker  
- ✉️ Email: safinsarker1122@gmail.com








