import fs from 'node:fs';

export const base64_encode = (buffer, imageType = 'png') => {
  try {
    const base64String = Buffer.from(buffer).toString('base64');
    return `data:image/${imageType};base64,${base64String}`;
  } catch (error) {
    throw new Error(`file ${buffer} no exist ❌`);
  }
};
