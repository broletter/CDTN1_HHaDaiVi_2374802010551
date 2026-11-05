Bug Log – Smart CRM BT2
BUG-001: Seed dữ liệu không hỗ trợ chạy lặp lại
- Module: Database Initialization
- Mức độ: Medium
- Trạng thái: Fixed
- Commit sửa lỗi: 42eb9bd
- File liên quan: docs/seed.sql

1. Mô tả
Phiên bản seed ban đầu sử dụng INSERT INTO với các khóa chính cố định. Khi chạy lại trên database đã chứa dữ liệu mẫu, SQLite có thể phát sinh lỗi trùng khóa chính.

2. Các bước tái hiện trên phiên bản cũ
    1. Tạo database SQLite mới bằng docs/schema.sql.
    2. Chạy docs/seed.sql lần thứ nhất.
    3. Chạy lại docs/seed.sql lần thứ hai.

3. Kết quả mong đợi
Script seed có thể chạy nhiều lần mà không tạo dữ liệu trùng hoặc phát sinh lỗi khóa chính.

4. Nguyên nhân
Các lệnh INSERT INTO chưa xử lý trường hợp dữ liệu mẫu với khóa chính tương ứng đã tồn tại.

5. Cách khắc phục
Chuyển các lệnh seed thành INSERT OR IGNORE INTO. Những bản ghi đã tồn tại được giữ nguyên.

6. Kiểm thử sau khi sửa
Chạy schema và seed trên database tạm:
    - Lần 1: 3 Ticket, 3 Technician, 3 Technician Skill.
    - Lần 2: 3 Ticket, 3 Technician, 3 Technician Skill.
    - Không phát sinh bản ghi trùng.
    - Kết quả: PASS.
    
7. Giới hạn
INSERT OR IGNORE chỉ bỏ qua dữ liệu đã tồn tại theo ràng buộc SQLite; không tự động cập nhật dữ liệu mẫu cũ.