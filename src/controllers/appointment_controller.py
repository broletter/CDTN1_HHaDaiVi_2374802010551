from flask import Blueprint, request, jsonify

appointment_bp = Blueprint('appointment', __name__)

# Giả lập khởi tạo service (hoặc dùng dependency injection)
from src.services.appointment_service import AppointmentService
from src.repositories.appointment_repository import AppointmentRepository

service = AppointmentService(AppointmentRepository())

@appointment_bp.route('/api/appointments/<int:appointment_id>/assign', methods=['PUT'])
def assign_appointment(appointment_id):
    try:
        data = request.get_json() or {}
        technician_id = data.get('technician_id')
        
        result = service.assign_technician(appointment_id, technician_id)
        return jsonify({"success": True, "data": result}), 200
        
    except ValueError as e:
        # Xử lý dữ liệu sai / thiếu thông tin (Tiêu chí C7)
        return jsonify({"success": False, "error": str(e)}), 400
    except LookupError as e:
        return jsonify({"success": False, "error": str(e)}), 404
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500