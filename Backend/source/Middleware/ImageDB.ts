import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import axios from 'axios';
import { CouldNotSaveImage } from '../../library/Errors/External';
import { Globals } from '../../library/Globals/Globals';
import { ErrorUtils } from '../../library/Utilities/ErrorUtils';

export type ImageUploadType = {
  imageUrl: string;
  key: string;
}[];

export class ImageDB {
  // Public method to upload an array of images
  public static async uploadImages(
    images: Array<{ imageUrl: string; key: string }>
  ): Promise<string[]> {
    const s3Client = this.createS3Client();

    const uploadPromises = images.map((image) =>
      this.processImageUpload(s3Client, image)
    );

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      return uploadedUrls;
    } catch (error) {
      ErrorUtils.throwCustomError(
        error,
        'Could not upload images',
        CouldNotSaveImage
      );
    }
  }

  // Private static method to process individual image upload
  private static async processImageUpload(
    s3Client: S3Client,
    image: { imageUrl: string; key: string }
  ): Promise<string> {
    const { imageUrl, key } = image;
    try {
      const { buffer, contentType } = await this.fetchImageData(imageUrl);
      const fileUrl = await this.uploadImageToS3(
        s3Client,
        key,
        buffer,
        contentType
      );
      return fileUrl;
    } catch (error) {
      console.error(`Error uploading image: ${imageUrl}`, error);
      throw new CouldNotSaveImage(`Could not save image with key ${key}`);
    }
  }

  // Private static method to create the S3 client
  private static createS3Client(): S3Client {
    return new S3Client({
      region: Globals.AWS_REGION,
      credentials: {
        accessKeyId: Globals.AWS_ACCESS_KEY_ID,
        secretAccessKey: Globals.AWS_SECRET_ACCESS_KEY
      },
      forcePathStyle: true // This can help with CORS issues
    });
  }

  // Private static method to fetch image data from a URL
  private static async fetchImageData(
    imageUrl: string
  ): Promise<{ buffer: Buffer; contentType: string }> {
    try {
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer'
      });
      const buffer = Buffer.from(response.data as string, 'binary');
      const contentType =
        typeof response.headers['content-type'] === 'string'
          ? response.headers['content-type']
          : 'application/octet-stream';
      return { buffer, contentType };
    } catch (error) {
      console.error(`Error fetching image data from URL: ${imageUrl}`, error);
      throw new CouldNotSaveImage(
        `Could not fetch image data from URL: ${imageUrl}`
      );
    }
  }

  // Private static method to upload image data to S3
  private static async uploadImageToS3(
    s3Client: S3Client,
    key: string,
    buffer: Buffer,
    contentType: string
  ): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: Globals.S3_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: contentType
      });

      await s3Client.send(command);

      // Construct and return the file URL
      const fileUrl = `https://${Globals.S3_BUCKET_NAME}.s3.${Globals.AWS_REGION}.amazonaws.com/${key}`;
      return fileUrl;
    } catch (error) {
      throw new CouldNotSaveImage(
        `Could not upload image to S3 with key: ${key}`
      );
    }
  }
}
