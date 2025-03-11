# NGÔN NGỮ THIẾT KẾ
## Ứng dụng Quản lý Kho Xe - Phong cách tối giản chuyên nghiệp

### 1. Hệ thống màu sắc

#### Màu chính
- **Primary:** rgb(60, 133, 62) 
  - Hover: #2d8630
  - Active: #236b26
  - Light: rgba(60, 133, 62, 0.1)
- **Secondary:** #4CCAAA
  - Hover: #3A9988
  - Active: #2E8876
  - Light: rgba(76, 202, 170, 0.1)

#### Màu nền
- **Background:** #FFFFFF (Nền chính)
- **Background-alt:** #F8F9FA (Nền thứ cấp, nền bảng dữ liệu)
- **Background-card:** #FFFFFF (Nền cho card)
- **Background-modal:** #FFFFFF (Nền cho modal)

#### Màu văn bản
- **Text:** #212529 (Văn bản chính)
- **Text-muted:** #6C757D (Văn bản phụ, mô tả)
- **Text-light:** #ADB5BD (Văn bản nhạt, placeholder)
- **Text-white:** #FFFFFF (Văn bản trên nền tối)

#### Màu trạng thái
- **Success:** #28A745 (Thành công, đã bán)
  - Light: rgba(40, 167, 69, 0.1)
- **Warning:** #FFA500 (Cảnh báo)
  - Light: rgba(255, 165, 0, 0.1)
- **Danger:** #DC3545 (Lỗi, nguy hiểm)
  - Light: rgba(220, 53, 69, 0.1)
- **Info:** #17A2B8 (Thông tin)
  - Light: rgba(23, 162, 184, 0.1)

#### Màu trạng thái xe
- **In Stock:** rgba(76, 175, 80, 0.1) (Trong kho)
  - Text: #2E7D32
  - Border: rgba(76, 175, 80, 0.2)
- **Deposit:** rgba(255, 152, 0, 0.1) (Đặt cọc)
  - Text: #E67E22
  - Border: rgba(255, 152, 0, 0.2)
- **Bank Deposit:** rgba(33, 150, 243, 0.1) (Đặt cọc ngân hàng)
  - Text: #1976D2
  - Border: rgba(33, 150, 243, 0.2)
- **Payment:** rgba(156, 39, 176, 0.1) (Đóng đối ứng)
  - Text: #8E44AD
  - Border: rgba(156, 39, 176, 0.2)
- **Sold:** rgba(0, 150, 136, 0.1) (Đã bán)
  - Text: #00796B
  - Border: rgba(0, 150, 136, 0.2)

#### Màu viền
- **Border-color:** #DEE2E6
- **Border-color-dark:** #CED4DA
- **Border-focus:** rgba(60, 133, 62, 0.25)

#### CSS Variables
```css
:root {
  /* Colors */
  --primary-color: rgb(60, 133, 62);
  --primary-hover: #2d8630;
  --primary-active: #236b26;
  --primary-light: rgba(60, 133, 62, 0.1);
  
  --secondary-color: #4CCAAA;
  --secondary-hover: #3A9988;
  --secondary-active: #2E8876;
  --secondary-light: rgba(76, 202, 170, 0.1);
  
  --background: #FFFFFF;
  --background-alt: #F8F9FA;
  
  --text-color: #212529;
  --text-muted: #6C757D;
  --text-light: #ADB5BD;
  --text-white: #FFFFFF;
  
  --success-color: #28A745;
  --success-light: rgba(40, 167, 69, 0.1);
  --warning-color: #FFA500;
  --warning-light: rgba(255, 165, 0, 0.1);
  --danger-color: #DC3545;
  --danger-light: rgba(220, 53, 69, 0.1);
  --info-color: #17A2B8;
  --info-light: rgba(23, 162, 184, 0.1);
  
  --border-color: #DEE2E6;
  --border-color-dark: #CED4DA;
  --border-focus: rgba(60, 133, 62, 0.25);
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Border radius */
  --radius-sm: 4px;
  --radius: 8px;
  --radius-lg: 12px;
  --radius-pill: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --shadow: 0 2px 6px rgba(0,0,0,0.08);
  --shadow-lg: 0 4px 12px rgba(0,0,0,0.12);
  --shadow-inner: inset 0 2px 4px rgba(0,0,0,0.05);
  --shadow-focus: 0 0 0 3px rgba(60, 133, 62, 0.15);
  
  /* Transitions */
  --transition: all 0.2s ease;
  --transition-bounce: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  /* Icon */
  --icon-size-sm: 16px;
  --icon-size-md: 20px;
  --icon-size-lg: 24px;
}
```

