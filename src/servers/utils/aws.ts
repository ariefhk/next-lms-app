import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

export const s3Client = new S3Client({
  region: process.env.CLOUDFLARE_R2_REGION as string,
  endpoint: process.env.CLOUDFLARE_R2_S3API_URL as string,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY as string,
  },
})

interface UploadFileOptions {
  key: string
  folder: string
  body: File | Uint8Array
}

export async function uploadFile(options: UploadFileOptions) {
  try {
    const buffer =
      options.body instanceof File
        ? Buffer.from(await options.body.arrayBuffer())
        : options.body

    const contentType =
      options.body instanceof File ? "image/png" : "application/pdf"

    const data = await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET as string,
        Key: `${options.folder}/${options.key}`,
        Body: buffer,
        ContentType: contentType,
      }),
    )

    return { success: true, data, error: null }
  } catch (error) {
    console.error("Error uploading file to R2: ", error)
    return { success: false, data: null, error: error }
  }
}
