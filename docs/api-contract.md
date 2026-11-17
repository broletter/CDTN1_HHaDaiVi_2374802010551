---
```markdown

**Module:** L4 – Technician Assignment & Appointment Management  
**Base URL:** `http://localhost:5000`  
**Content-Type:** `application/json`

---

## 1. Endpoints Summary

| Method | Path | Summary | Implementation Status |
|---|---|---|---|
| `GET` | `/` | API health check | Implemented (`app.py`) |
| `PUT` | `/api/appointments/{appointment_id}/assign` | Assign technician to appointment | Implemented (`appointment_controller.py`) |

---

## 2. `GET /` – Health Check

### Request
```http
GET / HTTP/1.1
Host: localhost:5000