### 2. Typography

#### Font Family
- **Hệ thống font:** `'Mulish', system-ui, sans-serif`
- **Monospace:** `'Mulish', monospace` (cho dữ liệu kỹ thuật)

#### Cỡ chữ
- **Heading 1:** 32px (2rem)
- **Heading 2:** 28px (1.75rem)
- **Heading 3:** 24px (1.5rem)
- **Heading 4:** 20px (1.25rem)
- **Heading 5:** 16px (1rem)
- **Body:** 16px (1rem)
- **Small:** 14px (0.875rem)
- **Extra Small:** 12px (0.75rem)

#### Font Weight
- **Regular:** 400
- **Medium:** 500
- **Semi Bold:** 600
- **Bold:** 700

#### Line Height
- **Tight:** 1.25
- **Normal:** 1.5
- **Loose:** 1.75

#### Letter Spacing
- **Tight:** -0.025em (Tiêu đề lớn)
- **Normal:** 0
- **Wide:** 0.025em (Text nhỏ, UPPERCASE)
- **Wider:** 0.05em (UPPERCASE trong header)

#### CSS Variables
```css
:root {
  /* Typography */
  --font-family: 'Mulish', system-ui, sans-serif;
  --font-mono: 'Mulish', monospace;
  
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 1.75rem;
  --font-size-3xl: 2rem;
  
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-loose: 1.75;
  
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;
}
```

### 3. Spacing System

#### Đơn vị cơ bản
- 4px - 0.25rem

#### Khoảng cách
- **2xs:** 4px (0.25rem)
- **xs:** 8px (0.5rem)
- **sm:** 16px (1rem)
- **md:** 24px (1.5rem)
- **lg:** 32px (2rem)
- **xl:** 48px (3rem)
- **2xl:** 64px (4rem)

#### Grid
- **Gutter:** 24px
- **Margin:** 16px
- **Container padding:** 16px
- **Card padding:** 24px (Tất cả các card phải có padding 24px)

#### Quy tắc spacing
- **Nhất quán**: Luôn sử dụng giá trị từ hệ thống spacing
- **Rhythm**: Giữ khoảng cách giữa các thành phần đồng nhất
- **Breathing room**: Tránh các phần tử quá gần nhau
- **Grouping**: Các phần tử liên quan có khoảng cách gần hơn

### 4. Thành phần UI

#### Buttons

##### Primary Button
- **Background:** var(--primary-color)
- **Text:** var(--text-white)
- **Border:** none
- **Border-radius:** var(--radius-sm)
- **Padding:** 10px 18px
- **Height:** 40px
- **Font-size:** var(--font-size-sm)
- **Font-weight:** var(--font-weight-semibold)
- **Display:** inline-flex
- **Align-items:** center
- **Justify-content:** center
- **Gap:** 8px
- **Hover:** var(--primary-hover), transform: translateY(-1px), box-shadow: var(--shadow-sm)
- **Active:** var(--primary-active), transform: translateY(0)
- **Disabled:** Opacity 0.6, cursor: not-allowed
- **Transition:** var(--transition)
- **Focus:** box-shadow: var(--shadow-focus)

##### Secondary Button
- **Background:** transparent
- **Text:** var(--primary-color)
- **Border:** 1px solid var(--primary-color)
- **Border-radius:** var(--radius-sm)
- **Padding:** 10px 18px
- **Height:** 40px
- **Font-size:** var(--font-size-sm)
- **Font-weight:** var(--font-weight-semibold)
- **Display:** inline-flex
- **Align-items:** center
- **Justify-content:** center
- **Gap:** 8px
- **Hover:** var(--primary-light) background, transform: translateY(-1px), box-shadow: var(--shadow-sm)
- **Active:** Đậm hơn 5%, transform: translateY(0)
- **Disabled:** Opacity 0.6, cursor: not-allowed
- **Transition:** var(--transition)
- **Focus:** box-shadow: var(--shadow-focus)

