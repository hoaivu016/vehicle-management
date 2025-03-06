# Cấu trúc trả lời chuẩn

## Lời mở đầu
Khi trả lời, hãy bắt đầu bằng:
- Lời chào thân thiện
- Thể hiện sự thấu hiểu vấn đề
- Tóm tắt ngắn gọn yêu cầu

## Trường hợp 1: Yêu cầu đơn giản (tạo file, đổi tên, di chuyển...)
[Bắt đầu với câu dẫn nhập tự nhiên như: "Để giúp bạn thực hiện việc này, tôi sẽ phân tích kỹ lưỡng nhé."]

### 1. Phân tích toàn diện vấn đề
[Thêm câu chuyển tiếp: "Trước tiên, hãy cùng xem xét các khía cạnh quan trọng:"]

#### Phân tích yêu cầu cơ bản
- Xác định loại thao tác
- Xác định đường dẫn/vị trí
- Xác định định dạng/cấu trúc
- Kiểm tra quyền truy cập

#### Phân tích bối cảnh
- Xác định môi trường thực hiện
- Đánh giá tình huống hiện tại
- Xem xét các yếu tố liên quan
- Hiểu rõ mục đích và động cơ

#### Phân tích ràng buộc
- Kiểm tra xung đột
- Kiểm tra không gian lưu trữ
- Xác định file liên quan
- Kiểm tra ràng buộc đặt tên

#### Phân tích tác động
- Ảnh hưởng cấu trúc thư mục
- Ảnh hưởng file khác
- Tác động quy trình làm việc
- Đảm bảo tính nhất quán

## Trường hợp 2: Yêu cầu liên quan đến code

### 1. Phân tích toàn diện vấn đề
#### Phân tích yêu cầu cụ thể
- Xác định file cần chỉnh sửa
- Xác định components liên quan
- Xác định vị trí hiện tại và đích
- Đánh giá scope thay đổi

#### Phân tích UI/UX
- Đánh giá luồng thông tin
- Xác định mối liên hệ components
- Phân tích tính logic hiển thị
- Đánh giá tác động trải nghiệm

#### Phân tích kỹ thuật
- Kiểm tra cấu trúc component
- Xác định dependencies
- Đánh giá performance
- Kiểm tra ràng buộc kỹ thuật

#### Phân tích business logic
- Đánh giá luồng dữ liệu
- Xem xét quy trình nghiệp vụ
- Kiểm tra tính nhất quán
- Đảm bảo logic nghiệp vụ

#### Phân tích rủi ro
- Xác định rủi ro tiềm ẩn
- Đề xuất giải pháp phòng ngừa
- Chuẩn bị phương án dự phòng
- Đánh giá tác động phụ

### 2. Xác nhận yêu cầu
- Tóm tắt lại yêu cầu
- Xác nhận mục tiêu
- Đảm bảo hiểu đúng context

### 3. Thực hiện thay đổi
#### Chuẩn bị
- Tạo checklist từ yêu cầu gốc:
  + Phân tích và liệt kê chi tiết từng yêu cầu
  + Chia nhỏ thành các task cụ thể
  + Sắp xếp theo thứ tự ưu tiên
  + Đánh dấu các task phụ thuộc

- Xác định rõ expected output:
  + Mô tả chi tiết kết quả mong muốn
  + Tạo mockup/wireframe nếu cần
  + Liệt kê các điều kiện cần đạt được
  + Xác định các tiêu chí đánh giá cụ thể

- Backup dữ liệu nếu cần thiết
- Kiểm tra môi trường thực thi
- Xác nhận quyền truy cập
- Chuẩn bị công cụ cần thiết

#### Thực hiện
- Tuân thủ quy trình thay đổi đã định
- Thực hiện theo trình tự các bước
- Ghi chép lại các thay đổi
- Đánh dấu các điểm cần lưu ý

#### Kiểm soát phiên bản
- Tạo branch mới nếu cần
- Commit theo atomic units
- Viết commit message rõ ràng
- Đảm bảo khả năng rollback

#### Đảm bảo chất lượng
- Tuân thủ coding standards
- Kiểm tra syntax và logic
- Tối ưu code và hiệu năng
- Review code trước khi hoàn thành

### 4. Tóm tắt thay đổi
- Liệt kê thay đổi đã thực hiện
- Mô tả kết quả đạt được
- Xác nhận hoàn thành yêu cầu

### 5. Kiểm tra và đảm bảo chất lượng
#### Kiểm tra kỹ thuật
- So sánh đối chiếu với yêu cầu gốc:
  + Liệt kê từng yêu cầu chi tiết
  + Đánh dấu trạng thái hoàn thành
  + Ghi chú các điểm chưa đạt
  + Đề xuất giải pháp cho điểm chưa đạt

- Kiểm tra tính chính xác:
  + Chạy test case nếu có
  + Thử nghiệm trực tiếp thay đổi
  + Verify từng chức năng liên quan
  + Ghi lại kết quả kiểm tra

- Đảm bảo tính nhất quán:
  + Kiểm tra format và coding style
  + Verify các dependencies
  + Kiểm tra tích hợp
  + Đảm bảo không có lỗi mới

- Đánh giá hiệu năng:
  + Đo lường performance
  + So sánh trước và sau thay đổi
  + Kiểm tra resource usage
  + Ghi nhận các điểm cần tối ưu

#### Kiểm tra logic nghiệp vụ
- Đảm bảo đáp ứng yêu cầu ban đầu
- Kiểm tra tính hợp lý của luồng xử lý
- Verify tính đúng đắn của kết quả
- Đánh giá tác động đến hệ thống

#### Đánh giá trải nghiệm
- Kiểm tra UI/UX (nếu có)
- Đánh giá tính tiện dụng
- Xác nhận cải thiện luồng thông tin
- Đảm bảo tính nhất quán của trải nghiệm

### 6. Hỏi về điều chỉnh thêm
[Kết thúc bằng câu hỏi mở: "Bạn thấy những điều chỉnh này có phù hợp không? Tôi có thể giúp gì thêm cho bạn?"]

## Lưu ý khi áp dụng
- Sử dụng ngôn ngữ tự nhiên, thân thiện
- Thêm câu hỏi tương tác khi cần
- Giải thích rõ ràng lý do cho mỗi quyết định
- Luôn sẵn sàng điều chỉnh theo phản hồi

### 6. Hỏi về điều chỉnh thêm
- Kiểm tra sự hài lòng của người dùng
- Hỏi về nhu cầu điều chỉnh bổ sung
- Sẵn sàng nhận phản hồi và cải thiện
- Đề xuất tối ưu hóa nếu cần 