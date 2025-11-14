export const item = {
  title: "Kiểm Tra Tính Tiếp Cận Web",
  content: `
I. Lý thuyết
1. Khái niệm và tiêu chuẩn tiếp cận web
Tiếp cận web là khả năng để mọi người, bao gồm người khuyết tật (khiếm thị, khiếm thính, khuyết tật vận động, rối loạn nhận thức...), có thể truy cập, sử dụng và hiểu được nội dung trên trang web.
Bộ tiêu chuẩn chính:WCAG – Web Content Accessibility Guidelines do W3C phát triển. Các phiên bản hiện hành:
• WCAG 2.0 (2008)
• WCAG 2.1 (2018)
• WCAG 2.2 (2023)
4 nguyên tắc chính (POUR):
STT	Nguyên tắc	Tiếng Anh	Ý nghĩa
1	Nhận biết được	Perceivable	Người dùng có thể cảm nhận nội dung bằng giác quan (thường là thị giác hoặc thính giác).
2	Vận hành được	Operable	Người dùng có thể điều hướng và sử dụng trang bằng bàn phím hoặc thiết bị hỗ trợ.
3	Hiểu được	Understandable	Nội dung và giao diện dễ hiểu, dễ đoán và nhất quán.
4	Mạnh mẽ	Robust	Trang web hoạt động tốt với nhiều trình duyệt, thiết bị và phần mềm hỗ trợ.
3 mức độ tuân thủ WCAG:
Mức độ	Tên gọi	Mô tả ngắn gọn
A	Tối thiểu	Mức cơ bản nhất, bắt buộc để trang web có thể sử dụng được.
AA	Trung bình	Mức khuyến nghị chính thức, đảm bảo trang web tiếp cận tốt.
AAA	Nâng cao	Mức cao nhất, khó đạt toàn diện nhưng lý tưởng cho nội dung chuyên biệt.

2. Một số thành phần cơ bản cần kiểm tra
Việc kiểm tra tính tiếp cận của trang web có thể được thực hiện bằng các công cụ tự động, lướt duyệt web bằng trình đọc màn hình, hoặc quan sát bằng mắt. Dưới đây là một số thành phần cơ bản cần kiểm tra:
Thành phần	Khái niệm và vai trò	Yêu cầu về tiếp cận
Tiêu đề trang (Title)	Là phần tên hiển thị trên tab của trình duyệt, thường dùng thẻ <title>. Giúp người dùng trình đọc màn hình nhận biết nhanh nội dung tab đang mở.	Mỗi trang nên có tiêu đề duy nhất, ngắn gọn, mô tả đúng nội dung chính. Nếu là trang web con thì nên bao gồm tên trang web con và Trang web mẹ.
Mốc trang (Landmarks)	Là các vùng chức năng như banner, navigation, main, contentinfo, giúp phân chia bố cục trang web.	Trang nên có ít nhất 3 mốc chính: Banner (đầu), Main (nội dung chính), Contentinfo (cuối).
Đề mục (Heading)	Là các tiêu đề từ <h1> đến <h6>, đóng vai trò giống mục lục. Giúp người dùng hình dung bố cục nội dung.	Heading phải thiết lập đúng cho các đềmục, theo thứ tự logic (h2 trong h1, h3 trong h2...).
Liên kết (Link)	Là thành phần giúp chuyển trang hoặc nhảy đến một vị trí trong cùng trang.	Văn bản thể hiện tên liên kết phải rõ nghĩa, để người dùng trình đọc màn hình hiểu được. Không dùng “bấm vào đây”, “xem thêm” chung chung.Khi kích hoạt link phải dẫn đến đích đến chính xác
Hình ảnh (Image)	Hình ảnh cần có mô tả thay thế (alt text) để người dùng trình đọc màn hình hiểu nội dung.	Phần mô tả rõ ràng, ngắn gọn, phù hợp với nội dung hình ảnh chuyển tải. 
Bảng (Table)	Bảng dùng để trình bày dữ liệu dạng hàng – cột. Trình đọc màn hình cần thông tin về tiêu đề cột, hàng để giúp người khiếm thị hiểu dữ liệu.	Nếu là bảng dữ liệu (data table), phải có tiêu đề hàng, tiêu đề cột xác định. Tránh dùng bảng chỉ để bố cục trang (layout table).
Biểu mẫu (Form)	Biểu mẫu gồm các trường nhập liệu như ô nhập văn bản, nút chọn, hộp kiểm... dùng để gửi thông tin.	Mỗi trường phải có nhãn (label) rõ ràng, được liên kết đúng cách. Form có thứ tự điều hướng hợp lý, hỗ trợ thao tác bằng bàn phím.
Nút bấm (Button)	Dùng để thực hiện hành động như gửi biểu mẫu, mở menu, tìm kiếm.	Nút phải có nhãn rõ ràng, dễ hiểu và có thể được thao tác bằng bàn phím.

II. Thực hành
Dùng trình đọc màn hình (JAWS hoặc NVDA) để kiểm tra tính tiếp cận của các thành phần trên một trang web.
Các bước thực hiện:
Truy cập một trang web. (VD: https://vov.vn hoặc https://dantri.com.vn). Thực hành đánh giá tính tiếp cận của Trang chủ và các trang con khác, các chuyên mục, bài viết khác nhau với các thành phần sau:
1.	Kiểm tra tiêu đề trang:
- JAWS: Insert+T
- NVDA: NVDA+T
2. Kiểm tra mốc trang (Landmark):
- NVDA: nhấn D
- JAWS: Insert + Ctrl +; hoặc R để duyệt landmark
3. Kiểm tra các đề mục (Heading):
- JAWS: Insert + F6 (liệt kê các heading) hoặc nhấn H
- NVDA: nhấn H để duyệt theo thứ tự
4. Kiểm tra các liên kết (Link):
- JAWS: Insert + F7 (liệt kê các link)
- NVDA: nhấn K để duyệt liên kết
5. Kiểm tra hình ảnh có mô tả không:
- Dùng phím G để chuyển đến ảnh.
6. Kiểm tra các bảng:
Nhấn T để đi đến các bảng. Duyệt các nội dung trên các hàng, cột.
7. Kiểm tra biểu mẫu:
Nhấn F để đi đến biểu mẫu. Duyệt trên từng thành phần, thử điền thông tin và gửi theo yêu cầu.
8. Kiểm tra các nút (Button):
- JAWS: Insert + F5;hoặc nhấn B để đi đến button
- NVDA: nhấn B
Lưu ý: Có thể dùng Insert +F3 đối với JAWS hoặc NVDA +F7 đối với NVDA để liệt kê danh sách các thành phần như: link, heading… và lựa chọn duyệt các thành phần đó.
Ghi lại các nhận xét:
- Trang có các thành phần: tiêu đề, mốc trang, heading, link, hình ảnh, bảng, biểu mẫu, nút bấm không?
- Với từng thành phần: có rõ ràng, dễ hiểu, dễ thao tác không? Nêu rõ những hạn chế (nếu có).`
};