##### Text Button
- **Background:** transparent
- **Text:** var(--primary-color)
- **Border:** none
- **Padding:** 10px 18px
- **Height:** 40px
- **Font-size:** var(--font-size-sm)
- **Font-weight:** var(--font-weight-medium)
- **Display:** inline-flex
- **Align-items:** center
- **Justify-content:** center
- **Gap:** 8px
- **Hover:** var(--primary-light) background, text-decoration: none
- **Active:** Đậm hơn 5%
- **Disabled:** Opacity 0.6, cursor: not-allowed
- **Transition:** var(--transition)
- **Focus:** box-shadow: var(--shadow-focus)

##### Action Button
- **Background:** var(--secondary-color)
- **Text:** var(--text-white)
- **Border-radius:** var(--radius-sm)
- **Padding:** 10px 18px
- **Height:** 40px
- **Font-size:** var(--font-size-sm)
- **Font-weight:** var(--font-weight-semibold)
- **Display:** inline-flex
- **Align-items:** center
- **Justify-content:** center
- **Gap:** 8px
- **Hover:** var(--secondary-hover), transform: translateY(-1px), box-shadow: var(--shadow-sm)
- **Active:** var(--secondary-active), transform: translateY(0)
- **Disabled:** Opacity 0.6, cursor: not-allowed
- **Transition:** var(--transition)
- **Focus:** box-shadow: 0 0 0 3px rgba(76, 204, 170, 0.15)

##### Icon Button
- **Background:** transparent
- **Color:** var(--text-muted)
- **Border:** none
- **Border-radius:** var(--radius-sm)
- **Width/Height:** 36px
- **Display:** inline-flex
- **Align-items:** center
- **Justify-content:** center
- **Cursor:** pointer
- **Transition:** var(--transition)
- **Hover:** background: var(--background-alt), color: var(--text-color)
- **Active:** transform: scale(0.95)
- **Disabled:** Opacity 0.6, cursor: not-allowed
- **Focus:** box-shadow: var(--shadow-focus)

##### Button Sizes
- **Small:**
  - Height: 32px
  - Padding: 6px 12px
  - Font-size: var(--font-size-xs)
- **Medium (Default):**
  - Height: 40px
  - Padding: 10px 18px
  - Font-size: var(--font-size-sm)
- **Large:**
  - Height: 48px
  - Padding: 12px 24px
  - Font-size: var(--font-size-md)

#### Forms

##### Input Field
- **Background:** var(--background)
- **Border:** 1px solid var(--border-color-dark)
- **Border-radius:** var(--radius-sm)
- **Text:** var(--text-color)
- **Height:** 40px
- **Padding:** 10px 12px
- **Font-size:** var(--font-size-sm)
- **Focus:** Border 1px solid var(--primary-color), Box-shadow: var(--shadow-focus)
- **Placeholder:** var(--text-light)
- **Disabled:** var(--background-alt) background, var(--text-muted) text, cursor: not-allowed
- **Transition:** var(--transition)
- **Hover:** border-color: var(--border-color-dark)
- **Error:** border-color: var(--danger-color), box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15)

##### Select
- Giống Input Field, thêm icon dropdown
- **Appearance:** none
- **Background-image:** url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='%236C757D' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")
- **Background-repeat:** no-repeat
- **Background-position:** right 12px center
- **Padding-right:** 36px
- **Cursor:** pointer

##### Checkbox & Radio
- **Border:** 1px solid var(--border-color-dark)
- **Border-radius:** 4px (checkbox), 50% (radio)
- **Width/Height:** 18px
- **Background:** var(--background)
- **Cursor:** pointer
- **Checked:** 
  - Background: var(--primary-color)
  - Border: 1px solid var(--primary-color)
  - Icon: white checkmark/dot
- **Focus:** box-shadow: var(--shadow-focus)
- **Disabled:** opacity: 0.6, cursor: not-allowed
- **Transition:** var(--transition)
- **Hover:** border-color: var(--primary-color)
- **Label gap:** 8px

