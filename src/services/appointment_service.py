class AppointmentService:
    def __init__(self, repository):
        self.repository = repository

    def assign_technician(self, appointment_id: int, technician_id: int):
        """
        Nghiệp vụ phân công kỹ thuật viên cho lịch hẹn.
        Thuần túy logic, không chứa request/response hay mã HTTP.
        """
        if not appointment_id or not technician_id:
            raise ValueError("Mã lịch hẹn và mã kỹ thuật viên không được để trống.")
        
        # Kiểm tra xem lịch hẹn có tồn tại không
        appointment = self.repository.find_by_id(appointment_id)
        if not appointment:
            raise LookupError("Không tìm thấy thông tin lịch hẹn yêu cầu.")
        
        # Thực hiện cập nhật phân công
        updated_data = self.repository.update_technician(appointment_id, technician_id, status="Assigned")
        return updated_data