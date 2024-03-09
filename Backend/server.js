const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { ChatCompletion } = require('openai');
const aws = require('aws-sdk');
const dotenv = require('dotenv');
const fs = require('fs');
const { exec } = require('child_process');
const { mermaidQuery } = require('./mermaid_query');
const { extractPdfText } = require('./pdfextractor');


dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const s3 = new aws.S3({
  accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY
});

const origins = ["*"];

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  console.log('health check!');
  res.send(true);
});

app.post('/extract-pdf', async (req, res) => {
  try {
    const pdfUrl = req.body.url;

    if (!pdfUrl) {
      return res.status(400).json({ error: 'Missing PDF URL in the request body' });
    }

    const extractedText = await extractPdfText(pdfUrl);
    res.json({ extractedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/get-s3-content', async (req, res) => {
  const body = req.body;
  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    Key: body.s3_file_key
  };
  try {
    const data = await s3.getObject(params).promise();
    res.send(data.Body.toString());
  } catch (error) {
    console.error(error);
    res.send('');
  }
});

app.post('/api/get-summarised-s3-content', async (req, res) => {
  const body = req.body;
  // Similar implementation as above
});

app.post('/api/generate', async (req, res) => {
  const body = req.body;
  if (!body.content) {
    res.send('');
    return;
  }
  // console.log('generating for content - ' + body.content.slice(0, 10));
  try {
    const response = await mermaidQuery(body.content);

    let resContent = response.data.choices[0].message.content;
    console.log(resContent);
    resContent = resContent.match(/```mermaid([^`]*)```/s)[1];
    const randomInputFile = `input-${uuidv4()}.mmd`;
    const randomOutputFile = `output-${uuidv4()}.png`;
    fs.writeFileSync(randomInputFile, resContent);
    exec(`mmdc -i ${randomInputFile} -o ${randomOutputFile} -t dark -b transparent`, async (err) => {
      if (err) {
        console.error(err);
        res.send('');
        return;
      }
      const uploadParams = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Key: `mermaid/${randomOutputFile}`,
        Body: fs.createReadStream(randomOutputFile)
      };
      try {
        await s3.upload(uploadParams).promise();

        fs.unlinkSync(randomInputFile);
        fs.unlinkSync(randomOutputFile);

        const s3Url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/mermaid/${randomOutputFile}`;
        console.log(s3Url);
        res.send(s3Url);
      } catch (error) {
        console.error(error);
        res.send('');
      }
    });
  } catch (error) {
    console.error(error);
    res.send('');
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
