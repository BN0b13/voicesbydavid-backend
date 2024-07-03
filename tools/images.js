import sharp from 'sharp';

export const compressImage = async (path, filename) => {
    await sharp(path)
        .rotate()
        .webp({ quality: 20 })
        .toFile(`./public/img/${filename}-mobile.webp`);
}