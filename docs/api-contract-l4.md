# API Contract – Smart CRM Mekong Mobile

<div align="center">

## LUỒNG NGHIỆP VỤ L4
### Phân công kỹ thuật viên và quản lý lịch hẹn

**Sinh viên:** Hà Đại Vĩ  
**MSSV:** `2374802010551`  
**Track:** SE – Software Engineering

**Backend:** Flask · **ORM:** Flask-SQLAlchemy · **Database:** SQLite

</div>

---

## 1. Tổng quan

### 1.1. Công nghệ và kiến trúc

| Thành phần | Công nghệ / file |
|---|---|
| Ngôn ngữ | Python |
| Backend framework | Flask |
| ORM | Flask-SQLAlchemy / SQLAlchemy |
| Cơ sở dữ liệu | SQLite |
| Controller | `src/controllers/appointment_controller.py` |
| Service | `src/services/appointment_service.py` |
| Repository | `src/repositories/appointment_repository.py` |
| Model | `src/models/appointment.py` |
| Khởi tạo ứng dụng | `app.py` |

### 1.2. Danh sách endpoint tìm thấy trong source

| Method | Endpoint | Chức năng | Trạng thái theo source |
|---|---|---|---|
| GET | `/` | Kiểm tra backend đang hoạt động | Đã khai báo |
| PUT | `/api/appointments/{appointment_id}/assign` | Gán kỹ thuật viên cho lịch hẹn | Đã khai báo |
---

## 2. GET /

### Mục đích

Kiểm tra Flask backend đã khởi động và có thể nhận request hay chưa.

### Request

```http
GET /
```

Không yêu cầu Path Parameter, Query Parameter hoặc Request Body.

### Response – 200 OK

```json
{
  "message": "Mekong Mobile Smart CRM API - Module L4 is running!"
}
```

### Nguồn triển khai

Route được khai báo trực tiếp trong `app.py`:

```python
@app.route('/')
def home():
    return {"message": "Mekong Mobile Smart CRM API - Module L4 is running!"}, 200
```

---

## 3. PUT /api/appointments/{appointment_id}/assign

### Mục đích

Phân công một kỹ thuật viên cho một lịch hẹn có sẵn. API cập nhật `technician_id` và chuyển trạng thái lịch hẹn thành `Assigned`.

### 3.1. Thông tin endpoint

| Thuộc tính | Giá trị |
|---|---|
| HTTP Method | `PUT` |
| Endpoint | `/api/appointments/{appointment_id}/assign` |
| Content-Type | `application/json` |
| Path Parameter | `appointment_id` |
| Chức năng | Phân công kỹ thuật viên cho lịch hẹn |

### 3.2. Path Parameter

| Tên | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| `appointment_id` | Integer | Có | ID của lịch hẹn cần phân công |

Flask khai báo `<int:appointment_id>`, vì vậy giá trị trên URL phải được chuyển đổi thành số nguyên. URL không khớp kiểu này sẽ không đi vào hàm xử lý của endpoint.

### 3.3. Request Body

Ví dụ:

```http
PUT /api/appointments/1/assign
Content-Type: application/json
```

```json
{
  "technician_id": 1
}
```

| Trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| `technician_id` | Integer | Có | ID kỹ thuật viên cần phân công |

Trong Controller, dữ liệu được đọc bằng `request.get_json() or {}` và lấy trường `technician_id`.

### 3.4. Quy trình xử lý

1. Client gửi request `PUT` kèm `appointment_id` trên URL.
2. Controller đọc `technician_id` từ JSON body.
3. Service kiểm tra `appointment_id` và `technician_id` không bị thiếu hoặc có giá trị falsy.
4. Repository tìm lịch hẹn theo `appointment_id`.
5. Nếu không tìm thấy lịch hẹn, Service phát sinh `LookupError`.
6. Repository tìm kỹ thuật viên theo `technician_id`.
7. Nếu không tìm thấy kỹ thuật viên, Service phát sinh `LookupError`.
8. Repository cập nhật `appointment.technician_id` và `appointment.status = "Assigned"`.
9. Repository gọi `db.session.commit()` để lưu thay đổi.
10. Controller trả JSON với HTTP `200`.

### 3.5. Response – 200 OK

