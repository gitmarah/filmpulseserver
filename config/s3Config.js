import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    },
    region: process.env.BUCKET_REGION
});

export const getImageUrl = async (key) => {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: key
    }
    const command = new GetObjectCommand(params)
    const url = await getSignedUrl(s3, command, {expiresIn: 36000})
    return url
}

export default s3;