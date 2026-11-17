---

```markdown
# Checklist Bảo mật & An toàn Đóng gói (Security Checklist – BT3)

| STT | Hạng mục kiểm tra | Trạng thái | Minh chứng cụ thể trong dự án |
| :--- | :--- | :--- | :--- |
| **1** | **Không hardcode mật khẩu / API Key / Secret trong mã nguồn** | **ĐÃ LÀM** | Đã rà soát toàn bộ `app.py`, `src/`, `frontend/` không chứa secret key; các biến cấu hình môi trường được tách ra `.env.example` và `.env` (đã chặn trong `.gitignore`). |
| **2** | **Không đẩy file cơ sở dữ liệu cục bộ (`.db`) hoặc `.env` lên Git** | **ĐÃ LÀM** | File `.gitignore` đã khai báo loại trừ `instance/`, `*.db`, `*.sqlite`, `.env`, `__pycache__/`, và `frontend/node_modules/`. |
| **3** | **Kiểm tra & làm sạch dữ liệu đầu vào (Input Validation)** | **ĐÃ LÀM** | `AppointmentService.assign_technician()` kiểm tra giá trị rỗng/null (`ValueError` $\rightarrow$ HTTP 400); route Flask dùng `<int:appointment_id>` ép kiểu số nguyên và SQLAlchemy ORM tham số hóa truy vấn chống SQL Injection. |
| **4** | **Kiểm soát CORS (Cross-Origin Resource Sharing)** | **ĐÃ LÀM** | Đã cấu hình `Flask-Cors` trong `app.py` (`CORS(app)`) để cho phép Frontend (`localhost:5173`) gọi API Backend (`localhost:5000`) hợp lệ. |
| **5** | **Xác thực & Phân quyền người dùng (Authentication / RBAC)** | **CHƯA LÀM** | Hệ thống đang ở mức Prototype tập trung vào luồng nghiệp vụ L4 nên chưa triển khai JWT/Session Login; đã ghi nhận trong mục *Giới hạn hiện tại* của `README.md`. |
| **6** | **Mã hóa đường truyền HTTPS / TLS** | **KHÔNG ÁP DỤNG** | Ứng dụng chạy đóng gói cục bộ qua Docker Compose (`http://localhost:5000` và `5173`) phục vụ kiểm thử nội bộ, chưa triển khai lên domain production. |
| **7** | **Giới hạn tần suất gọi API (Rate Limiting) & Security Headers** | **CHƯA LÀM** | Chưa tích hợp `Flask-Limiter` hay reverse proxy Nginx cấu hình CSP/HSTS; dự kiến bổ sung khi mở rộng hệ thống ở giai đoạn sau. |