##### Form Group
- **Margin-bottom:** 16px

##### Label
- **Color:** var(--text-color)
- **Margin-bottom:** 8px
- **Font-weight:** var(--font-weight-medium)
- **Font-size:** var(--font-size-sm)

##### Date Picker
- **Container:**
  - Background: var(--background)
  - Border: 1px solid var(--border-color-dark)
  - Border-radius: var(--radius-sm)
  - Box-shadow: var(--shadow-sm)
- **Format hiển thị:**
  - "Tháng M/YYYY" (ví dụ: "Tháng 3/2025")
  - Font-weight: var(--font-weight-semibold)
  - Font-size: var(--font-size-md)
  - Text-align: Center
- **Nút điều hướng:**
  - Mũi tên trái/phải
  - Padding: 8px
  - Hover: var(--background-alt)
  - Transition: var(--transition)
- **Vị trí Desktop & Tablet:**
  - Bên phải cùng hàng với tiêu đề
  - Alignment: Center vertical với tiêu đề
- **Vị trí Mobile:**
  - Phía trên nội dung
  - Chiều rộng: 100%
  - Margin-bottom: 16px

#### Tables

##### Table Container
- **Border:** 1px solid var(--border-color)
- **Border-radius:** var(--radius)
- **Box-shadow:** var(--shadow-sm)
- **Background:** var(--background)
- **Overflow-x:** auto
- **Margin-bottom:** var(--spacing-lg)

##### Table Header
- **Background:** var(--background-alt)
- **Color:** var(--primary-color)
- **Font-weight:** var(--font-weight-semibold)
- **Text-transform:** uppercase
- **Letter-spacing:** var(--letter-spacing-wide)
- **Font-size:** var(--font-size-sm)
- **Padding:** 14px 16px
- **Border-bottom:** 1px solid var(--border-color)
- **Position:** sticky
- **Top:** 0
- **z-index:** 10

##### Table Row
- **Border-bottom:** 1px solid var(--border-color)
- **Hover:** var(--background-alt)
- **Transition:** var(--transition)

##### Table Cell
- **Padding:** 12px 16px
- **Vertical-align:** middle
- **Color:** var(--text-color)
- **Font-size:** var(--font-size-md)
- **Line-height:** var(--line-height-normal)

##### Important Cells
- **Font-weight:** var(--font-weight-semibold)
- **Color:** var(--text-color)

##### Secondary Cells
- **Color:** var(--text-muted)
- **Font-size:** var(--font-size-sm)

##### Currency Formatting
- **Text-align:** right
- **Font-weight:** var(--font-weight-semibold)
- **Font-variant-numeric:** tabular-nums
- **Letter-spacing:** -0.2px

##### Storage Time Styling
- **Font-weight:** var(--font-weight-semibold)
- **Font-variant-numeric:** tabular-nums
- **Low:** var(--success-color)
- **Medium:** var(--warning-color)
- **High:** var(--danger-color)

#### Status Badge
- **Display:** inline-flex
- **Align-items:** center
- **Justify-content:** center
- **Padding:** 4px 10px
- **Border-radius:** 12px
- **Font-size:** 0.8rem
- **Font-weight:** 500
- **Min-width:** 70px
- **Text-align:** center
- **White-space:** nowrap
- **Transition:** var(--transition)
- **Border:** 1px solid (màu tương ứng với trạng thái)

#### Action Buttons
- **Background:** #f5f7fa
- **Color:** #555
- **Border:** 1px solid #eaedf0
- **Border-radius:** var(--radius-sm)
- **Width/Height:** 32px
- **Display:** flex
- **Align-items:** center
- **Justify-content:** center
- **Cursor:** pointer
- **Transition:** var(--transition)
- **Font-size:** 1rem
- **Hover:**
  - Background: #eaedf0
  - Color: var(--text-color)
- **Hover Edit:** color: var(--primary-color)
- **Hover Delete:** color: var(--danger-color)
- **Hover Status:** color: var(--secondary-color)

#### Cards

