# Smart CRM – Mekong Mobile (Module L4: Technician Assignment & Appointment Management)

**Course:** Graduation Capstone Project 1 (Chuyên đề Tốt nghiệp 1) – Track SE (Software Engineering)  
**Author:** Hà Đại Vĩ (`2374802010551`)  
**Release:** `v1.0.0` (BT3 Packaged Prototype & Technical Documentation)

---

## 1. Project Overview

**Smart CRM – Mekong Mobile** is a service-operations prototype designed for mobile device repair workflows. This repository implements **Business Flow L4: Technician Assignment and Appointment Management**, enabling dispatchers to assign available technicians to customer repair appointments and persist state transitions in a relational database.

### Implemented Scope vs. UI Prototype Scope
* **Backend API (Implemented & Verified):**
  * Health check endpoint (`GET /`).
  * Technician assignment endpoint (`PUT /api/appointments/<appointment_id>/assign`) with input validation, entity existence checks, and SQLite state persistence (`Pending` $\rightarrow$ `Assigned`).
  * Automated idempotent database initialization (`db.create_all()`) and demo data seeding upon startup.
* **Frontend UI (Interactive Prototype):**
  * Screen 1 (*Dispatch & Assignment*): Connects directly to `PUT /api/appointments/1/assign` via Axios.
  * Screen 2 (*Technician Schedule*) & Screen 3 (*Customer Confirmation*): Interactive UI views demonstrating workflow transitions using prototype mock state.

---

## 2. System Architecture & Design Decisions

### 2.1. Layered Backend Architecture
The backend follows a strict **4-layer architecture** (Controller $\rightarrow$ Service $\rightarrow$ Repository $\rightarrow$ Model) to decouple HTTP transport concerns from business validation and SQLAlchemy persistence:

```mermaid
flowchart LR
    UI[React + Vite Frontend<br/>Port 5173] -->|HTTP PUT / JSON| CTRL[AppointmentController<br/>src/controllers]
    CTRL -->|Validated DTO| SVC[AppointmentService<br/>src/services]
    SVC -->|Domain Calls| REPO[AppointmentRepository<br/>src/repositories]
    REPO -->|SQLAlchemy ORM| DB[(SQLite Database<br/>instance/mekong_crm.db)]