from src.models.appointment import db, Appointment, Technician

class AppointmentRepository:
    
    def find_by_id(self, appointment_id: int):
        """Tìm lịch hẹn theo ID"""
        appointment = Appointment.query.get(appointment_id)
        if not appointment:
            return None
        return appointment.to_dict()

    def find_technician_by_id(self, technician_id: int):
        """Tìm kỹ thuật viên theo ID"""
        tech = Technician.query.get(technician_id)
        if not tech:
            return None
        return tech.to_dict()

    def update_technician(self, appointment_id: int, technician_id: int, status: str = "Assigned"):
        """Cập nhật phân công kỹ thuật viên và trạng thái lịch hẹn vào Database"""
        appointment = Appointment.query.get(appointment_id)
        technician = Technician.query.get(technician_id)
        
        if not appointment or not technician:
            return None
            
        appointment.technician_id = technician_id
        appointment.status = status
        
        db.session.commit()
        
        return appointment.to_dict()