##### Card Container
- **Background:** var(--background)
- **Border:** 1px solid var(--border-color)
- **Border-radius:** var(--radius)
- **Box-shadow:** var(--shadow-sm)
- **Padding:** 24px
- **Margin-bottom:** var(--spacing-lg)
- **Transition:** box-shadow 0.2s ease, transform 0.2s ease
- **Hover:** box-shadow: var(--shadow)

##### Card Header
- **Border-bottom:** 1px solid var(--border-color)
- **Padding-bottom:** 16px
- **Margin-bottom:** 16px
- **Display:** flex
- **Justify-content:** space-between
- **Align-items:** center

##### Card Title
- **Font-size:** var(--font-size-lg)
- **Font-weight:** var(--font-weight-bold)
- **Color:** var(--text-color)
- **Letter-spacing:** -0.3px
- **Line-height:** 1.3

#### Alerts & Notifications

##### Alert Base
- **Border-radius:** var(--radius-sm)
- **Padding:** 12px 16px
- **Margin-bottom:** 16px
- **Display:** flex
- **Align-items:** flex-start
- **Gap:** 12px

##### Success Alert
- **Background:** var(--success-light)
- **Border-left:** 4px solid var(--success-color)
- **Color:** var(--success-color)

##### Warning Alert
- **Background:** var(--warning-light)
- **Border-left:** 4px solid var(--warning-color)
- **Color:** var(--warning-color)

##### Danger Alert
- **Background:** var(--danger-light)
- **Border-left:** 4px solid var(--danger-color)
- **Color:** var(--danger-color)

##### Info Alert
- **Background:** var(--info-light)
- **Border-left:** 4px solid var(--info-color)
- **Color:** var(--info-color)

### 5. Layout

#### Navigation
- **Background:** var(--primary-color)
- **Text:** var(--text-white)
- **Active item:** Nền đậm hơn hoặc underline
- **Hover:** Nền đậm hơn hoặc opacity
- **Padding:** 12px 16px
- **Border-radius:** var(--radius-sm)

#### Tab Navigation
- **Tab chính:** 
  - BÁO CÁO, DANH SÁCH XE, ADMIN
  - Background: transparent
  - Text: var(--text-color)
  - Font-weight: var(--font-weight-medium)
  - Padding: 12px 16px
  - Border-bottom: 3px solid transparent
- **Tab active:** 
  - Tabs chính: Border-bottom: 3px solid var(--primary-color), Font-weight: var(--font-weight-bold), Color: var(--primary-color)
- **Tab hover:** 
  - Tabs chính: Border-bottom: 3px solid var(--border-color)
  - Opacity: 0.9
- **Tab disabled:**
  - Opacity: 0.5
  - Cursor: not-allowed

#### Main Content
- **Background:** var(--background-alt)
- **Padding:** 24px

#### Breadcrumbs
- **Separator:** / (slash)
- **Current page:** var(--font-weight-semibold), không có link
- **Previous pages:** var(--font-weight-regular), có link
- **Hover:** Underline
- **Font-size:** var(--font-size-sm)
- **Line-height:** var(--line-height-normal)
- **Color:** var(--text-muted)
- **Current page color:** var(--text-color)

### 6. Popup & Modal

#### Container
- **Background:** var(--background)
- **Border-radius:** var(--radius-lg)
- **Box-shadow:** 0 10px 25px rgba(0,0,0,0.15)
- **Max-width:** 800px (Desktop), 90% (Tablet), 100% (Mobile)
- **Min-width:** 300px
- **Margin:** 16px auto
- **Position:** Fixed, center of viewport
- **z-index:** 1000
- **Transform origin:** Center top
- **Animation:** Scale and fade in (0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275))
- **Border:** none
- **Overflow:** hidden

#### Header
- **Background:** var(--background)
- **Text:** var(--text-color)
- **Padding:** 20px 24px
- **Font-size:** var(--font-size-lg)
- **Font-weight:** var(--font-weight-bold)
- **Border-bottom:** 1px solid var(--border-color)
- **Display:** Flex, space-between
- **Align-items:** center
- **Letter-spacing:** -0.3px

