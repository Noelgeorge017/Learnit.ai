import AWS from "aws-sdk";


export async function uploadToS3(file: File) {
  try {
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3({
      params: { Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME },
      region: process.env.NEXT_PUBLIC_S3_REGION as string,
    });
    let url = "";
    const file_key =
      "uploads/" + file.name.replace(" ", "");

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string,
      Key: file_key,
      Body: file,
      ContentType: "application/pdf",
        ACL: "public-read",
    };
    const upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(
          "Uploading " +
            parseInt(((evt.loaded * 100) / evt.total).toString()).toString() +
            "%"
        );
      })
      .promise();

      const encodedFileKey = encodeURI(file_key).replace(/%20/g, '+');
      console.log("modified key",encodedFileKey);

    await upload.then((data) => {
      // get url of the file
       url = `https://nextpdfbucket.s3.ap-south-1.amazonaws.com/${encodedFileKey}`
      console.log("success upload to s3",url);
      return Promise.resolve(url);
    });
    // console.log("success upload to s3",file_key);

    return Promise.resolve(url);
  } catch (error) {
    console.log(error);
  }
}
