API Contract -- Mekong Mobile
Sinh viên: Hà Đại Vĩ
MSSV: 2374802010551
Track: SE (Software Engineering)
Luồng nghiệp vụ: L4 -- Phân công kỹ thuật viên và lịch hẹn

Trạng thái tài liệu: Tài liệu mô tả API theo mã nguồn và phạm vi đã
trao đổi trong quá trình triển khai. Những chức năng chưa có bằng chứng
trong mã nguồn được ghi rõ là chưa xác nhận hoặc chưa triển khai; không
xem API thiết kế là API đã chạy thực tế.
1. Tổng quan
Luồng L4 hỗ trợ việc phân công kỹ thuật viên cho lịch hẹn trong hệ thống
Mekong Mobile.

Backend đang được phát triển bằng:
- Python và Flask.
- SQLAlchemy để thao tác cơ sở dữ liệu.
- SQLite làm cơ sở dữ liệu trong môi trường phát triển.
- Kiến trúc phân lớp: Controller -- Service -- Repository -- Model.
Phạm vi đã xác nhận qua mã nguồn được trao đổi
  Thành phần              Chức năng               Trạng thái
  Appointment Controller  Nhận yêu cầu phân công  Đã có đoạn triển khai
kỹ thuật viên           

  Appointment Service     Kiểm tra dữ liệu, lịch  Đã có đoạn triển khai
hẹn và kỹ thuật viên
trước khi phân công     

  Appointment Repository  Tìm lịch hẹn, tìm kỹ    Đã có đoạn triển khai
thuật viên và cập nhật
phân công               

  Appointment Model       Model lịch hẹn và       Cần đối chiếu mã nguồn
phương thức to_dict() đầy đủ
Technician Model        Model kỹ thuật viên và  Cần đối chiếu mã nguồn
phương thức to_dict() đầy đủ
Lưu ý: Bảng trên phản ánh những đoạn mã đã được cung cấp trong quá
trình trao đổi, không thay thế việc rà soát toàn bộ repository.
2. API phân công kỹ thuật viên
PUT /api/appointments/{appointment_id}/assign
Mục đích: Gán một kỹ thuật viên cho lịch hẹn và cập nhật trạng thái
lịch hẹn.

Method: PUT
Content-Type: application/json
2.1. Path Parameter
  Tham số            Kiểu dữ liệu   Bắt buộc   Mô tả
  appointment_id   Integer        Có         ID của lịch hẹn cần phân công
2.2. Request Body
{
  "technician_id": 1
}
  Trường            Kiểu dữ liệu   Bắt buộc   Mô tả
  technician_id   Integer        Có         ID kỹ thuật viên được phân công
2.3. Quy trình xử lý
1. Controller nhận appointment_id từ URL và technician_id từ JSON.
2. Kiểm tra dữ liệu JSON và trường technician_id.
3. Service kiểm tra mã lịch hẹn và mã kỹ thuật viên.
4. Repository truy vấn lịch hẹn và kỹ thuật viên trong cơ sở dữ liệu.
5. Nếu dữ liệu hợp lệ, Repository cập nhật technician_id và trạng
   thái lịch hẹn thành Assigned.
6. Repository commit thay đổi vào SQLite và trả dữ liệu lịch hẹn.
2.4. Response -- 200 OK
Ví dụ minh họa. Các trường dữ liệu thực tế phụ thuộc vào phương thức
Appointment.to_dict() trong mã nguồn:
{
  "success": true,
  "data": {
    "appointment_id": 1,
    "technician_id": 1,
    "status": "Assigned"
  }
}
2.5. Error -- 400 Bad Request
Trường hợp JSON không hợp lệ hoặc thiếu mã kỹ thuật viên:
{
  "success": false,
  "error": "Thiếu mã kỹ thuật viên."
}
2.6. Error -- 404 Not Found
Trường hợp không tìm thấy lịch hẹn hoặc kỹ thuật viên:
{
  "success": false,
  "error": "Không tìm thấy lịch hẹn."
}
Thông báo cụ thể phụ thuộc vào trường hợp không tìm thấy dữ liệu.
2.7. Error -- 500 Internal Server Error
Trường hợp phát sinh lỗi ngoài dự kiến trong quá trình xử lý:
{
  "success": false,
  "error": "Lỗi hệ thống nội bộ."
}
3. Quy tắc nghiệp vụ liên quan
BR1 -- Kiểm tra dữ liệu đầu vào
- Phải có appointment_id hợp lệ trên URL.
- Request phải chứa trường technician_id.
- Dữ liệu JSON phải đúng định dạng.
- Mã lịch hẹn và mã kỹ thuật viên không được để trống.
BR2 -- Kiểm tra sự tồn tại
- Lịch hẹn phải tồn tại trong cơ sở dữ liệu.
- Kỹ thuật viên được chọn phải tồn tại trong cơ sở dữ liệu.
BR3 -- Cập nhật phân công
Khi phân công thành công:
- Cập nhật appointment.technician_id bằng ID kỹ thuật viên được
  chọn.