#### Close Button
- **Background:** transparent
- **Color:** var(--text-muted)
- **Border:** none
- **Width/Height:** 32px
- **Border-radius:** var(--radius-sm)
- **Display:** flex
- **Align-items:** center
- **Justify-content:** center
- **Cursor:** pointer
- **Transition:** var(--transition)
- **Hover:** background: var(--background-alt), color: var(--text-color)
- **Active:** transform: scale(0.95)
- **Focus:** box-shadow: var(--shadow-focus)
- **Icon size:** 20px

#### Body
- **Padding:** 24px
- **Max-height:** 70vh
- **Overflow-y:** Auto (scrollable)
- **Background:** var(--background)
- **Font-size:** var(--font-size-md)
- **Color:** var(--text-color)
- **Line-height:** var(--line-height-normal)

#### Footer
- **Background:** var(--background)
- **Padding:** 20px 24px
- **Border-top:** 1px solid var(--border-color)
- **Display:** Flex
- **Justify-content:** Flex-end (right-aligned)
- **Gap:** 12px
- **Border-radius:** 0 0 var(--radius-lg) var(--radius-lg)

#### Backdrop
- **Background:** rgba(0,0,0,0.4)
- **Backdrop-filter:** blur(3px)
- **Position:** Fixed
- **Inset:** 0
- **z-index:** 999
- **Animation:** Fade in (0.2s ease)

### 7. Quy tắc thiết kế tối giản chuyên nghiệp

#### Nguyên tắc "Less is More"
- **Tập trung vào nội dung**: Nội dung phải là trọng tâm, UI chỉ là phương tiện
- **Loại bỏ thừa thãi**: Mọi phần tử phải có mục đích, loại bỏ các yếu tố trang trí không cần thiết
- **Không gian trống**: Sử dụng không gian trống (white space) để tạo nhịp điệu và làm nổi bật nội dung
- **Đơn giản hóa**: Ưu tiên các giải pháp đơn giản nhất có thể

#### Tính nhất quán
- **Design tokens**: Sử dụng nhất quán các design tokens trong toàn bộ ứng dụng
- **Thành phần UI**: Các thành phần UI giống nhau phải có cùng style
- **Hành vi**: Các thành phần tương tự phải có cùng hành vi
- **Spacing**: Áp dụng nhất quán hệ thống spacing

#### Tính chuyên nghiệp
- **Chi tiết**: Chú ý đến từng chi tiết nhỏ
- **Hiệu ứng tinh tế**: Các hiệu ứng phải tinh tế, không quá mức
- **Trau chuốt**: Mỗi phần tử đều được trau chuốt kỹ lưởng
- **Rõ ràng**: Thông tin phải được trình bày rõ ràng, dễ hiểu

#### Visual Hierarchy
- **Thứ bậc thông tin**: Thông tin quan trọng phải nổi bật
- **Nhóm liên quan**: Các thông tin liên quan phải được nhóm lại với nhau
- **Điểm nhấn**: Sử dụng kích thước, màu sắc, font weight để tạo điểm nhấn
- **Đường dẫn đọc**: Thiết kế phải tạo đường dẫn đọc rõ ràng

### 8. Checklist đảm bảo phong cách tối giản chuyên nghiệp

#### Layout và tổ chức
- [ ] Các thành phần được sắp xếp có trật tự, logic
- [ ] Spacing được áp dụng nhất quán
- [ ] Có đủ không gian trống (breathing room)
- [ ] Thông tin được nhóm theo logic rõ ràng

#### Visual Design
- [ ] Tất cả card, bảng đều có border và shadow theo quy định
- [ ] Typography đúng với quy định (font, size, weight)
- [ ] Màu sắc sử dụng đúng với design tokens
- [ ] Border-radius được áp dụng nhất quán

#### Tính nhất quán
- [ ] Các thành phần UI giống nhau có style giống nhau
- [ ] Các biểu tượng có kích thước và style nhất quán
- [ ] Spacing trong và giữa các thành phần nhất quán
- [ ] Tỷ lệ các thành phần hài hòa

#### Tính chuyên nghiệp
- [ ] Không có lỗi giao diện (UI bugs)
- [ ] Các hiệu ứng mượt mà, không gây phiền nhiễu
- [ ] Tỷ lệ và căn chỉnh chính xác
- [ ] Trình bày rõ ràng, không gây nhầm lẫn

