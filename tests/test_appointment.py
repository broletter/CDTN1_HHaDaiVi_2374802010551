import pytest
from unittest.mock import MagicMock
from src.services.appointment_service import AppointmentService

@pytest.fixture
def mock_repo():
    repo = MagicMock()
    return repo

# LOẠI 1: KIỂM THỬ LUỒNG ĐÚNG (Happy Path)
def test_assign_technician_success(mock_repo):
    mock_repo.find_by_id.return_value = {"id": 1, "status": "Pending"}
    mock_repo.update_technician.return_value = {"id": 1, "technician_id": 102, "status": "Assigned"}
    
    service = AppointmentService(mock_repo)
    result = service.assign_technician(1, 102)
    
    assert result["status"] == "Assigned"
    assert result["technician_id"] == 102

# LOẠI 2: KIỂM THỬ DỮ LIỆU SAI (Invalid Data)
def test_assign_technician_missing_data(mock_repo):
    service = AppointmentService(mock_repo)
    
    with pytest.raises(ValueError, match="Mã lịch hẹn và mã kỹ thuật viên không được để trống."):
        service.assign_technician(None, None)

# LOẠI 3: KIỂM THỬ BIÊN / KHÔNG TỒN TẠI (Boundary / Not Found)
def test_assign_technician_not_found(mock_repo):
    mock_repo.find_by_id.return_value = None # Không tìm thấy lịch hẹn
    
    service = AppointmentService(mock_repo)
    
    # Sửa chuỗi match thành 'Không tìm thấy lịch hẹn.' cho khớp với code service thực tế
    with pytest.raises(LookupError, match="Không tìm thấy lịch hẹn."):
        service.assign_technician(appointment_id=999, technician_id=1)