Controller trả về object theo cấu trúc:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "customer_name": "Nguyễn Văn Minh",
    "device_info": "iPhone 14",
    "appointment_date": "2025-09-10 09:00:00",
    "status": "Assigned",
    "technician_id": 1
  }
}
```

Đây là ví dụ minh họa định dạng dữ liệu. Giá trị và dữ liệu cụ thể phụ thuộc vào bản ghi thực tế trong SQLite. Các trường trong `data` căn cứ theo phương thức `Appointment.to_dict()` trong model.

### 3.6. Error – 400 Bad Request

Xảy ra khi Service nhận `appointment_id` hoặc `technician_id` không có giá trị hợp lệ theo kiểm tra `if not ...`.

Ví dụ thiếu `technician_id`:

**Request**

```http
PUT /api/appointments/1/assign
Content-Type: application/json
```

```json
{}
```

**Response**

```json
{
  "success": false,
  "error": "Mã lịch hẹn và mã kỹ thuật viên không được để trống."
}
```

Lưu ý: nội dung thông báo là chuỗi được khai báo trong `AppointmentService`.

### 3.7. Error – 404 Not Found

Xảy ra khi không tìm thấy lịch hẹn hoặc kỹ thuật viên tương ứng.

**Trường hợp không tìm thấy lịch hẹn:**

```json
{
  "success": false,
  "error": "Không tìm thấy lịch hẹn."
}
```

**Trường hợp không tìm thấy kỹ thuật viên:**

```json
{
  "success": false,
  "error": "Không tìm thấy kỹ thuật viên."
}
```

Nếu Repository không trả dữ liệu sau khi cập nhật, Service cũng phát sinh `LookupError` với thông báo:

```json
{
  "success": false,
  "error": "Không thể cập nhật phân công."
}
```

### 3.8. Error – 500 Internal Server Error

Controller có nhánh `except Exception` để bắt lỗi ngoài dự kiến:

```json
{
  "success": false,
  "error": "Nội dung lỗi phát sinh"
}
```

Giá trị `error` thực tế được lấy từ `str(e)`, vì vậy có thể thay đổi tùy lỗi. Controller cũng in traceback ra Terminal.

**Lưu ý kỹ thuật:** Với code hiện tại, JSON sai định dạng có thể phát sinh `BadRequest` trong `request.get_json()`. Vì ngoại lệ này không được bắt riêng thành HTTP 400 mà rơi vào `except Exception`, Controller có thể trả HTTP 500. Không nên ghi nhận JSON sai định dạng chắc chắn trả 400 nếu chưa sửa code hoặc kiểm thử xác nhận.

### 3.9. Bảng mã HTTP

| HTTP status | Ý nghĩa | Điều kiện theo code |
|---|---|---|
| `200` | OK | Cập nhật phân công thành công |
| `400` | Bad Request | Service phát sinh `ValueError` do thiếu ID |
| `404` | Not Found | Service phát sinh `LookupError` khi không tìm thấy dữ liệu hoặc không cập nhật được |
| `500` | Internal Server Error | Ngoại lệ khác được Controller bắt tại `except Exception` |

---

## 4. Quy tắc nghiệp vụ

Các quy tắc dưới đây chỉ mô tả điều kiện có trong source code hiện tại.

| Mã | Quy tắc | Căn cứ source |
|---|---|---|
| BR1 | Mã lịch hẹn và mã kỹ thuật viên không được để trống. | `AppointmentService.assign_technician()` |
| BR2 | Lịch hẹn phải tồn tại trước khi phân công. | `repository.find_by_id()` |
| BR3 | Kỹ thuật viên phải tồn tại trước khi phân công. | `repository.find_technician_by_id()` |
| BR4 | Khi phân công thành công, cập nhật `technician_id` cho lịch hẹn. | `AppointmentRepository.update_technician()` |
| BR5 | Trạng thái lịch hẹn sau khi phân công được đặt thành `Assigned`. | Service truyền `status="Assigned"` |
| BR6 | Thay đổi được lưu bằng `db.session.commit()`. | Repository |

### 4.1. Các điều kiện chưa thấy triển khai trong source

Không tìm thấy logic tương ứng trong Service/Repository hiện tại cho các điều kiện sau:

- Kiểm tra kỹ thuật viên có trạng thái `Available` trước khi phân công.
- Kiểm tra kỹ thuật viên có đúng chuyên môn với thiết bị/sự cố.
- Kiểm tra kỹ thuật viên thuộc cùng trung tâm hoặc khu vực.
- Kiểm tra giới hạn khối lượng công việc.
- Kiểm tra lịch hẹn bị trùng thời gian.
- Kiểm tra lịch hẹn chỉ được phân công khi đang ở trạng thái `Pending`.
- Ghi nhận lý do thay đổi kỹ thuật viên.
- Gửi SMS hoặc thông báo cho khách hàng.

Model có trường `Technician.status`, nhưng việc có trường dữ liệu không đồng nghĩa API đã kiểm tra trường đó trong nghiệp vụ phân công.

---

## 5. Cấu trúc dữ liệu liên quan

### 5.1. Model Technician

Bảng: `technicians`

| Trường | Kiểu dữ liệu | Ràng buộc / mặc định | Mô tả |
|---|---|---|---|
| `id` | Integer | Primary Key | Mã kỹ thuật viên |
| `name` | String(100) | NOT NULL | Họ tên kỹ thuật viên |
| `specialty` | String(100) | Nullable | Chuyên môn sửa chữa |
| `status` | String(50) | Default `Available` | Trạng thái kỹ thuật viên |

Giá trị `status` được ghi chú trong model gồm `Available`, `Busy`, `Offline`.

### 5.2. Model Appointment

Bảng: `appointments`

| Trường | Kiểu dữ liệu | Ràng buộc / mặc định | Mô tả |
|---|---|---|---|
| `id` | Integer | Primary Key | Mã lịch hẹn |
| `customer_name` | String(100) | NOT NULL | Tên khách hàng |
| `device_info` | String(150) | NOT NULL | Thông tin thiết bị mang đi sửa |
| `appointment_date` | DateTime | NOT NULL, default `datetime.utcnow` | Ngày giờ hẹn |
| `status` | String(50) | Default `Pending` | Trạng thái lịch hẹn |
| `technician_id` | Integer | Nullable, Foreign Key → `technicians.id` | Kỹ thuật viên được phân công |

Các trạng thái được ghi chú trong model gồm `Pending`, `Assigned`, `Completed`, `Cancelled`.

### 5.3. Dữ liệu trả về của Appointment

Phương thức `to_dict()` trả về:

```json
{
  "id": 1,
  "customer_name": "Nguyễn Văn Minh",
  "device_info": "iPhone 14",
  "appointment_date": "2025-09-10 09:00:00",
  "status": "Assigned",
  "technician_id": 1
}
```

`appointment_date` được định dạng chuỗi `YYYY-MM-DD HH:MM:SS`.

---

## 6. Kiến trúc phân lớp

| Lớp | File | Trách nhiệm |
|---|---|---|
| Controller | `src/controllers/appointment_controller.py` | Nhận HTTP request, gọi Service, trả JSON và HTTP status |
| Service | `src/services/appointment_service.py` | Kiểm tra đầu vào, kiểm tra tồn tại và điều phối nghiệp vụ |
| Repository | `src/repositories/appointment_repository.py` | Truy vấn/cập nhật model và commit database |
| Model | `src/models/appointment.py` | Khai báo SQLAlchemy model `Appointment`, `Technician` và `db` |

### 6.1. Controller

Blueprint:

```python
appointment_bp = Blueprint('appointment', __name__)
```

Route:

```python
@appointment_bp.route(
    '/api/appointments/<int:appointment_id>/assign',
    methods=['PUT']
)
def assign_appointment(appointment_id):
    ...
