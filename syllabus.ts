import type { SyllabusContent } from './types';

export const SYLLABUS_CONTENT: SyllabusContent[] = [
    {
        id: '1',
        level: 1,
        title: 'PHẦN I: XỬ LÝ ÂM THANH VÀ CÁC PHẦN MỀM HỖ TRỢ TIẾNG NÓI',
        children: [
            {
                id: '1.1',
                level: 2,
                title: 'I. JAWS',
                children: [
                    {
                        id: '1.1.1',
                        level: 3,
                        title: '1. Lý thuyết',
                        children: [
                            {
                                id: '1.1.1.1',
                                level: 4,
                                title: '1.1. Các lệnh bàn phím thông dụng',
                                content: `* Đọc văn bản:
- Đọc ký tự: Num5
- Đọc từ: Ins+Num5
- Đánh vần từ: Ins+Num5 (2 lần). 
- Đọc từ bên phải vị trí con trỏ hiện tại: Ins+mũi tên phải.
- Đọc từ bên trái vị trí con trỏ hiện tại: Ins+mũi tên trái.
- Đọc dòng hiện tại: Ins+Num8 hoặc Ins+mũi tên lên.
- Đánh vần dòng hiện tại: Ins+Num8 (2 lần) hoặc Ins+mũi tên lên (2 lần). 
- Đọc vùng chọn: Shift+Ins+Num2, Shift+Ins+mũi tên xuống.
- Đọc từ vị trí con trỏ về cuối văn bản: Ins+Num2, Ins+mũi tên xuống.
- Ngừng đọc: Ctrl

* Duyệt và lấy thông tin
- Đọc tiêu đề cửa sổ: Ins+t.
- Đọc phông chữ: Ins+f.
- Đọc thông tin phông chữ trên cửa sổ ảo: Ins+f (2 lần).
- Đọc dòng trạng thái: Ins+Num3 Ins+Page Down.
- Liệt kê danh sách cửa sổ đang mở: Ins+f10.
- Liệt kê các biểu tượng trên khay hệ thống: Ins+f11.
- Đọc giờ hệ thống: Ins+f12.
- Đọc ngày hệ thống: Ins+f12 (2 lần).
- Mở Word List: Ctrl+ins+w.
- Đọc thông tin phiên bản chương trình: Ctrl+Ins+v.
- Tăng tốc độ đọc tạm thời: Ctrl+alt+Page Up.
- Giảm tốc độ đọc tạm thời: Ctrl+Alt+Page Down.
- Tăng tốc độ mặc định: Ctrl+Windows+Alt+Page Up.
- Giảm tốc độ mặc định: Ctrl+Windows+Alt+Page Down.

* Các lệnh khi làm việc với hộp thoại:
- Nghe lại mục hiện tại: Ins+Tab
- Đi tới mục kế tiếp: Tab
- Quay lại mục trước: Shift+Tab
- Đi tới trang kế tiếp: Ctrl+Tab
- Quay lại trang trước: Ctrl+Shift+Tab

* Làm việc với các trình duyệt web
- Mở danh sách các link (liên kết): Ins+f7
- Mở danh sách các heading (tiêu đề): Ins+f6
- Mở danh sách các button (nút): Ins+f5
- Thoát khỏi các danh sách trên: Esc
- Đi tới các link chưa mở: u
- Quay lại các link chưa mở: Shift+u
- Đi tới các link đã mở: v
- Quay lại các link đã mở: Shift+v
- Đi tới các form: f
- Quay lại các form: Shift+f
- Mở form: Enter
- Đóng form: Escape
- Đi tới các edit: e
- Quay lại các edit: Shift+e
- Đi tới các button: b
- Quay lại các button: Shift+b
- Đi tới các đoạn text: n
- Quay lại các đoạn text: Shift+n
- Đi tới các Check box: x
- Quay lại các Check box: Shift+x
- Đi tới các radio: a
- Quay lại các radio: Shift+a`
                            }
                        ]
                    },
                ]
            },
            {
                id: '1.2',
                level: 2,
                title: 'II. NVDA',
                children: [
                    {
                        id: '1.2.1',
                        level: 3,
                        title: '1. Các lệnh thường dùng',
                        content: `- Mở NVDA: Ctrl+Alt+n
- Thoát NVDA: NVDA+q
- Tạm dừng NVDA nói: nhấn phím Shift
- Dừng hẳn NVDA nói: nhấn phím Ctrl
- Bật/tắt chế độ đọc từng ký tự khi soạn thảo: NVDA+2
- Bật/tắt chế độ đọc từng từ khi soạn thảo: NVDA+3
- Bật/tắt chế độ đọc phím điều khiển: NVDA+4
- Thông báo thanh trạng thái: NVDA+Shift+End
- Thông báo dữ liệu trong bộ nhớ tạm: NVDA+c.
- Đọc từ vị trí con trỏ đến cuối văn bản: NVDA+mũi tên xuống, NVDA+a
- Đọc dòng hiện tại: NVDA+mũi tên lên, NVDA+l
- Đọc vùng văn bản đang chọn: NVDA+Shift+s
- Chuyển qua lại giữa các chế độ đọc dấu điều khiển: NVDA+p
- Chuyển qua lại giữa các chế độ nói của NVDA: NVDA+s
- Mở nhanh menu NVDA: NVDA+n
- Chuyển qua lại giữa các tham số của bộ đọc (tần số, ngôn ngữ, âm lượng,…) Ctrl+NVDA+mũi tên trái (phải).
- Thay đổi giá trị của thông số hiện tại: Ctrl+NVDA+mũi tên lên (xuống)
- Mở danh sách các bộ đọc: Ctrl+NVDA+s
- Mở Document Formatting (Định dạng tài liệu) NVDA+Ctrl+d`
                    }
                ]
            },
            {
                id: '1.3',
                level: 2,
                title: 'III. SOUND FORGE',
                children: [
                    {
                        id: '1.3.1',
                        level: 3,
                        title: '1. Lý thuyết',
                        children: [
                            {
                                id: '1.3.1.1',
                                level: 4,
                                title: '1.1. Các lệnh thường dùng',
                                content: `- Nghe/dừng nghe: Spacebar
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
- Mở hộp thoại Mix: Ctrl+m`
                            },
                            {
                                id: '1.3.1.2',
                                level: 4,
                                title: '1.2. Thu âm',
                                content: `- Bước 1: Mở chương trình Sound Forge.
- Bước 2: Nhấn Ctrl+r để mở menu Record, nhấn chữ r để bắt đầu ghi âm.(Dừng ghi/ghi tiếp: nhấn r).
- Bước 3: Nhấn Esc hoặc Alt+F4 để đóng cửa sổ ghi.(Muốn ghi tiếp, nhấn Ctrl+End về cuối, nhấn Ctrl+r, nhấn chữ r để thu tiếp).`
                            },
                             {
                                id: '1.3.1.3',
                                level: 4,
                                title: '1.3. Thay đổi độ cao cho file âm thanh',
                                content: `- Bước 1: Mở file âm thanh cần điều chỉnh.
- Bước 2: Nhấn phím Alt để mở thanh menu, nhấn mũi tên phải đi đến menu Effects. Bạn có thể mở nhanh bằng tổ hợp phím Alt+c.
- Bước 3: Nhấn mũi tên xuống đến Pitch Sub menu, nhấn mũi tên phải để mở.Bạn có thể nhấn chữ p để mở nhanh mục này.
- Bước 4: Nhấn mũi tên xuống đến hộp thoại Shift, nhấn Enter để mở.
- Bước 5: Nhấn Tab đi đến mục Preserve duration, nhấn phím Space bar để bỏ chọn.Bạn có thể thực hiện nhanh bằng lệnh Alt+d.
- Bước 6: Nhấn Shift+tab 5 lần Jaws sẽ đọc mục edit.Bạn có thể nhấn tổ hợp phím Alt+m để đến nhanh mục này.
- Bước 7: Nhấn mũi tên lên, xuống để tăng, giảm độ cao của file.Nhấn mũi tên lên một lần, tăng nửa tone, hai lần tăng một tone. Nhấn mũi tên xuống một lần thì giảm nửa tone, hai lần giảm một tone.
Lưu ý: Bạn chỉ có thể tăng, giảm tối đa là 6 tone.
- Bước 8: Nhấn tab đến nút Preview, nhấn phím SpaceBar để nghe thử và dừng nghe.Bạn có thể kích hoạt nút này bằng tổ hợp phím Alt+p.
- Bước 9: Nhấn Tab đến nút OK, nhấn Enter để xác nhận.
- Bước 10: Lưu thay đổi.`
                            },
                             {
                                id: '1.3.1.4',
                                level: 4,
                                title: '1.4. Thay đổi tốc độ của file âm thanh',
                                content: `- Bước 1: Mở file âm thanh cần điều chỉnh.
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
- Bước 10: Lưu thay đổi.`
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
