import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const client = new S3Client({
    region:'ap-northeast-2',
    credentials:{
        accessKeyId:process.env.REACT_APP_AWS_ACCESS_KEY,
        secretAccessKey:process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    }
});

const bucket = 'yuruyuri';

export const uploadS3=async (key,file) =>{
    const upload = new Upload({
        client:client,
        params:{
            Bucket: bucket,
            Key: key,
            Body: file,
        }
    });
    try {
        const response = await upload.done();
        return response;
    } catch (err) {
        console.error(err);
    }
};

export const deleteS3=async (key)=>{
    const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
    });
    try {
        const response = await client.send(command);
        console.log(response);
    } catch (err) {
        console.error(err);
    }
};