import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [currentScreen, setCurrentScreen] = useState(1); // 1: Điều phối, 2: Lịch trình KTV, 3: Xác nhận thành công
  
  // Trạng thái dữ liệu cho Wireframe 1
  const [selectedTicket, setSelectedTicket] = useState({
    id: 'TKT-0012',
    customer: 'Nguyễn Văn Minh',
    phone: '0901234567',
    address: 'Quận 1, TP. Hồ Chí Minh',
    device: 'iPhone 14',
    issue: 'Máy không lên nguồn, có tiếng kêu lạ.'
  });
  const [selectedTech, setSelectedTech] = useState(null);
  const [assignStatus, setAssignStatus] = useState(''); // success hoặc error

  // Xử lý phân công kỹ thuật viên (Gọi API Flask)
  const handleAssign = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/api/appointments/1/assign`, {
        technician_id: selectedTech || 1
      });
      if (response.data.success) {
        setAssignStatus('success');
        setCurrentScreen(3); // Chuyển sang màn hình 3 (Xác nhận thành công)
      }
    } catch (err) {
      setAssignStatus('error'); // Kích hoạt trạng thái báo lỗi xung đột lịch hẹn (giống wireframe 1)
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh', margin: 0, padding: 0 }}>
      {/* Thanh điều hướng tiêu đề chung */}
      <header style={{ backgroundColor: '#102a43', color: 'white', padding: '15px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '18px' }}>SMART CRM | HỆ THỐNG QUẢN LÝ ĐIỀU PHỐI & PHÂN CÔNG</h2>
        <div>
          <button onClick={() => setCurrentScreen(1)} style={{ marginüğüRight: '10px', padding: '6px 12px', background: currentScreen === 1 ? '#334e68' : '#243b53', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>1. Điều phối Ticket</button>
          <button onClick={() => setCurrentScreen(2)} style={{ marginüğüRight: '10px', padding: '6px 12px', background: currentScreen === 2 ? '#334e68' : '#243b53', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>2. Lịch trình KTV</button>
          <button onClick={() => setCurrentScreen(3)} style={{ padding: '6px 12px', background: currentScreen === 3 ? '#334e68' : '#243b53', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>3. Xác nhận KH</button>
        </div>
      </header>

      <div style={{ padding: '20px' }}>
        {/* ================= MÀN HÌNH 1: QUẢN LÝ & ĐIỀU PHỐI TICKET ================= */}
        {currentScreen === 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px' }}>
            {/* Cột danh sách ticket chờ */}
            <div style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3>Danh sách Ticket chờ (12)</h3>
              <div style={{ border: '1px solid #cbd5e1', padding: '10px', borderRadius: '6px', marginBottom: '10px', backgroundColor: '#f8fafc', cursor: 'pointer' }}>
                <strong>TKT-0012 Pending</strong> - Nguyễn Văn Minh (Quận 1)<br/>
                <small style={{ color: '#64748b' }}>Mô tả: Máy không lên nguồn, có tiếng kêu lạ.</small>
              </div>
              <div style={{ border: '1px solid #e2e8f0', padding: '10px', borderRadius: '6px', marginBottom: '10px', opacity: 0.7 }}>
                <strong>TKT-0011 Pending</strong> - Trần Thị Bích (Quận 3)<br/>
                <small style={{ color: '#64748b' }}>Mô tả: Màn hình bị sọc, cảm ứng không nhạy.</small>
              </div>
            </div>

            {/* Cột chi tiết & đề xuất kỹ thuật viên */}
            <div style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3>Chi tiết Ticket đang chọn</h3>
              <div style={{ background: '#f1f5f9', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '14px' }}>
                <b>{selectedTicket.id} | Pending</b> Khách hàng: {selectedTicket.customer} SĐT: {selectedTicket.phone} Địa chỉ: {selectedTicket.address} Thiết bị: {selectedTicket.device}<br/>
                Mô tả lỗi: {selectedTicket.issue}
              </div>

              <h3>Đề xuất kỹ thuật viên phù hợp</h3>
              <div 
                onClick={() => setSelectedTech(1)} 
                style={{ border: selectedTech === 1 ? '2px solid #0284c7' : '1px solid #cbd5e1', padding: '10px', borderRadius: '6px', marginBottom: '8px', cursor: 'pointer', background: '#f0fdf4' }}
              >
                ☑ <b>Nguyễn Văn Tùng (KTV-001)</b> - Level 3 - Apple | Đỉa bàn: Quận 1, 3 | Workload: 6/10 (Đang rảnh)
              </div>
              <div 
                onClick={() => setSelectedTech(2)} 
                style={{ border: selectedTech === 2 ? '2px solid #0284c7' : '1px solid #cbd5e1', padding: '10px', borderRadius: '6px', marginBottom: '15px', cursor: 'pointer', background: '#fefce8' }}
              >
                ☐ <b>Trần Minh Hoàng (KTV-002)</b> - Level 2 - Android | Địa bàn: Quận 1, 5 | Workload: 8/10 (Sắp quá tải)
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                <input type="date" defaultValue="2025-09-10" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                <input type="time" defaultValue="09:00" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                <input type="time" defaultValue="11:00" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
              </div>

              <button 
                onClick={handleAssign}
                style={{ width: '100%', backgroundColor: '#16a34a', color: 'white', padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                ✓ Xác nhận phân công & Tạo lịch hẹn
              </button>

              {/* Mô phỏng trạng thái lỗi dữ liệu / xung đột lịch hẹn (Trạng thái 3) */}
              {assignStatus === 'error' && (
                <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #f87171', borderRadius: '6px' }}>
                  ⚠ Xung đột lịch hẹn — Lỗi 409 Conflict: KTV đã có lịch trong khung giờ này. Vui lòng chọn khung giờ khác.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= MÀN HÌNH 2: LỊCH TRÌNH CÁ NHÂN KỸ THUẬT VIÊN ================= */}
        {currentScreen === 2 && (
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3>Lịch trình cá nhân Kỹ thuật viên: Nguyễn Văn Tùng (Mã KTV: KTV-001)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginTop: '15px' }}>
              <div>
                <h4>Lịch hẹn trong ngày (10/09/2025)</h4>
                <div style={{ border: '1px solid #86efac', background: '#f0fdf4', padding: '12px', borderRadius: '6px', marginBottom: '10px' }}>
                  <b>09:00 – 10:00</b> | TKT-0012 Khách hàng: Nguyễn Văn Minh - Quận 1. Lỗi: Máy không lên nguồn.
                </div>
                <div style={{ border: '1px solid #fde047', background: '#fefce8', padding: '12px', borderRadius: '6px', marginBottom: '10px' }}>
                  <b>10:30 – 12:00</b> | TKT-0018 Khách hàng: Phạm Hà - Quận 3. Lỗi: Thiết bị không nhận sạc.
                </div>
              </div>
              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                <h4>Chi tiết & Cập nhật trạng thái</h4>
                <p style={{ fontSize: '13px' }}>Đang chọn: <b>TKT-0012</b></p>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '5px' }}>Trạng thái công việc:</label>
                <select style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', marginBottom: '15px' }}>
                  <option>Đang di chuyển</option>
                  <option>Đang sửa chữa</option>
                  <option>Đã hoàn thành</option>
                </select>
                <button style={{ width: '100%', backgroundColor: '#0284c7', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Lưu cập nhật trạng thái
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= MÀN HÌNH 3: XÁC NHẬN & THÔNG BÁO KHÁCH HÀNG ================= */}
        {currentScreen === 3 && (
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ fontSize: '50px', color: '#16a34a', marginBottom: '10px' }}>✔</div>
            <h2 style={{ color: '#16a34a' }}>ĐÃ XÁC NHẬN LỊCH HẸN THÀNH CÔNG</h2>
            <p style={{ color: '#64748b', fontSize: '14px' }}>Thông tin lịch hẹn và kỹ thuật viên phụ trách được gửi đến quý khách.</p>
            
            <div style={{ textAlign: 'left', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <h4>Thông tin lịch hẹn</h4>
                <p style={{ fontSize: '13px', margin: 0 }}>Mã phiếu: <b>TKT-0012</b><br/>Ngày hẹn: 10/09/2025 (09:00 - 11:00)<br/>Địa điểm: Tại nhà khách hàng (Quận 1)</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <h4>Kỹ thuật viên phụ trách</h4>
                <p style={{ fontSize: '13px', margin: 0 }}>Họ tên: <b>Nguyễn Văn Tùng</b><br/>Mã KTV: KTV-001<br/>SĐT: 0908 123 456</p>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', fontSize: '13px', color: '#166534' }}>
              ✓ Hệ thống đã gửi SMS xác nhận đến số điện thoại của quý khách. Vui lòng giữ liên lạc với kỹ thuật viên.
            </div>

            <button 
              onClick={() => setCurrentScreen(1)}
              style={{ marginTop: '20px', backgroundColor: '#334e68', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Quay lại trang điều phối
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;