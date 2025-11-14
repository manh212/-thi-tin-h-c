export const item = {
  title: "Balabolka: Chuyển Đổi Văn Bản thành Âm Thanh",
  content: `
1.1. Các câu lệnh thường dùng
- Đọc văn bản: F5
- Tạm dừng/nghe tiếp: F6
- Dừng hẳn: F7
- Đọc vùng chọn: F8
- Đọc bộ nhớ tạm: F9
- Mở hộp thoại Save Audio File: Ctrl+w
- Mở hộp thoại Replace Numbers with Words: Ctrl+g
- Mở hộp thoại: Insert Audio Clip... Ctrl+Alt+Ins

1.2. Chuyển đổi văn bản thành audio
- Bước1: Mở chương trình Balabolka.
- Bước 2: Một cửa sổ soạn thảo xuất hiện, bạn có thể nhập hoặc copy nội dung cần chuyển đổi và dán vào đây.
- Bước 3: Nhấn Tab hai lần đến combobox, nhấn mũi tên lên, xuống để chọn các giọng đọc có sẵn trong máy tính của bạn.
- Bước 4: Nhấn Tab đến left right slider thứ nhất, nhấn mũi tên lên xuống để chọn tốc độ đọc.
- Bước 5: Nhấn Tab đến left right slider thứ hai, nhấn mũi tên lên xuống, chọn độ cao cho giọng đọc.
- Bước 6: Nhấn Tab đến left right slider thứ ba, đây là phần điều chỉnh volume cho giọng đọc, nhấn mũi tên lên, xuống để thay đổi.
- Bước 7: Nhấn F5 để nghe thử, F6 để tạm dừng và nghe tiếp, F7 để dừng hẳn.
- Bước 8: Nhấn phím Alt để mở thanh menu, nhấn mũi tên xuống chọn hộp thoại Save audio file, nhấn Enter để mở.Bạn có thể thay bước trên bằng tổ hợp phím Ctrl+w.
- Bước 9: Hộp thoại lưu file xuất hiện, bạn nhập tên file và chọn thư mục để lưu.Mặc định, chương trình sẽ lưu file vào C:\\Program Files\\Balabolka
- Bước 10: Nhấn Tab đến Save as type, nhấn mũi tên lên, xuống, để chọn kiểu định dạng file: mp3, wav...
- Bước 11: Nhấn Tab đến nút Save, nhấn Enter để lưu file.Bạn có thể thay bước trên bằng tổ hợp phím Alt+s.Khi nghe tiếng chuông báo, có nghĩa là file đã lưu xong.Lúc này, bạn có thể nhấn Alt+f4 để đóng chương trình. Hộp thoại thông báo lưu văn bản xuất hiện, bạn nhấn Enter tại nút No để hủy bỏ và đóng chương trình.

1.3. Chuyển đổi hàng loạt file văn bản thành file âm thanh
- Bước 1: Mở chương trình Balabolka.
- Bước 2: Nhấn Tab hai lần đến combo box, nhấn mũi tên lên, xuống để chọn các giọng đọc có sẵn trong máy tính của bạn.
- Bước 3: Nhấn Tab đến Left right slider thứ nhất, nhấn mũi tên lên xuống để chọn tốc độ đọc.
- Bước 4: Nhấn Ctrl+y để mở hộp thoại Bat file converter.
- Bước 5: Nhấn Tab đến nút Add file, nhấn Enter để mở.Trường File name xuất hiện, tìm và mở thư mục chứa file văn bản cần chuyển đổi, bạn có thể chọn một hay nhiều file, hoặc tất cả file trong thư mục.
- Bước 6: Nhấn Tab đến nút Open, nhấn Enter để nạp file vào chương trình.
- Bước 7: Nhấn Tab đến Output Folder, để xem đường dẫn lưu file.Bạn có thể thay đổi nơi lưu file bằng cách nhấn Enter tại nút Browse ở kế tiếp.
- Bước 8: Nhấn Tab đến Combo box, nhấn mũi tên lên xuống để chọn định dạng file xuất ra.
- Bước 9: Nhấn Tab đến nút Convert, nhấn Enter để chuyển đổi.Chờ chương trình tiến hành chuyển đổi và khi nghe âm báo là công việc đã hoàn thành.

1.4. Chuyển văn bản thành file âm thanh với giọng nói Google TTS
- Bước 1: Sao chép nội dung văn bản cần chuyển đổi.
- Bước 2: Mở chương trình Balabolka.
- Bước 3: Nhấn Ctrl+Shift+d để mở hộp thoại Save Audio File (Google TTS).
- Bước 4: Dán văn bản vừa sao chép.
- Bước 5: Nhấn Tab đến nút Browse, nhấn Enter để mở.Tại đây, bạn nhập tên file và tìm nơi lưu file.
- Bước 6: Nhấn Tab đến Combo box, nhấn mũi tên lên xuống để chọn định dạng file âm thanh xuất ra.
- Bước 7: Nhấn Tab đến nút Save, nhấn Enter.
- Bước 8: Nhấn Tab đến Combo box, nhấn mũi tên lên, xuống hoặc chữ v để chọn Vietnamese.
- Bước 9: Nhấn Tab đến nút Save, nhấn Enter để tiến hành lưu file.Khi nghe tiếng chuông báo hay Jaws thông báo: Recording complete, có nghĩa việc chuyển đổi đã hoàn tất.
- Bước 10: Nhấn tab đến nút Close, nhấn enter để đóng.Lúc này, chương trình sẽ quay về giao diện như khi mới khởi động. Bạn có thể nhấn Alt+f4 để đóng chương trình hay tiếp tục với Balabolka.

1.5. Trích xuất văn bản từ các định dạng epub, file pdf, chm... thành file txt
- Bước 1: Mở chương trình Balabolka.
- Bước 2: Nhấn Ctrl+shift+f để mở Extract Text from files.
- Bước 3: Nhấn Tab đến nút Add file, nhấn Enter để mở.Trường File name xuất hiện, tìm và mở thư mục chứa file văn bản cần chuyển đổi, bạn có thể chọn một hay nhiều file, hoặc tất cả file trong thư mục.
- Bước 4: Nhấn Tab đến nút Open, nhấn Enter để nạp file vào chương trình.
- Bước 5: Nhấn Tab đến Output Folder, để xem đường dẫn lưu file.Bạn có thể thay đổi nơi lưu file bằng cách nhấn Enter tại nút Browse ở kế tiếp.
- Bước 6: Nhấn Tab đến thẻ Files, nhấn Ctrl+Tab để chuyển sang thẻ text.
- Bước 7: Nhấn Tab một lần đến lựa chọn bảng mã, nhấn mũi tên lên, xuống để chọn: UTF-8 hoặc Unicode đối với file tiếng Việt. Còn với file tiếng nước ngoài thì bạn cứ để là AnSI.
- Bước 8: Nhấn Tab đến nút Convert, nhấn Enter để tiến hành chuyển đổi. 
- Bước 9: Xuất hiện hộp thoại thông báo số file đã hoàn thành, kèm theo âm báo, nhấn Enter tại nút Ok để hoàn tất.
- Bước 10: Nhấn Tab đến nút Close, nhấn Enter để đóng.Giao diện chương trình sẽ quay lại như mới khởi động. Bạn có thể nhấn Alt+f4 để đóng chương trình hoặc tiếp tục làm việc với Balabolka.`
};
