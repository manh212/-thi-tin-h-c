import type { SyllabusItem } from ".";

export const item: SyllabusItem = {
  id: "word-tables",
  title: "Word: Bảng Biểu",
  content: `
1.5. Bảng biểu (Di chuyển)
- Về ô đầu tiên của bảng: Ctrl+Alt+Home
- Về ô cuối cùng của bảng: Ctrl+Alt+End
- Về ô đầu tiên Của hàng: Alt+Home
- Về ô cuối cùng Của hàng: Alt+End
- Về ô đầu tiên của cột: Alt+Page Up
- Về ô cuối cùng của cột: Alt+Page Down
- Đi tới ô kế tiếp trong hàng: Tab
- Quay lại ô trước trong hàng: Shift+Tab
- Di chuyển lên ô phía trên trong cột: Mũi tên lên
- Di chuyển xuống ô phía dưới trong cột: Mũi tên xuống
- Đọc tọa độ của ô tại vị trí con trỏ: Insert+c
- Đọc nội dung và tọa độ của ô: Ctrl+alt+num5, Insert+Tab
- Đọc nội dung của cột tại vị trí con trỏ: Insert+shift+num5
- Đọc nội dung của hàng tại vị trí con trỏ: Insert+shift+num8, Insert+mũi tên lên.
- Chọn từng ô trong hàng: Shift+end.
- Chọn từng ô trong cột: Shift+mũi tên xuống.
- Chọn hàng tiếp theo: Shift+mũi tên xuống.
- Chọn cột tiếp theo: Shift+mũi tên phải.

9. Bảng biểu (Thao tác)
9.1. Chèn bảng
- Bước 1: Di chuyển con trỏ đến vùng văn bản cần chèn bảng.
- Bước 2: Nhấn giữ phím Alt, nhấn lần lượt các phím chữ n, t, i.
- Bước 3: Nhập số hoặc nhấn mũi tên lên, xuống, chọn số cột.
- Bước 4: Nhấn Tab một lần rồi nhập số hoặc nhấn mũi tên lên, xuống, chọn số hàng.
- Bước 5: Nhấn Enter để xác nhận và đóng hộp thoại.
9.2. Thêm hàng, cột
- Bước 1: Lựa chọn một ô trong cột làm chuẩn.
- Bước 2: Kích hoạt thực đơn ngữ cảnh bằng cách nhấn phím Application.
- Bước 3: Nhấn mũi tên lên, xuống để đến mục Insert submenu, nhấn mũi tên phải để mở.
- Bước 4: Nhấn mũi tên lên, xuống để chọn một trong các tùy chọn sau:
+ Insert Row above: chèn hàng ở trên.
+ Insert Row below: chèn hàng ở dưới.
+ Insert Columns to the Left: chèn cột bên trái.
+ Insert Columns to the Right: chèn cột bên phải. 
- Bước 5: Nhấn enter để thêm hàng, cột.
Bạn cũng có thể thêm hàng vào cuối bảng bằng cách đưa con trỏ đến ô cuối cùng của bảng biểu, nhấn phím Tab sẽ tạo ra một hàng mới.
9.3. Thêm ô
- Bước 1: Lựa chọn một ô làm chuẩn, nhấn phím Application để mở thực đơn ngữ cảnh.
- Bước 2: Nhấn mũi tên lên xuống để đến Insert submenu, nhấn mũi tên phải để mở. 
- Bước 3: Nhấn mũi tên lên xuống để đến hộp thoại Insert cells, nhấn enter để mở.
- Bước 4: Nhấn mũi tên lên xuống để chọn một trong các tùy chọn sau:
+ Shift cell right: Các ô cũ trong cùng một hàng bị đẩy sang bên phải.
+ Shift cell down: Các ô cũ trên cùng một cột bị đẩy xuống dưới.
+ Insert entire row: Chèn một hàng mới.	
+ Insert entire column: Chèn một cột mới.
- Bước 5: Nhấn phím enter để thêm và đóng hộp thoại.
9.4. Gỡ bỏ cột, hàng, ô trong bảng
- Bước 1: Lựa chọn một ô làm chuẩn, nhấn phím Application để mở thực đơn ngữ cảnh.
- Bước 2: Nhấn mũi tên lên xuống đến hộp thoại Delete cells, nhấn enter để mở.
- Bước 3: Nhấn mũi tên lên xuống để chọn: 
+ Shift cell left: Xóa ô đánh dấu và kéo các ô cùng dòng sang trái.
+ Shift cells up: Xóa ô đánh dấu và kéo các ô cùng cột lên trên.
+ Delete entire row: Xóa dòng đánh dấu.
+ Delete entire column: Xóa cột đánh dấu. 
- Bước 4: Nhấn enter để xóa và đóng hộp thoại.
9.5. Nhập ô trong bảng
- Bước 1: Chọn các ô liên tiếp nhau bạn muốn hợp thành một ô.
- Bước 2: Nhấn phím Application để mở thực đơn ngữ cảnh.
- Bước 3: Nhấn mũi tên lên xuống đến Merge cells, nhấn enter để nhập ô.
9.6. Tách ô trong bảng
- Bước 1: Chọn ô cần tách.
- Bước 2: Nhấn phím Application để mở thực đơn ngữ cảnh.
- Bước 3: Nhấn mũi tên lên, mũi tên xuống để chọn mục Split cells, nhấn enter để mở.
- Bước 4: Lúc này con trỏ sẽ nằm ở Number of columns, nhấn mũi tên lên xuống hoặc nhập số cột mong muốn.
- Bước 5: Nhấn tab đến Number of row, nhấn mũi tên lên xuống hoặc nhập số hàng mong muốn.
- Bước 6: Nhấn tab đến nút Ok, nhấn enter để xác nhận.`
};
