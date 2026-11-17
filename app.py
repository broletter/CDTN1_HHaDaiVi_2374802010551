from datetime import datetime
from flask import Flask
from flask_cors import CORS
from src.models.appointment import db, Technician, Appointment
from src.controllers.appointment_controller import appointment_bp


def seed_initial_data():
    """Populate initial demo records if the database is empty (idempotent)."""
    if Technician.query.first() is None:
        tech1 = Technician(id=1, name="Nguyễn Văn Tùng", specialty="Apple", status="Available")
        tech2 = Technician(id=2, name="Trần Minh Hoàng", specialty="Android", status="Available")
        tech3 = Technician(id=3, name="Lê Quốc Bảo", specialty="Laptop & Hardware", status="Busy")
        db.session.add_all([tech1, tech2, tech3])
        db.session.commit()

    if Appointment.query.first() is None:
        appt1 = Appointment(
            id=1,
            customer_name="Nguyễn Văn Minh",
            device_info="iPhone 14",
            appointment_date=datetime(2025, 9, 10, 9, 0, 0),
            status="Pending",
            technician_id=None
        )
        appt2 = Appointment(
            id=2,
            customer_name="Trần Thị Bích",
            device_info="Samsung Galaxy S23",
            appointment_date=datetime(2025, 9, 10, 10, 30, 0),
            status="Pending",
            technician_id=None
        )
        db.session.add_all([appt1, appt2])
        db.session.commit()


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mekong_crm.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    app.register_blueprint(appointment_bp)

    with app.app_context():
        db.create_all()
        seed_initial_data()

    return app


app = create_app()


@app.route('/')
def home():
    return {"message": "Mekong Mobile Smart CRM API - Module L4 is running!"}, 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)