import type { SyllabusItem } from ".";

export const item: SyllabusItem = {
  id: "sound-forge",
  title: "Sound Forge: Xử Lý Âm Thanh",
  content: `
1.1. Các lệnh thường dùng
- Nghe/dừng nghe: Spacebar
- Dừng nghe/nghe tiếp: Enter
- Mở menu Record: Ctrl+r
- Ghi/dừng ghi: r
- Lưu với tên khác: Alt+f2
- Đánh dấu điểm bắt đầu: i
- Đánh dấu điểm cuối: o
- Mở menu Effects: Alt+c
- Mở menu Process: Alt+p
- Mở menu Insert: Alt+i
- Mở menu Edit: Alt+e
- Mở hộp thoại Mix: Ctrl+m

1.2. Thu âm
- Bước 1: Mở chương trình Sound Forge.
- Bước 2: Nhấn Ctrl+r để mở menu Record, nhấn chữ r để bắt đầu ghi âm.(Dừng ghi/ghi tiếp: nhấn r).
- Bước 3: Nhấn Esc hoặc Alt+F4 để đóng cửa sổ ghi.(Muốn ghi tiếp, nhấn Ctrl+End về cuối, nhấn Ctrl+r, nhấn chữ r để thu tiếp).

1.3. Thay đổi độ cao cho file âm thanh
- Bước 1: Mở file âm thanh cần điều chỉnh.
- Bước 2: Nhấn phím Alt để mở thanh menu, nhấn mũi tên phải đi đến menu Effects. Bạn có thể mở nhanh bằng tổ hợp phím Alt+c.
- Bước 3: Nhấn mũi tên xuống đến Pitch Sub menu, nhấn mũi tên phải để mở.Bạn có thể nhấn chữ p để mở nhanh mục này.
- Bước 4: Nhấn mũi tên xuống đến hộp thoại Shift, nhấn Enter để mở. 
- Bước 5: Nhấn Tab đi đến mục Preserve duration, nhấn phím Space bar để bỏ chọn.Bạn có thể thực hiện nhanh bằng lệnh Alt+d.
- Bước 6: Nhấn Shift+tab 5 lần Jaws sẽ đọc mục edit.Bạn có thể nhấn tổ hợp phím Alt+m để đến nhanh mục này.
- Bước 7: Nhấn mũi tên lên, xuống để tăng, giảm độ cao của file.Nhấn mũi tên lên một lần, tăng nửa tone, hai lần tăng một tone. Nhấn mũi tên xuống một lần thì giảm nửa tone, hai lần giảm một tone.
Lưu ý: Bạn chỉ có thể tăng, giảm tối đa là 6 tone.
- Bước 8: Nhấn tab đến nút Preview, nhấn phím SpaceBar để nghe thử và dừng nghe.Bạn có thể kích hoạt nút này bằng tổ hợp phím Alt+p.
- Bước 9: Nhấn Tab đến nút OK, nhấn Enter để xác nhận.
- Bước 10: Lưu thay đổi.

1.4. Thay đổi tốc độ của file âm thanh
- Bước 1: Mở file âm thanh cần điều chỉnh. 
- Bước 2: Nhấn phím Alt để mở thanh menu, nhấn mũi tên phải đi đến menu Process.Bạn có thể mở nhanh menu này bằng lệnh Alt+p.
- Bước 3: Nhấn mũi tên lên đi đến Time sub menu, nhấn mũi tên phải để mở.Bạn có thể Nhấn chữ t để mở nhanh mục này.
- Bước 4: Nhấn Enter tại hộp thoại TimeStretch.
- Bước 5: Nhấn Tab đến Input format, nhấn mũi tên lên, xuống chọn Tempo.Bạn có thể sử dụng câu lệnh: Alt+t để đi nhanh đến mục này.
- Bước 6: Nhấn Tab đến Bypass, nhấn Enter để bỏ chọn mục này.Bạn có thể đi đến tùy chọn này bằng tổ hợp phím Alt+b.
- Bước 7: Nhấn Tab đến Final Tempo, dùng các phím di chuyển để tăng, giảm tốc độ của file. Bạn có thể sử dụng nhanh bằng tổ hợp phím Alt+f.
+ Nhấn Home, End để tăng, giảm tốc độ tối đa cho file.
+ Nhấn mũi tên lên, xuống để giảm, tăng 0,01 phần trăm đơn vị.
+ Nhấn Page Up, Page Down để giảm, tăng 1 phần trăm.
- Bước 8: Nhấn tab đến nút Preview, nhấn Spacebar để nghe thử và dừng nghe.Bạn có thể dùng tổ hợp phím Alt+p để kích hoạt nhanh nút này.
- Bước 9: Nhấn tab đến nút OK, nhấn Enter để xác nhận.
- Bước 10: Lưu thay đổi.

1.5. Thay đổi tần số cho file âm thanh
- Bước 1: Mở file âm thanh cần điều chỉnh. 
- Bước 2: Nhấn phím Alt để mở thanh menu, nhấn mũi tên phải đi đến menu Process.Bạn có thể mở nhanh menu này bằng lệnh Alt+p.
- Bước 3: Nhấn mũi tên lên, xuống, tìm đến Resample sub menu, nhấn mũi tên phải để mở.Bạn có thể nhấn chữ s để mở nhanh mục này.
- Bước 4: Nhấn Enter tại hộp thoại Resample.
- Bước 5: Nhấn mũi tên lên, xuống để chọn các tần số khác nhau.Lưu ý: Khi di chuyển, Jaws sẽ không đọc mà bạn phải dùng câu lệnh Insert+mũi tên lên để nghe.Bạn cũng có thể nhấn Tab một lần đến New sample rate và nhập giá trị mới cho file.
- Bước 6: Nhấn Tab đến nút OK, nhấn Enter để xác nhận.
- Bước 7: Lưu thay đổi.`
};
