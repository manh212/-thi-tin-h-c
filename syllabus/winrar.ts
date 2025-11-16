import type { SyllabusItem } from ".";

export const item: SyllabusItem = {
  id: "winrar",
  title: "WinRAR: Nén và Giải Nén",
  content: `
1. Lý thuyết
1.1. Nén File
- Bước 1: Chọn File hoặc thư mục cần nén, nhấn phím Application để mở thực đơn ngữ cảnh.
- Bước 2: Nhấn mũi tên lên, xuống đến mục Add to "....rar" (dấu 3 chấm là tên File, thư mục bạn muốn nén), nhấn Enter để nén.
(Thời gian nén File nhanh hay chậm tùy thuộc vào dung lượng thư mục, File của bạn).
1.2. Giải nén File
- Bước 1: Chọn File cần giải nén, nhấn Application.
- Bước 2: Nhấn mũi tên xuống chọn mục Extract Here hoặc Extract to ... (dấu ba chấm là tên thư mục hoặc File), nhấn Enter để giải nén.
+ Nếu bạn chọn Extract Here thì File được giải nén sẽ nằm trong cùng thư mục với File nén.
+ Nếu bạn chọn Extract to thì File được giải nén sẽ nằm trong một thư mục có tên trùng với tên File.`
};
