import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME;

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: accessKeyId || "",
    secretAccessKey: secretAccessKey || "",
  },
});

export async function uploadVideo(file: File, filename: string) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: `videos/${filename}`,
    Body: buffer,
    ContentType: file.type,
  });
  await r2.send(command);
  return generatePublicUrl(`videos/${filename}`);
}

export async function uploadThumbnail(file: File, filename: string) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: `thumbnails/${filename}`,
    Body: buffer,
    ContentType: file.type,
  });
  await r2.send(command);
  return generatePublicUrl(`thumbnails/${filename}`);
}

export async function deleteVideo(filename: string) {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: `videos/${filename}`,
  });
  return await r2.send(command);
}

export async function deleteThumbnail(filename: string) {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: `thumbnails/${filename}`,
  });
  return await r2.send(command);
}

export function generatePublicUrl(key: string) {
  const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
  return `${publicUrl}/${key}`;
}
