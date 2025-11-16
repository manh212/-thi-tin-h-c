import type { SyllabusItem } from ".";

export const item: SyllabusItem = {
  id: "excel-data-tools",
  title: "Excel: Công Cụ Dữ Liệu",
  content: `
3. Nhập dãy số tuân theo qui luật
- Bước 1: Nhập dữ liệu vào hai ô đầu của dãy (hoặc chỉ cần nhập vào một ô đầu của dãy trong trường hợp cần nhập dãy tháng hoặc ngày trong tuần).
- Bước 2: Nhấn tổ hợp phím Shift+mũi tên lên, xuống, trái, phải để chọn vùng dữ liệu (Bao gồm cả giá trị khởi tạo bạn nhập ở bước 1) bạn muốn điền giá trị.
- Bước 3: Nhấn phím Alt để vào thanh menu.
- Bước 4: Nhấn phím h để mở thực đơn Home.
- Bước 5: Nhấn tab đến mục Editing.
- Bước 6: Dùng mũi tên lên, xuống để đi đến mục Fill rồi nhấn enter để mở.
- Bước 7: Dùng mũi tên lên, xuống chọn mục Series rồi nhấn enter để mở.
- Bước 8: Nhấn Shift+Tab 2 lần lên mục Series in. 
- Bước 9: Dùng mũi tên lên, xuống để chọn Row (phím tắt là Alt+r) hoặc Column (phím tắt là Alt+c) nếu bạn muốn điền giá trị theo hàng hoặc cột.
- Bước 10: Nhấn tổ hợp phím Alt+s hoặc tab đến mục Step value, ở đây giá trị khoảng cách mặc định là 1, bạn có thể thay đổi giá trị khoảng cách bằng cách nhập từ bàn phím.
- Bước 11: Nhấn tổ hợp phím Alt+o hoặc tab đến mục Stop value để nhập giá trị lớn nhất cần điền.
- Bước 12: Sử dụng phím tab, shift+tab để chuyển đến nút Ok rồi nhấn enter.

4. Nhập cùng nội dung vào nhiều ô liên tiếp
Nhập dữ liệu vào ô đầu tiên:
* Cách 1:
- Bước 1: Nhấn tổ hợp phím Shift+mũi tên xuống để chọn các ô trong cùng cột (bao gồm cả ô vừa nhập liệu) hoặc Shift+mũi tên trái, phải để chọn các ô trong cùng hàng (bao gồm cả ô vừa nhập liệu).
- Bước 2: Nhấn tổ hợp phím Ctrl+d để nhập cùng nội dung vào cột hoặc nhấn Ctrl+r để nhập cùng nội dung vào hàng.
* Cách 2: 
- Bước 1: Nhấn phím alt để vào thanh menu.
- Bước 2: Nhấn phím h để mở thực đơn Home.
- Bước 3: Nhấn tab đến mục Editing.
- Bước 4: Dùng mũi tên lên, xuống để đi đến mục Fill.
- Bước 5: Nhấn enter để mở.
- Bước 6: Dùng mũi tên lên, xuống để chọn Down hoặc Right.
- Bước 7: Nhấn enter.

6. Tách và nối ô
6.1. Nối ô
- Bước 1: Chọn các ô bạn muốn nối lại thành một ô.
- Bước 2: Đi đến chức năng Merge & Center bằng cách:
+ Nhấn phím alt vào thanh menu.
+ Nhấn phím h để mở menu Home.
+ Nhấn tab để đi đến mục Alignment submenu.
+ Nhấn m hoặc mũi tên lên để đi đến mục Merge & center.
+ Nhấn enter để mở.
- Bước 3: Dùng mũi tên lên, xuống để đi đến mục Merge & cell.
- Bước 4: Nhấn enter.
6.2. Tách ô đã nối
- Bước 1: Chọn ô đã nối.
- Bước 2: Đi đến chức năng Merge & Center bằng cách:
+ Nhấn phím alt vào thanh menu.
+ Nhấn phím h để mở menu Home.
+ Nhấn tab để đi đến mục Alignment submenu.
+ Nhấn m hoặc mũi tên lên để đi đến mục Merge center.
+ Nhấn enter để mở mục này.
- Bước 3: Nhấn u hoặc dùng mũi tên lên, xuống để đi đến mục Unmerge cell.
- Bước 4: Nhấn enter.

7. Chèn thêm hàng, cột
7.1. Chèn thêm hàng
- Bước 1: Di chuyển con trỏ đến hàng cần chèn.
- Bước 2: Nhấn phím application để mở thực đơn ngữ cảnh.
- Bước 3: Nhấn phím I hoặc mũi tên lên, xuống để đi đến Insert.
- Bước 4: Nhấn enter.
- Bước 5: Nhấn tổ hợp phím alt+r hoặc mũi tên lên, xuống Entire row.
- Bước 6: Sử dụng phím tab, shift+tab để chọn nút OK.
- Bước 7: Nhấn Enter.
Hàng được thêm vào phía trên hàng bạn chọn.
7.2. Chèn thêm cột
- Bước 1: Di chuyển con trỏ đến cột cần chèn.
- Bước 2: Nhấn phím application để mở thực đơn ngữ cảnh.
- Bước 3: Nhấn phím i hoặc mũi tên lên, xuống đi đến Insert.
- Bước 4: Nhấn enter.
- Bước 5: Nhấn tổ hợp phím alt+c hoặc mũi tên lên, xuống để chọn mục Entire column.
- Bước 6: Sử dụng phím tab, shift+tab để chọn nút OK.
- Bước 7: Nhấn Enter.
Cột được thêm vào phía bên trái cột bạn chọn.

8. Xóa hàng, cột, ô
8.1. Xóa hàng
- Bước 1: Chọn hàng bạn muốn xóa.
- Bước 2: Nhấn Application để mở thực đơn ngữ cảnh.
- Bước 3: Nhấn phím d hoặc dùng mũi tên lên, xuống để đi đến Delete.
- Bước 4: Nhấn enter.
- Bước 5: Nhấn tổ hợp phím Alt+r hoặc mũi tên lên, xuống để chọn mục Entire row.
- Bước 6: Sử dụng phím Tab, Shift+tab để chọn nút OK.
- Bước 7: Nhấn Enter.
8.2. Xóa cột
- Bước 1: Chọn cột bạn muốn xóa.
- Bước 2: Nhấn phím Application để mở thực đơn ngữ cảnh.
- Bước 3: Nhấn phím d hoặc mũi tên lên, xuống để đi đến Delete.
- Bước 4: Nhấn Enter.
- Bước 5: Nhấn tổ hợp phím Alt+c hoặc mũi tên lên, xuống để chọn mục Entire column.
- Bước 6: Sử dụng phím Tab, Shift+tab để chọn nút OK.
- Bước 7: Nhấn Enter.
8.3. Xóa ô
- Bước 1: Chọn ô cần xóa.
- Bước 2: Nhấn phím Application để mở thực đơn ngữ cảnh.
- Bước 3: Nhấn phím i hoặc mũi tên lên, xuống để đi đến Delete.
- Bước 4: Nhấn Enter.
- Bước 5: Nhấn tổ hợp phím Alt+f hoặc mũi tên lên, xuống để chọn mục Shift cells down nếu bạn muốn xóa các ô được chọn và đẩy ô bên phải ô vừa hủy sang bên trái.
Nhấn tổ hợp phím Alt+u nếu bạn muốn hủy ô được chọn và đẩy các ô bên dưới ô được chọn lên.
- Bước 6: Sử dụng phím Tab, Shift+tab để chọn nút OK.
- Bước 7: Nhấn Enter.

9. Ẩn cột hoặc hàng
9.1. Ẩn hàng
* Cách 1:
- Bước 1: Để ẩn hàng bạn di chuyển đến hàng cần ẩn.
- Bước 2: Nhấn phím Alt vào thanh menu.
- Bước 3: Nhấn phím h vào menu Home.
- Bước 4: Nhấn tab đi đến mục Cell.
- Bước 5: Dùng mũi tên lên, xuống đến mục Format.
- Bước 6: Nhấn enter để mở.
- Bước 7: Dùng mũi tên lên, xuống để đi đến Hide & Unhide.
- Bước 8: Nhấn enter để mở.
- Bước 9: Dùng mũi tên lên, xuống để đi đến Hide rows.
- Bước 10: Nhấn enter.
* Cách 2: Bạn có thể dùng phím tắt: Nhấn Ctrl+9. 
9.2. Hiển thị hàng đã ẩn 
* Cách 1: 
- Bước 1: Để hiển thị hàng đã ẩn trong hộp thoại hide & unhide dùng mũi tên lên, xuống để đi đến mục Unhide Rows.
- Bước 2: Nhấn enter.
* Cách 2: Bạn có thể sử dụng phím tắt: Nhấn Ctrl+Shift+9.
9.3. Ẩn cột
* Cách 1:
- Bước 1: Di chuyển đến cột cần ẩn.
- Bước 2: Nhấn phím Alt vào thanh menu.
- Bước 3: Nhấn phím h vào menu Home.
- Bước 4: Nhấn tab đi đến mục Cell.
- Bước 5: Dùng mũi tên lên, xuống đến mục Fomat.
- Bước 6: Nhấn enter để mở.
- Bước 7: Dùng mũi tên lên, xuống để đi đến Hide & Unhide.
- Bước 8: Nhấn enter để mở.
- Bước 9: Dùng mũi tên lên, xuống để đi đến Hide Column.
- Bước 10: Nhấn enter.
* Cách 2: Bạn có thể dùng phím tắt: Nhấn Ctrl+0.
9.4. Hiển thị cột đã ẩn
* Cách 1:
- Bước 1: Mở hộp thoại Hide & Unhide.
- Bước 2: Dùng mũi tên lên, xuống để đi đến mục Unhide Column.
- Bước 3: Nhấn enter.
* Cách 2: Bạn có thể dùng phím tắt: Nhấn Ctrl+shift+0.`
};