```

### 6.2. Service

Phương thức nghiệp vụ chính:

```python
AppointmentService.assign_technician(appointment_id, technician_id)
```

Service kiểm tra dữ liệu, kiểm tra sự tồn tại của hai đối tượng và yêu cầu Repository cập nhật phân công.

### 6.3. Repository

| Phương thức | Chức năng |
|---|---|
| `find_by_id(appointment_id)` | Tìm lịch hẹn theo ID |
| `find_technician_by_id(technician_id)` | Tìm kỹ thuật viên theo ID |
| `update_technician(appointment_id, technician_id, status)` | Cập nhật kỹ thuật viên và trạng thái lịch hẹn, sau đó commit |

### 6.4. Khởi tạo ứng dụng

`app.py` thực hiện:

- Tạo Flask application.
- Cấu hình SQLite bằng `sqlite:///mekong_crm.db`.
- Khởi tạo SQLAlchemy.
- Đăng ký `appointment_bp`.
- Tạo bảng bằng `db.create_all()` trong khối chạy trực tiếp.
- Chạy Flask ở port `5000` với `debug=True`.

---

## 7. Hướng dẫn chạy và kiểm thử

### 7.1. Cài đặt môi trường

Tại thư mục gốc project:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### 7.2. Khởi động backend

```powershell
python app.py
```

Theo cấu hình trong `app.py`, Flask chạy tại:

```text
http://127.0.0.1:5000
```

Khi chạy trực tiếp, ứng dụng gọi `db.create_all()` để tạo các bảng chưa tồn tại.

### 7.3. Kiểm tra backend

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:5000/" -Method GET
```

Kết quả mong đợi: object JSON có trường `message` thông báo API đang hoạt động.

### 7.4. Kiểm thử phân công thành công

Cần bảo đảm database có lịch hẹn ID `1` và kỹ thuật viên ID `1` trước khi chạy:

```powershell
$body = @{ technician_id = 1 } | ConvertTo-Json

Invoke-RestMethod `
    -Uri "http://127.0.0.1:5000/api/appointments/1/assign" `
    -Method PUT `
    -ContentType "application/json" `
    -Body $body
```

Kết quả mong đợi khi hai bản ghi tồn tại: HTTP `200`, `success = true`, dữ liệu lịch hẹn nằm trong `data`.

### 7.5. Kiểm thử thiếu technician_id

```powershell
$body = @{} | ConvertTo-Json