- Cập nhật appointment.status thành Assigned.
- Lưu thay đổi bằng db.session.commit().
Phạm vi hiện tại: Đoạn mã đã trao đổi thực hiện kiểm tra sự tồn tại
của lịch hẹn và kỹ thuật viên. Chưa có đủ căn cứ để xác nhận các quy tắc
nâng cao như trạng thái AVAILABLE, cùng trung tâm, proficiency, giới
hạn số công việc hoặc kiểm tra trùng lịch đã được triển khai.
4. Thiết kế phân lớp
4.1. Controller
Controller sử dụng Flask Blueprint để khai báo endpoint:
appointment_bp = Blueprint('appointment', __name__)
Endpoint tiếp nhận request, gọi Service và chuyển kết quả thành JSON
Response với mã HTTP phù hợp.
4.2. Service
AppointmentService đảm nhiệm logic nghiệp vụ:
- Kiểm tra mã lịch hẹn và mã kỹ thuật viên.
- Gọi Repository để tìm lịch hẹn.
- Gọi Repository để tìm kỹ thuật viên.
- Yêu cầu Repository cập nhật phân công.
- Trả kết quả cho Controller.
Service không trực tiếp xử lý HTTP Request hoặc HTTP Response.
4.3. Repository
AppointmentRepository đảm nhiệm truy vấn và cập nhật dữ liệu:
  Phương thức                                                  Chức năng
  find_by_id(appointment_id)                                 Tìm lịch hẹn theo ID

  find_technician_by_id(technician_id)                       Tìm kỹ thuật viên theo ID
update_technician(appointment_id, technician_id, status)   Cập nhật kỹ thuật viên và trạng
thái lịch hẹn
4.4. Model
Repository sử dụng các model:
from src.models.appointment import db, Appointment, Technician
Dữ liệu được truy vấn thông qua SQLAlchemy và chuyển thành dictionary
bằng to_dict() trước khi trả về Controller.
5. Kiểm thử API
Có thể sử dụng PowerShell trong Terminal của Visual Studio Code để gửi
request đến Flask.
5.1. Khởi động Backend
Mở Terminal thứ nhất, kích hoạt môi trường ảo nếu chưa kích hoạt:
.\.venv\Scripts\Activate.ps1
Khởi động ứng dụng:
python app.py
Khi Flask hiển thị địa chỉ:
Running on http://127.0.0.1:5000
Backend đã khởi động và sẵn sàng nhận request.
5.2. Kiểm thử phân công kỹ thuật viên
Mở Terminal thứ hai:
$body = @{ technician_id = 1 } | ConvertTo-Json

Invoke-RestMethod `
    -Uri "http://127.0.0.1:5000/api/appointments/1/assign" `
    -Method PUT `
    -ContentType "application/json" `
    -Body $body
Kết quả mong đợi khi lịch hẹn và kỹ thuật viên tồn tại, đồng thời cập
nhật thành công: HTTP 200 và JSON có success: true.
5.3. Kiểm thử thiếu mã kỹ thuật viên
$body = @{} | ConvertTo-Json

Invoke-RestMethod `
    -Uri "http://127.0.0.1:5000/api/appointments/1/assign" `
    -Method PUT `
    -ContentType "application/json" `
    -Body $body
Kết quả mong đợi: HTTP 400 và thông báo thiếu mã kỹ thuật viên.
5.4. Kiểm thử không tìm thấy lịch hẹn
$body = @{ technician_id = 1 } | ConvertTo-Json

Invoke-RestMethod `
    -Uri "http://127.0.0.1:5000/api/appointments/9999/assign" `
    -Method PUT `
    -ContentType "application/json" `
    -Body $body
Kết quả mong đợi: HTTP 404 nếu ID 9999 không tồn tại.

Lưu ý khi kiểm thử: Invoke-RestMethod có thể hiển thị lỗi HTTP
dưới dạng PowerShell error. Có thể dùng try/catch để đọc response body
khi cần chụp ảnh báo cáo. Không ghi nhận kết quả mong đợi là kết quả
kiểm thử thực tế nếu chưa chạy và xác nhận.
5.5. Ghi nhận kết quả kiểm thử
  Test case               Dữ liệu đầu vào         Kết quả mong đợi
  TC01 -- Phân công thành Lịch hẹn và kỹ thuật    200 OK
