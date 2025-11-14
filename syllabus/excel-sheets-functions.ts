export const item = {
  title: "Excel: Quản Lý Sheet và Các Hàm Cơ Bản",
  content: `
11. Thao tác với các bảng tính trong workbook
11.1. Kích hoạt bảng tính
Nhấn tổ hợp phím Ctrl+Page Down để chuyển sang các bảng tính bên phía phải, hoặc nhấn tổ hợp phím Cltr+Page Up để chuyển sang các bảng tính bên phía trái.
11.2. Đổi tên bảng tính
- Bước 1: Nhấn alt vào thanh menu, nhấn h vào thanh menu Home.
- Bước 2: Nhấn tab để đi đến mục Cell submenu.
- Bước 3: Dùng mũi tên lên, xuống để đi đến Format.
- Bước 4: Nhấn enter để mở.
- Bước 5: Nhấn tab hoặc Shift+tab để đi đến mục Rename sheet.
- Bước 6: Nhấn enter để đổi tên.
11.3. Chèn thêm bảng tính
* Cách 1:
Nhấn tổ hợp phím Shift+f11, một bảng tính mới được chèn và đẩy bảng tính bạn đang chọn sang bên phải.
* Cách 2:
- Bước 1: Nhấn Alt vào thanh menu.
- Bước 2: Nhấn h vào thanh menu Home.
- Bước 3: Nhấn tab để đi đến mục Cell submenu.
- Bước 4: Dùng mũi tên lên, xuống để đi đến Insert.
- Bước 5: Nhấn enter để mở mũi tên lên, xuống chọn Insert sheet.
- Bước 6: Nhấn enter.
11.4. Xóa bảng tính
- Bước 1: Nhấn Alt vào thanh menu.
- Bước 2: Nhấn h vào thanh menu Home.
- Bước 3: Nhấn tab để đi đến mục Cell submenu.
- Bước 4: Dùng mũi tên lên, xuống để đi đến Delete.
- Bước 5: Nhấn enter.
- Bước 6: Dùng mũi tên lên, xuống chọn Delete sheet.
- Bước 7: Nhấn enter. Excel thông báo xác nhận xóa bảng tính, nếu bạn đồng ý xóa nhấn phím Enter, trong trường hợp bạn không muốn xóa nhấn phím Esc.
11.5. Di chuyển, sao chép các bảng tính
* Di chuyển
Để di chuyển bảng tính đến các vị trí khác nhau trong cùng workbook hay các workbook khác đang mở, bạn thực hiện:
- Bước 1: Nhấn Alt vào thanh menu.
- Bước 2: Nhấn h vào thanh menu Home.
- Bước 3: Nhấn tab để đi đến mục Cell submenu.
- Bước 4: Dùng mũi tên lên, xuống để đi đến Format.
- Bước 5: Nhấn enter để mở.
- Bước 6: Tab hoặc Shift tab đi đến Move or coppy sheet, nhấn enter.
- Bước 7: Nhấn tổ hợp Alt+t hoặc Shift+tab đi đến mục To book.
- Bước 8: Sử dụng phím mũi tên lên, mũi tên xuống để chọn đến workbook bạn muốn.
- Bước 9: Nhấn tổ hợp phím Alt+b hoặc tab để đi đến mục Before sheet.
- Bước 10: Chọn danh sách các bảng tính mà bảng tính được chọn sẽ chuyển tới bên trái chúng (hoặc chọn mục: Move to end – chuyển đến cuối cùng).
- Bước 11: Sử dụng các phím mũi tên lên, mũi tên xuống để chọn.
- Bước 12: Sử dụng phím tab, shift+tab để chuyển đến nút OK.
- Bước 13: Nhấn Enter.
* Sao chép
- Bước 1: Nhấn Alt vào thanh menu.
- Bước 2: Nhấn h vào thanh menu Home.
- Bước 3: Nhấn tab để đi đến mục Cell submenu.
- Bước 4: Dùng mũi tên lên, xuống để đi đến Format.
- Bước 5: Nhấn enter để mở.
- Bước 6: Tab hoặc Shift+tab đi đến Move or copy sheet.
- Bước 7: Nhấn tổ hợp Alt+t hoặc Shift+tab đi đến mục To book.
- Bước 8: Sử dụng phím mũi tên lên, mũi tên xuống để chọn đến workbook bạn muốn.
- Bước 9: Nhấn tổ hợp phím alt+b hoặc tab để đi đến mục Before sheet, chọn danh sách các bảng tính mà bảng tính được chọn sẽ chuyển tới bên trái chúng (hoặc chọn mục: Move to end – chuyển đến cuối cùng).
- Bước 10: Sử dụng các phím mũi tên lên, mũi tên xuống để chọn.
- Bước 11: Nhấn tổ hợp phím Alt+c hoặc tab đến mục Create a copy.
- Bước 12: Nhấn spacebar để chọn mục này.
- Bước 13: Sử dụng phím tab, shift+tab để chuyển đến nút OK
- Bước 14: Nhấn Enter.

12. Các hàm cơ bản
12.1. Hàm Max
Hàm max trả lại giá trị lớn nhất trong tập hợp các giá trị. Cú pháp: Max(number1;number2)
Trong đó: Number1 là số đầu tiên, number2 là số cuối cùng trong dãy số muốn tìm giá trị lớn nhất. 
12.2. Hàm Min
Hàm min trả lại giá trị nhỏ nhất trong tập hợp các giá trị. Cú pháp: Min(number1;number2)
Trong đó: number1 là số đầu tiên, number2 là số cuối cùng trong dãy số muốn tìm giá trị nhỏ nhất. 
12.3. Hàm Sum
Hàm sum cho giá trị là tổng các số trong một miền ô. Cú pháp: Sum(number1;number2)
Trong đó, number1 là số đầu tiên, number2 là số cuối cùng của dãy số muốn tính tổng giá trị của chúng.
12.4. Hàm Average
Hàm average trả về giá trị trung bình cộng của các tham số. Cú pháp: Average(number1;number2)
Trong đó: Number1 là số đầu tiên, number2 là số cuối cùng của dãy số muốn tính giá trị trung bình.
12.5. Hàm If
Trả if lại một giá trị nếu điều kiện chỉ định được đánh giá là TRUE và trả lại giá trị kia nếu điều kiện nhận giá trị FALSE.
Cú pháp: IF (logical_test;value_if_true;value_if_false)
Trong đó, logical_test là bất kì giá trị hoặc biểu thức nào được đánh giá là TRUE hoặc FALSE. Value_if_true là giá trị được hàm trả về nếu logical_test là TRUE. Value_if_true có thể là một công thức. Value_if_false là giá trị được trả về nếu logical_test có giá trị FALSE. Value_if_false có thể là công thức. Có thể lồng 7 hàm IF thay cho các giá trị value_if_true và value_if_false.
- Ví dụ: khi ta cần xếp loại học sinh theo điểm trung bình theo tiêu chí sau: 	Nếu điểm trung bình (DTB) lớn hơn hoặc bằng 8.0 thì xếp loại Giỏi, từ 6.5 đến 8.0 xếp loại Khá, từ 5.0 đến dưới 6.5 xếp loại Trung bình, DTB nhỏ hơn 5.0 thì xếp loại Kém. Hàm if như sau: IF(DTB>=8.0,"Giỏi",IF(DTB>=6.5,"Khá",IF(DTB>=5.0,"Trungbình","Kém")))`
};
