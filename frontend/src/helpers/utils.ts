export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader?.result?.split(',')[1]); // Получаем только base64 без начальной части
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
