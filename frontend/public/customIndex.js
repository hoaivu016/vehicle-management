// Một số cấu hình bổ sung cho ứng dụng
console.log('Application initialized');

// Kiểm tra lỗi 404
window.addEventListener('error', function(event) {
  if (event.message && event.message.includes('Failed to load resource: the server responded with a status of 404 (Not Found)')) {
    console.error('404 error detected, attempting to reload app...');
    // Có thể thêm logic xử lý lỗi 404 tại đây
  }
}); 