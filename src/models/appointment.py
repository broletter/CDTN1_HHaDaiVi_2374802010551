from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Technician(db.Model):
    __tablename__ = 'technicians'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    specialty = db.Column(db.String(100), nullable=True) # Chuyên môn sửa chữa
    status = db.Column(db.String(50), default='Available') # Available, Busy, Offline
    
    appointments = db.relationship('Appointment', backref='technician', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "specialty": self.specialty,
            "status": self.status
        }


class Appointment(db.Model):
    __tablename__ = 'appointments'
    
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100), nullable=False)
    device_info = db.Column(db.String(150), nullable=False) # Tên thiết bị mang đi sửa (VD: Điện thoại Omoda/iPhone)
    appointment_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    status = db.Column(db.String(50), default='Pending') # Pending, Assigned, Completed, Cancelled
    
    # Khóa ngoại liên kết với kỹ thuật viên được phân công
    technician_id = db.Column(db.Integer, db.ForeignKey('technicians.id'), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "customer_name": self.customer_name,
            "device_info": self.device_info,
            "appointment_date": self.appointment_date.strftime('%Y-%m-%d %H:%M:%S'),
            "status": self.status,
            "technician_id": self.technician_id
        }