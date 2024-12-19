export const convertToBase64 = (imageData: any) => {
  return btoa(new Uint8Array(imageData).reduce((data, byte) => data + String.fromCharCode(byte), ''));
};