try {
    Invoke-RestMethod `
        -Uri "http://127.0.0.1:5000/api/appointments/1/assign" `
        -Method PUT `
        -ContentType "application/json" `
        -Body $body
}
catch {
    $_.Exception.Response.StatusCode
}
```

Kết quả mong đợi: HTTP `400`, do Service phát sinh `ValueError`.

### 7.6. Kiểm thử lịch hẹn không tồn tại

```powershell
$body = @{ technician_id = 1 } | ConvertTo-Json

try {
    Invoke-RestMethod `
        -Uri "http://127.0.0.1:5000/api/appointments/9999/assign" `
        -Method PUT `
        -ContentType "application/json" `
        -Body $body
}
catch {
    $_.Exception.Response.StatusCode
}
```

Kết quả mong đợi: HTTP `404` nếu ID `9999` không tồn tại.

### 7.7. Kiểm thử kỹ thuật viên không tồn tại

Điều kiện: lịch hẹn ID `1` tồn tại, kỹ thuật viên ID `9999` không tồn tại.

```powershell
$body = @{ technician_id = 9999 } | ConvertTo-Json

try {
    Invoke-RestMethod `
        -Uri "http://127.0.0.1:5000/api/appointments/1/assign" `
        -Method PUT `
        -ContentType "application/json" `
        -Body $body
}
catch {
    $_.Exception.Response.StatusCode
}
```

Kết quả mong đợi: HTTP `404`.

### 7.8. Bảng test case

| Test case | Dữ liệu kiểm thử | HTTP mong đợi | Ghi chú |
|---|---|---:|---|
| TC01 | Lịch hẹn và kỹ thuật viên tồn tại | 200 | Phân công thành công |
| TC02 | Body `{}` | 400 | Thiếu `technician_id` |
| TC03 | `appointment_id` không tồn tại | 404 | Không tìm thấy lịch hẹn |
| TC04 | `technician_id` không tồn tại | 404 | Không tìm thấy kỹ thuật viên |
| TC05 | JSON sai định dạng | Cần xác minh | Code hiện tại có thể rơi vào nhánh 500 |

**Chú ý:** Đây là kết quả mong đợi suy ra từ code, không phải kết quả kiểm thử đã chạy. Cần cập nhật Pass/Fail và ảnh minh chứng sau khi thực thi trên máy.

---

## 8. Giới hạn triển khai và hướng phát triển

Các chức năng sau có thể là hướng phát triển tiếp theo, nhưng chưa có route backend tương ứng trong source ZIP đã rà soát:

- API tạo, xem danh sách, xem chi tiết, cập nhật và xóa lịch hẹn.
- API lấy danh sách kỹ thuật viên và lọc kỹ thuật viên phù hợp.
- Kiểm tra trạng thái khả dụng, chuyên môn và workload của kỹ thuật viên.
- Kiểm tra trùng lịch hẹn theo thời gian.
- API xem lịch làm việc/công việc của từng kỹ thuật viên.
- API cập nhật trạng thái công việc.
- Gửi SMS/thông báo xác nhận lịch hẹn cho khách hàng.
- Kiểm tra dữ liệu JSON sai định dạng và chuẩn hóa response lỗi 400.
- Bổ sung kiểm thử tích hợp với SQLite và kiểm thử các trường hợp lỗi.

---

## 9. Tài liệu và mã nguồn liên quan

| File | Vai trò |
|---|---|
| `app.py` | Khởi tạo Flask, SQLite, SQLAlchemy và đăng ký Blueprint |
| `src/controllers/appointment_controller.py` | Khai báo API phân công lịch hẹn |
| `src/services/appointment_service.py` | Logic phân công kỹ thuật viên |
| `src/repositories/appointment_repository.py` | Truy vấn và cập nhật dữ liệu |
| `src/models/appointment.py` | Model Appointment, Technician và cấu hình SQLAlchemy |
| `tests/test_appointment.py` | Unit test cho Service phân công kỹ thuật viên |
| `requirements.txt` | Danh sách thư viện backend |
| `frontend/src/App.jsx` | Giao diện React gọi API phân công |

### Phân biệt API backend và giao diện frontend

Trong `frontend/src/App.jsx`, nút xác nhận gọi:

```javascript
axios.put(
  `http://127.0.0.1:5000/api/appointments/1/assign`,
  { technician_id: selectedTech || 1 }
);
```

Đây là lời gọi đến endpoint PUT đã khai báo trong Flask. Các màn hình lịch trình, cập nhật trạng thái công việc và xác nhận khách hàng trong giao diện hiện có dữ liệu hiển thị minh họa; không tìm thấy endpoint backend tương ứng trong các controller của project.

