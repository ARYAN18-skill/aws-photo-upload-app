import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const handler = async (event) => {
    const bucketName = "photo-upload-aryan-bucket"; // your bucket
    const fileName = `image-${Date.now()}.jpg`;

    const s3Client = new S3Client({
        region: "us-east-1"
    });

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        ContentType: "image/jpeg"
    });

    // Generate presigned URL valid for 5 min
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify({
            uploadUrl,
            fileName
        }),
    };
};
