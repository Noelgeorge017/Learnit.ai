
### Title
Learnit.ai: Revolutionizing Self-Learning with Personalized AI Curation

### Features
* __AI-Powered Curation__: Our platform leverages advanced AI algorithms to curate highly relevant learning resources tailored to each user's unique needs, including captivating educational videos sourced from YouTube and concise summaries.
* __Personalized Learning Paths__: Utilizing Next.js, Learnit.ai constructs structured learning paths that adapt in real-time based on the user's learning style and progress, ensuring a customized learning experience.
* __Interactive Chatbot__: Our built-in chatbot, powered by ChatGPT, offers real-time support and assistance, helping users navigate challenges and clarify complex topics.
* __Topic Specification__: Users can specify the topics they wish to cover, enabling precise customization of course content to align with their learning objectives.
* __PDF Document Upload__: Seamless integration of additional educational materials into the learning curriculum by allowing users to upload PDF documents.
* __Mindmap Generation__: Learnit.ai goes beyond traditional course structures by providing users with visual representations of course content through mindmap generation, fostering deeper comprehension and organization of complex concepts.

### Demo
https://github.com/NazimFilzer/Learnit.ai/assets/98267566/33f88387-1440-46d2-94e6-b6f8a8335437



### Technologies Used
* __Next.js__: A powerful framework for dynamic content generation, used for constructing personalized learning paths and dynamic content rendering.
* __Node.js__: Backend runtime environment for server-side logic and API integrations.
* __NextAuth__: Authentication library for user authentication and authorization.
* __AWS__: Cloud computing services utilized for storing files.
* __Tailwind CSS__: A utility-first CSS framework for creating custom designs with ease.
* __OpenAI API__: Utilized for AI-powered curation and chatbot functionality.
* __YouTube API__: Integrated for sourcing educational videos seamlessly.
* __Unsplash API__: Utilized for fetching images  for course to enhance the user experience.
* __Prisma__: Database ORM for managing data and user profiles.

### Installation
__1__.Clone the repository: git clone https://github.com/Noelgeorge017/Learnit.ai.

__2__.Install dependencies: npm install (or yarn install).

__3__.Create a .env.local file and define environment variables:
* OPENAI_API_KEY=<your_openai_api_key>.
* DATABASE_URL: The URL of your database. Example: mongodb://localhost/mydatabase.
* GOOGLE_CLIENT_ID: Client ID for Google OAuth authentication. Example: 1234567890-abcd1234efgh5678ijklmnopqrstuvwxyz.apps.googleusercontent.com.
* GOOGLE_CLIENT_SECRET: Client secret for Google OAuth authentication. Example: AbCdEfGhIjKlMnOpQrStUvWxYz.
* NEXTAUTH_SECRET: Secret used for NextAuth.js authentication. Example: mysecretkey.
* NEXTAUTH_URL: URL of your Next.js application. Example: https://localhost:3000.
* NEXT_PUBLIC_S3_ACCESS_KEY_ID: Access key ID for AWS S3 bucket (public). Example: AKIA1234567890.
* NEXT_PUBLIC_S3_SECRET_ACCESS_KEY: Secret access key for AWS S3 bucket (public). Example: AbCdEfGhIjKlMnOpQrStUvWxYz1234567890.
* NEXT_PUBLIC_S3_BUCKET_NAME: Name of your AWS S3 bucket (public). Example: my-bucket.
* NEXT_PUBLIC_S3_REGION: AWS region where the S3 bucket is located. Example: us-east-1.
* OPENAI_API_KEY: API key for OpenAI API. Example: sk-abcdefghijklmno1234567890.
* UNSPLASH_API_KEY: API key for Unsplash API. Example: AbCdEfGhIjKlMnOpQrStUvWxYz1234567890.
* YOUTUBE_API_KEY: API key for YouTube Data API. Example: AIzaSyD-1234567890.
* STRIPE_API_KEY: API key for Stripe API. Example: sk_test_1234567890.
* STRIPE_WEBHOOK_SECRET: Secret used for Stripe webhook verification. Example: whsec_1234567890.


__4__.Set up Prisma: https://www.prisma.io/docs/getting-started/setup-prisma.

__5__.Start the development server: npm run dev (or yarn dev).