công                    viên tồn tại            

  TC02 -- Thiếu           JSON {}               400 Bad Request
technician_id                                   

  TC03 -- Lịch hẹn không  appointment_id không  404 Not Found
tồn tại                 tồn tại                 

  TC04 -- Kỹ thuật viên   technician_id không   404 Not Found
không tồn tại           tồn tại                 
TC05 -- JSON không hợp  Request body sai định   400 Bad Request
lệ                      dạng JSON
Trạng thái Pass/Fail cần được cập nhật dựa trên kết quả chạy thực tế.
6. Những lỗi đã gặp trong quá trình kiểm thử
6.1. Không kết nối được tới cổng API
Ví dụ:
curl: (7) Failed to connect to 127.0.0.1 port 5173
Nguyên nhân: Gửi request đến sai cổng hoặc Backend chưa chạy tại cổng
đó.

Cách xử lý: Kiểm tra địa chỉ Flask hiển thị trong Terminal và sử dụng
đúng cổng 5000 nếu ứng dụng đang chạy tại http://127.0.0.1:5000.
6.2. Endpoint không tồn tại
Ví dụ:
HTTP/1.1 404 NOT FOUND
Khi truy cập GET /appointments, Flask trả về 404 vì chưa xác nhận có
route GET tương ứng. Không được kết luận endpoint này hoạt động chỉ vì
ứng dụng Flask đã khởi động.
6.3. JSON không đúng định dạng
Ví dụ:
Failed to decode JSON object
Nguyên nhân: PowerShell truyền dữ liệu JSON không đúng định dạng mà
Flask mong đợi.

Cách xử lý: Tạo JSON bằng ConvertTo-Json, sau đó gửi bằng
Invoke-RestMethod với ContentType là application/json.
6.4. Không tìm thấy lịch hẹn
Ví dụ:
{
  "success": false,
  "error": "Không tìm thấy lịch hẹn."
}
Nguyên nhân: ID lịch hẹn gửi lên không tồn tại trong SQLite hoặc ứng
dụng đang sử dụng cơ sở dữ liệu khác với dữ liệu dự kiến.

Đây là phản hồi nghiệp vụ khi không tìm thấy dữ liệu, không đồng nghĩa
Flask không hoạt động.
7. Giới hạn triển khai và hướng phát triển
Theo các đoạn mã đã trao đổi, phạm vi hiện tại tập trung vào API phân
công kỹ thuật viên cho lịch hẹn.

Các nội dung cần tiếp tục đối chiếu hoặc phát triển:
- Xác nhận đầy đủ cấu trúc model Appointment và Technician.
- Bổ sung kiểm tra trạng thái khả dụng của kỹ thuật viên nếu nghiệp vụ
  yêu cầu.
- Bổ sung điều kiện cùng trung tâm và mức độ chuyên môn nếu có trong
  Business Rules.
- Bổ sung kiểm tra lịch hẹn chồng lấn.
- Bổ sung chức năng thay đổi kỹ thuật viên và ghi nhận lý do.
- Hoàn thiện các API GET, POST, PUT, DELETE theo phạm vi yêu cầu của
  hệ thống.
- Viết Unit Test và Integration Test cho các trường hợp thành công, dữ
  liệu sai và lỗi hệ thống.
Các nội dung chưa có trong mã nguồn hoặc chưa được kiểm thử không được
ghi nhận là đã hoàn thành.
8. Tài liệu và mã nguồn liên quan
Các file cần đối chiếu trong repository:
- app.py -- Khởi tạo Flask và đăng ký Blueprint.
- src/controllers/ -- Các API Controller.
- src/services/appointment_service.py -- Logic phân công lịch hẹn.
- src/repositories/appointment_repository.py -- Truy vấn và cập nhật
  dữ liệu.
- src/models/appointment.py -- Model Appointment và Technician.
- requirements.txt -- Các thư viện Python cần thiết.
- tests/ -- Các bài kiểm thử của hệ thống.
9. Kết luận
API phân công kỹ thuật viên là một phần của luồng nghiệp vụ L4 trong hệ
thống Mekong Mobile. Thiết kế sử dụng mô hình phân lớp Controller --
Service -- Repository nhằm tách biệt xử lý HTTP, nghiệp vụ và truy cập
dữ liệu.

Tài liệu này ghi nhận endpoint, cấu trúc request/response, quy tắc xử
lý, cách kiểm thử và những giới hạn đã xác định trong quá trình triển
khai. Kết quả kiểm thử chính thức cần được cập nhật theo dữ liệu và mã
nguồn thực tế của dự án.