# NGÔN NGỮ THIẾT KẾ
## Ứng dụng Quản lý Kho Xe - Phong cách tối giản chuyên nghiệp

### 1. Hệ thống màu sắc

#### Màu chính
- **Primary:** #0F4C81
  - Hover: #0D3D68
  - Active: #0A2F51
  - Light: rgba(15, 76, 129, 0.1)
- **Secondary:** #4CA
  - Hover: #3A9988
  - Active: #2E8876
  - Light: rgba(76, 204, 170, 0.1)

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
- **Border-focus:** #80BDFF

#### CSS Variables
```css
:root {
  /* Colors */
  --primary-color: #0F4C81;
  --primary-hover: #0D3D68;
  --primary-active: #0A2F51;
  --primary-light: rgba(15, 76, 129, 0.1);
  
  --secondary-color: #4CA;
  --secondary-hover: #3A9988;
  --secondary-active: #2E8876;
  --secondary-light: rgba(76, 204, 170, 0.1);
  
  --background: #FFFFFF;
  --background-alt: #F8F9FA;
  
  --text-color: #212529;
  --text-muted: #6C757D;
  --text-light: #ADB5BD;
  
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
  --border-focus: #80BDFF;
  
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
  --shadow-focus: 0 0 0 3px rgba(15, 76, 129, 0.15);
  
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
- **Hệ thống font:** `'Mulish', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`
- **Monospace:** `'Mulish', SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace` (cho dữ liệu kỹ thuật)

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

#### CSS Variables
```css
:root {
  /* Typography */
  --font-family: 'Mulish', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  --font-mono: 'Mulish', SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  
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

##### Button Group
- **Display:** inline-flex
- **Border-radius:** var(--radius-sm)
- **Overflow:** hidden
- **Button border-radius:** 0
- **Button border-right:** none (except last)
- **Button margin:** 0
- **Active button:** z-index: 1

#### Forms

##### Input Field
- **Background:** var(--background)
- **Border:** 1px solid var(--border-color-dark)
- **Border-radius:** var(--radius-sm)
- **Text:** var(--text-color)
- **Height:** 40px
- **Padding:** 10px 12px
- **Font-size:** var(--font-size-sm)
- **Focus:** Border 1px solid var(--border-focus), Box-shadow: var(--shadow-focus)
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

##### Toggle Switch
- **Track:**
  - Width: 44px
  - Height: 24px
  - Background: var(--border-color-dark)
  - Border-radius: 12px
  - Transition: var(--transition)
- **Thumb:**
  - Width: 20px
  - Height: 20px
  - Background: white
  - Border-radius: 50%
  - Box-shadow: var(--shadow-sm)
  - Transform: translateX(2px)
  - Transition: var(--transition)
- **Checked:**
  - Track: Background: var(--primary-color)
  - Thumb: Transform: translateX(22px)
- **Focus:** box-shadow: var(--shadow-focus)
- **Disabled:** opacity: 0.6, cursor: not-allowed
- **Hover:** opacity: 0.9

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

##### Table Header
- **Background:** var(--background-alt)
- **Color:** var(--primary-color)
- **Font-weight:** var(--font-weight-semibold)
- **Text-transform:** uppercase
- **Letter-spacing:** 0.5px
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
- **Low:** var(--secondary-color)
- **Medium:** var(--warning-color)
- **High:** var(--danger-color)

#### Responsive Tables
- **Horizontal Scrolling:** 
  - Container có overflow-x: auto
  - Scrollbar styling tối giản
  - Chiều rộng tối thiểu cho mỗi cột
- **Card View:** 
  - Chuyển đổi từ dạng bảng sang dạng card trên thiết bị di động (< 768px)
  - Mỗi card hiển thị đầy đủ thông tin của một dòng trong bảng
  - Card có border-radius: var(--radius), box-shadow: var(--shadow-sm)
  - Padding: 16px
  - Border: 1px solid var(--border-color)
- **Column Prioritization:** 
  - Cột ưu tiên hiển thị trên thiết bị di động: Mã xe, Tên xe, Trạng thái, Thao tác
  - Cột thứ cấp (chỉ hiển thị trên tablet trở lên): ODO, Năm sản xuất, Ngày nhập
  - Cột chỉ hiển thị trên desktop: Chi tiết tài chính, Thời gian lưu kho

#### Data Table Features
- **Sorting:** 
  - Header có icon sắp xếp (mũi tên lên/xuống) 
  - Trạng thái sort: unsorted, ascending, descending
- **Filtering:** 
  - Bộ lọc nhanh theo trạng thái xe (dropdown hoặc toggle buttons)
- **Pagination:** 
  - Hiển thị 10-20 xe mỗi trang
  - Controls: Previous, Next, và số trang
  - Hiển thị tổng số trang và vị trí hiện tại
- **Fixed Headers:** 
  - Header cố định khi cuộn dọc
  - z-index: 10 để luôn hiển thị trên cùng

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
  - Background: var(--primary-color)
  - Text: var(--text-white)
  - Font-weight: var(--font-weight-semibold)
  - Padding: 12px 16px
  - Border-radius: var(--radius-sm) var(--radius-sm) 0 0
- **Tab con trong ADMIN:** 
  - TỔNG QUAN, KPI & THƯỞNG, QUẢN LÝ NHÂN VIÊN
  - Background: var(--background-alt)
  - Text: var(--text-color)
  - Font-weight: var(--font-weight-medium)
  - Padding: 8px 12px
  - Border-radius: var(--radius-sm) var(--radius-sm) 0 0
- **Tab active:** 
  - Tabs chính: Border-bottom: 3px solid var(--text-white), Font-weight: var(--font-weight-bold)
  - Tabs con: Border-bottom: 3px solid var(--primary-color), Font-weight: var(--font-weight-semibold), Background: var(--background)
- **Tab hover:** 
  - Tabs chính: Brightness tăng 10%
  - Tabs con: var(--background-alt) background (nếu chưa active)
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

#### Tab Navigation in Modals
- **Container:** Padding: 0 24px 16px, border-bottom: 1px solid var(--border-color)
- **Tabs:** Horizontal list, gap: 24px
- **Tab style:** Padding: 12px 0, Position: relative, font-weight: var(--font-weight-medium)
- **Active tab:** Color: var(--primary-color), Font-weight: var(--font-weight-semibold), Border-bottom: 2px solid var(--primary-color)
- **Hover tab:** Color: var(--primary-hover), Border-bottom: 2px solid var(--border-color)
- **Transition:** var(--transition)

#### Popup Animation
- **Open:**
  - Transform: scale(0.95) → scale(1)
  - Opacity: 0 → 1
  - Timing: 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)
