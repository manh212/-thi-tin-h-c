import type { Hotkey } from './types';

export const HOTKEYS: Hotkey[] = [
  // JAWS
  { app: 'JAWS', keys: 'Num5', description: 'Đọc ký tự' },
  { app: 'JAWS', keys: 'Ins+Num5', description: 'Đọc từ' },
  { app: 'JAWS', keys: 'Ins+Num5 (2 lần)', description: 'Đánh vần từ' },
  { app: 'JAWS', keys: 'Ins+mũi tên lên', description: 'Đọc dòng hiện tại' },
  { app: 'JAWS', keys: 'Ctrl', description: 'Ngừng đọc' },
  { app: 'JAWS', keys: 'Ins+t', description: 'Đọc tiêu đề cửa sổ' },
  { app: 'JAWS', keys: 'Ins+f', description: 'Đọc phông chữ' },
  { app: 'JAWS', keys: 'Ins+f10', description: 'Liệt kê danh sách cửa sổ đang mở' },
  { app: 'JAWS', keys: 'Ins+f11', description: 'Liệt kê các biểu tượng trên khay hệ thống' },
  { app: 'JAWS', keys: 'Ins+f12', description: 'Đọc giờ hệ thống' },
  { app: 'JAWS', keys: 'Ctrl+Windows+Alt+Page Up', description: 'Tăng tốc độ mặc định' },
  { app: 'JAWS', keys: 'Ctrl+Windows+Alt+Page Down', description: 'Giảm tốc độ mặc định' },
  { app: 'JAWS', keys: 'Ins+f7', description: 'Mở danh sách các link (liên kết)' },
  { app: 'JAWS', keys: 'Ins+f6', description: 'Mở danh sách các heading (tiêu đề)' },
  { app: 'JAWS', keys: 'Ins+f5', description: 'Mở danh sách các button (nút)' },
  { app: 'JAWS', keys: 'h', description: 'Đi tới heading kế tiếp' },
  { app: 'JAWS', keys: 'f', description: 'Đi tới form kế tiếp' },
  { app: 'JAWS', keys: 'b', description: 'Đi tới button kế tiếp' },

  // NVDA
  { app: 'NVDA', keys: 'Ctrl+Alt+n', description: 'Mở NVDA' },
  { app: 'NVDA', keys: 'NVDA+q', description: 'Thoát NVDA' },
  { app: 'NVDA', keys: 'Shift', description: 'Tạm dừng NVDA nói' },
  { app: 'NVDA', keys: 'Ctrl', description: 'Dừng hẳn NVDA nói' },
  { app: 'NVDA', keys: 'NVDA+2', description: 'Bật/tắt chế độ đọc từng ký tự khi soạn thảo' },
  { app: 'NVDA', keys: 'NVDA+3', description: 'Bật/tắt chế độ đọc từng từ khi soạn thảo' },
  { app: 'NVDA', keys: 'NVDA+c', description: 'Thông báo dữ liệu trong bộ nhớ tạm' },
  { app: 'NVDA', keys: 'NVDA+l', description: 'Đọc dòng hiện tại' },
  { app: 'NVDA', keys: 'NVDA+n', description: 'Mở nhanh menu NVDA' },

  // Sound Forge
  { app: 'Sound Forge', keys: 'Spacebar', description: 'Nghe/dừng nghe' },
  { app: 'Sound Forge', keys: 'Ctrl+r', description: 'Mở menu Record' },
  { app: 'Sound Forge', keys: 'i', description: 'Đánh dấu điểm bắt đầu' },
  { app: 'Sound Forge', keys: 'o', description: 'Đánh dấu điểm cuối' },
  { app: 'Sound Forge', keys: 'Alt+c', description: 'Mở menu Effects' },
  { app: 'Sound Forge', keys: 'Alt+p', description: 'Mở menu Process' },

  // Windows
  { app: 'Windows', keys: 'Windows+m / Windows+d', description: 'Mở desktop' },
  { app: 'Windows', keys: 'Windows+e', description: 'Mở File Explorer' },
  { app: 'Windows', keys: 'F2', description: 'Mở hộp thoại đổi tên' },
  { app: 'Windows', keys: 'Ctrl+Shift+n', description: 'Tạo thư mục mới' },
  { app: 'Windows', keys: 'Delete', description: 'Xóa file vào thùng rác' },
  { app: 'Windows', keys: 'Shift+Delete', description: 'Xóa file vĩnh viễn' },
  { app: 'Windows', keys: 'Ctrl+c', description: 'Sao chép' },
  { app: 'Windows', keys: 'Ctrl+x', description: 'Cắt' },
  { app: 'Windows', keys: 'Ctrl+v', description: 'Dán' },

  // Word
  { app: 'Word', keys: 'Ctrl+Shift+F5', description: 'Mở giao diện chính của Unikey' },
  { app: 'Word', keys: 'Ctrl+Shift', description: 'Bật/tắt chế độ gõ tiếng Việt có dấu' },
  { app: 'Word', keys: 'Ctrl+a', description: 'Chọn toàn bộ văn bản' },
  { app: 'Word', keys: 'F12', description: 'Mở hộp thoại Save as' },
  { app: 'Word', keys: 'Ctrl+s', description: 'Lưu cập nhật' },
  { app: 'Word', keys: 'Ctrl+d', description: 'Mở hộp thoại Font' },
  { app: 'Word', keys: 'Ctrl+b', description: 'Bật/tắt chế độ in đậm' },
  { app: 'Word', keys: 'Ctrl+i', description: 'Bật/tắt chế độ in nghiêng' },
  { app: 'Word', keys: 'Ctrl+u', description: 'Bật/tắt chế độ gạch chân' },
  { app: 'Word', keys: 'Ctrl+e', description: 'Căn giữa' },
  { app: 'Word', keys: 'Ctrl+j', description: 'Căn đều hai bên' },
  { app: 'Word', keys: 'Ctrl+5', description: 'Giãn khoảng cách bằng 1,5 dòng' },
  { app: 'Word', keys: 'Ctrl+Enter', description: 'Ngắt trang' },
  { app: 'Word', keys: 'Tab (trong bảng)', description: 'Đi tới ô kế tiếp trong hàng' },
  
  // Excel
  { app: 'Excel', keys: 'Tab', description: 'Chuyển con trỏ qua phải một ô' },
  { app: 'Excel', keys: 'Shift+Tab', description: 'Chuyển con trỏ qua trái một ô' },
  { app: 'Excel', keys: 'Ctrl+home', description: 'Chuyển con trỏ tới góc trên bên trái của bảng tính' },
  { app: 'Excel', keys: 'Ctrl+end', description: 'Chuyển con trỏ tới góc dưới bên phải của vùng dữ liệu' },
  { app: 'Excel', keys: 'Ctrl+space', description: 'Lựa chọn cột chứa ô đang chọn' },
  { app: 'Excel', keys: 'Shift+space', description: 'Lựa chọn hàng chứa ô đang chọn' },
  { app: 'Excel', keys: 'F2', description: 'Sửa nội dung của ô' },
  { app: 'Excel', keys: 'Ctrl+9', description: 'Ẩn hàng' },
  { app: 'Excel', keys: 'Ctrl+0', description: 'Ẩn cột' },
  { app: 'Excel', keys: 'Ctrl+1', description: 'Mở hộp thoại Format cell' },
  { app: 'Excel', keys: 'Shift+F11', description: 'Chèn thêm bảng tính mới' }
];
