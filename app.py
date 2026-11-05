from flask import Flask
from src.models.appointment import db
from src.controllers.appointment_controller import appointment_bp

def create_app():
    app = Flask(__name__)
    
    # Cấu hình sử dụng cơ sở dữ liệu SQLite cục bộ cho bài tập
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mekong_crm.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Khởi tạo DB với ứng dụng
    db.init_app(app)
    
    # Đăng ký Blueprint của module L4
    app.register_blueprint(appointment_bp)
    
    return app

app = create_app()
@app.route('/')
def home():
    return {"message": "Mekong Mobile Smart CRM API - Module L4 is running!"}, 200
if __name__ == '__main__':
    # Tự động tạo bảng trong database nếu chưa tồn tại khi chạy lần đầu
    with app.app_context():
        db.create_all()
        print("Đã khởi tạo Cơ sở dữ liệu SQLite thành công!")
        
    # Chạy ứng dụng ở cổng 5000
    app.run(debug=True, port=5000)