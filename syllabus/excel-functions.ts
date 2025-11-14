export const item = {
  title: "Excel: Các Hàm Cơ Bản",
  content: `
12.1. Hàm Max
Hàm max trả lại giá trị lớn nhất trong tập hợp các giá trị. 
Cú pháp: Max(number1;number2)
Trong đó: Number1 là số đầu tiên, number2 là số cuối cùng trong dãy số muốn tìm giá trị lớn nhất. 
12.2. Hàm Min
Hàm min trả lại giá trị nhỏ nhất trong tập hợp các giá trị. 
Cú pháp: Min(number1;number2)
Trong đó: number1 là số đầu tiên, number2 là số cuối cùng trong dãy số muốn tìm giá trị nhỏ nhất. 
12.3. Hàm Sum
Hàm sum cho giá trị là tổng các số trong một miền ô. 
Cú pháp: Sum(number1;number2)
Trong đó, number1 là số đầu tiên, number2 là số cuối cùng của dãy số muốn tính tổng giá trị của chúng.
12.4. Hàm Average
Hàm average trả về giá trị trung bình cộng của các tham số. 
Cú pháp: Average(number1;number2)
Trong đó: Number1 là số đầu tiên, number2 là số cuối cùng của dãy số muốn tính giá trị trung bình.
12.5. Hàm If
	Trả if lại một giá trị nếu điều kiện chỉ định được đánh giá là TRUE và trả lại giá trị kia nếu điều kiện nhận giá trị FALSE.
	Cú pháp: IF (logical_test;value_if_true;value_if_false)
	Trong đó, logical_test là bất kì giá trị hoặc biểu thức nào được đánh giá là TRUE hoặc FALSE. Value_if_true là giá trị được hàm trả về nếu logical_test là TRUE. Value_if_true có thể là một công thức. Value_if_false là giá trị được trả về nếu logical_test có giá trị FALSE. Value_if_false có thể là công thức. Có thể lồng 7 hàm IF thay cho các giá trị value_if_true và value_if_false. 
      - Ví dụ: khi ta cần xếp loại học sinh theo điểm trung bình theo tiêu chí sau: 	Nếu điểm trung bình (DTB) lớn hơn hoặc bằng 8.0 thì xếp loại Giỏi, từ 6.5 đến 8.0 xếp loại Khá, từ 5.0 đến dưới 6.5 xếp loại Trung bình, DTB nhỏ hơn 5.0 thì xếp loại Kém. Hàm if như sau: 
IF(DTB>=8.0,"Giỏi",IF(DTB>=6.5,"Khá",IF(DTB>=5.0,"Trungbình","Kém")))`
};