- **Close:**
  - Transform: scale(1) → scale(0.95)
  - Opacity: 1 → 0
  - Timing: 0.2s ease-out

#### Popup Sizes
- **Small:**
  - Max-width: 400px
- **Medium (Default):**
  - Max-width: 600px
- **Large:**
  - Max-width: 800px
- **Full:**
  - Max-width: 90vw
  - Height: 90vh

### 7. Form Patterns

#### Inline Validation
- **Error:**
  - Text color: var(--danger-color)
  - Icon: Warning/error icon
  - Position: Below input field
  - Animation: Fade in 
- **Success:**
  - Icon: Checkmark in var(--success-color)
  - Position: Right side of input field
  - Animation: Fade in + slight bounce
- **Timing:**
  - On blur: Validate after field loses focus
  - On submit: Validate all fields
  - On input: Validate after typing stops (for complex validations)

#### Smart Defaults
- **Ngày nhập:** Ngày hiện tại
- **Trạng thái:** "Trong kho"
- **Năm sản xuất:** Năm hiện tại

### 8. Responsive Breakpoints

- **Smartphone:** < 576px
- **Tablet:** 576px - 991px
- **Desktop:** >= 992px

### 9. Quy tắc áp dụng

1. **Nhất quán:** Tuân thủ hệ thống thiết kế trên toàn bộ ứng dụng
2. **Đơn giản:** Ưu tiên sự đơn giản, dễ hiểu
3. **Rõ ràng:** Mọi thành phần UI đều phải có mục đích rõ ràng
4. **Hợp lý:** Sử dụng màu sắc, kích thước phù hợp với ngữ cảnh
5. **Khả năng tiếp cận:** Đảm bảo độ tương phản màu sắc đạt chuẩn WCAG 2.1
6. **Hiệu quả:** Thiết kế phải phục vụ mục đích quản lý kho xe hiệu quả
7. **Chuyên nghiệp:** Phản ánh tính chuyên nghiệp của ngành ô tô
8. **Tối giản:** Loại bỏ các yếu tố thừa, tập trung vào nội dung và chức năng
9. **Dễ bảo trì:** Sử dụng CSS variables để dễ dàng cập nhật và bảo trì

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