
class AppointmentService:
    def __init__(self, repository):
        self.repository = repository

    def assign_technician(self, appointment_id: int, technician_id: int):
        """
        Phân công kỹ thuật viên cho lịch hẹn.
        """

        if not appointment_id or not technician_id:
            raise ValueError(
                "Mã lịch hẹn và mã kỹ thuật viên không được để trống."
            )

        # Kiểm tra lịch hẹn
        appointment = self.repository.find_by_id(appointment_id)
        if not appointment:
            raise LookupError("Không tìm thấy lịch hẹn.")

        # Kiểm tra kỹ thuật viên
        technician = self.repository.find_technician_by_id(technician_id)
        if not technician:
            raise LookupError("Không tìm thấy kỹ thuật viên.")

        # Cập nhật phân công
        updated_data = self.repository.update_technician(
            appointment_id,
            technician_id,
            status="Assigned"
        )

        if not updated_data:
            raise LookupError("Không thể cập nhật phân công.")

        return updated_data