### 9. Các pattern cần tránh

#### Sai lầm phổ biến
- ❌ **Quá nhiều màu sắc**: Hạn chế bảng màu, chỉ sử dụng màu có chủ đích
- ❌ **Thiếu nhất quán**: Các thành phần giống nhau phải có style giống nhau
- ❌ **Thiếu không gian trống**: Nội dung quá dày đặc, không có khoảng thở
- ❌ **Không dùng shadow và border**: Khiến giao diện thiếu chiều sâu, khó phân biệt các thành phần
- ❌ **Hiệu ứng quá mức**: Hiệu ứng phải tinh tế, phục vụ mục đích cụ thể

#### Thay thế bằng
- ✅ **Bảng màu hạn chế**: Tập trung vào màu primary, secondary, và các màu trạng thái
- ✅ **Hệ thống thiết kế nhất quán**: Áp dụng nghiêm ngặt các design tokens
- ✅ **Không gian hợp lý**: Áp dụng margin và padding theo hệ thống spacing
- ✅ **Sử dụng shadow và border**: Tạo chiều sâu và phân tách các thành phần
- ✅ **Hiệu ứng tinh tế**: Chỉ dùng hiệu ứng khi cần thiết và giữ chúng tinh tế

### 10. Responsive Behavior

#### Desktop (>= 992px)
- **Layout:** Multi-column, spacious
- **Navigation:** Full horizontal tab navigation
- **Date Picker:** Inline with title, right-aligned
- **Tables:** Full table view with all columns
- **Forms:** Two-column layout for related fields
- **Modals:** Max-width: 800px, centered with margin

#### Tablet (576px - 991px)
- **Layout:** Reduced whitespace, optimized for touch
- **Navigation:** Full horizontal tabs, condensed padding
- **Date Picker:** Inline with title, right-aligned
- **Tables:** Scrollable horizontally, fewer visible columns
- **Forms:** Single-column layout
- **Modals:** Max-width: 90%, slightly reduced padding

#### Mobile (< 576px)
- **Layout:** Single column, touch-optimized
- **Navigation:** Hamburger menu for main navigation
- **Date Picker:** Above content, full width
- **Tables:** Card view instead of tables
- **Forms:** Stacked layout, full-width inputs
- **Modals:** Full width, reduced padding

### 11. Icon System

#### Icon Sizes
- **Small:** 16px
- **Medium:** 20px
- **Large:** 24px
- **Extra Large:** 32px

#### Icon Colors
- **Primary:** var(--primary-color)
- **Secondary:** var(--secondary-color)
- **Muted:** var(--text-muted)
- **Light:** var(--text-light)
- **Success:** var(--success-color)
- **Warning:** var(--warning-color)
- **Danger:** var(--danger-color)
- **Info:** var(--info-color)

#### Icon Usage
- **Navigation Icons:**
  - Size: 20px
  - Color: var(--text-white) trong navigation chính
  - Color: var(--text-muted) trong navigation phụ
  - Margin-right: 8px khi kết hợp với text
  
- **Action Icons:**
  - Size: 16px trong buttons
  - Size: 20px trong icon buttons
  - Color: Theo màu của button/text
  - Margin-right: 8px khi đặt trước text
  
- **Status Icons:**
  - Size: 16px
  - Color: Theo trạng thái (success, warning, danger, info)
  - Margin-right: 6px khi kết hợp với text
  
- **Form Icons:**
  - Size: 16px
  - Position: Absolute, right: 12px, center vertically
  - Color: var(--text-muted)
  - Validation icons: var(--success-color), var(--danger-color)
  
- **Table Icons:**
  - Size: 16px
  - Color: var(--text-muted)
  - Margin-right: 4px khi kết hợp với text
  - Sort icons: 12px

#### Icon Transitions
- **Hover:** Opacity 0.8 → 1
- **Active:** Transform: scale(0.95) → scale(1)
- **Transition:** var(--transition)

#### Icon Accessibility
- **aria-hidden:** true cho decorative icons
- **role="img":** cho semantic icons
- **aria-label:** Mô tả chức năng của icon (nếu không có text đi kèm) 