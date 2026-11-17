

| Bug ID | Module | Severity | Status | Summary |
|:---:|---|:---:|:---:|---|
| **BUG-001** | Database Seeding | Medium | ✅ Fixed | Non-idempotent `INSERT INTO` caused primary key collision on re-run. |
| **BUG-002** | Unit Testing (`pytest`) | Medium | ✅ Fixed | Error message mismatch between `AppointmentService` and `test_assign_technician_not_found`. |
| **BUG-003** | Cross-Origin / Containerization | High | ✅ Fixed | Browser blocked cross-origin `PUT` requests from port `5173` to `5000` without CORS headers. |

---

**Summary:** 3 bugs identified and fixed.

---

## BUG-001: Seed Script Failed on Repeated Execution
* **Module:** Database Initialization (`docs/seed.sql` & `app.py`)
* **Severity:** Medium
* **Status:** Fixed
* **Description:** Initial seed statements used standard `INSERT INTO` with explicit primary keys (`id = 1, 2, 3`). Running the script twice on an existing SQLite database triggered `UNIQUE constraint failed`.
* **Root Cause:** Lack of idempotency handling in database initialization scripts.
* **Resolution:** Updated SQL seed statements to `INSERT OR IGNORE INTO` and implemented an idempotent `seed_initial_data()` check in `app.py` before inserting demo records.
* **Verification:** Executed database initialization across multiple container restarts; record counts remained stable without duplicate rows or constraint errors.

---

## BUG-002: Assertion Mismatch in Boundary Unit Test
* **Module:** Unit Test Suite (`tests/test_appointment.py`)
* **Severity:** Medium
* **Status:** Fixed
* **Description:** `test_assign_technician_not_found` initially asserted an outdated exception message that did not match the exact `LookupError` string raised by `AppointmentService.assign_technician()`.
* **Root Cause:** Service error string was refined during controller exception standardization (`404 Not Found`), leaving the test regex out of sync.
* **Resolution:** Aligned `pytest.raises(LookupError, match="Không tìm thấy lịch hẹn.")` in `tests/test_appointment.py` with `src/services/appointment_service.py`.
* **Verification:** `pytest -v` passes all 3 test cases (`3 passed`).

---

## BUG-003: Cross-Origin Resource Sharing (CORS) Block Between Frontend and Backend Containers
* **Module:** Backend API (`app.py`)
* **Severity:** High
* **Status:** Fixed
* **Description:** When running Frontend (`http://localhost:5173`) and Backend (`http://localhost:5000`) as separate services/containers, browser preflight `OPTIONS` requests for `PUT /api/appointments/1/assign` were rejected due to missing `Access-Control-Allow-Origin` headers.
* **Root Cause:** Flask does not attach CORS headers by default.
* **Resolution:** Added `Flask-Cors==5.0.1` to `requirements.txt` and initialized `CORS(app)` inside `create_app()` in `app.py`.
* **Verification:** Verified `PUT` request succeeds from the React UI in browser with HTTP `200 OK`.
