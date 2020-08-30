const ACCESS_TOKEN_SECRET = "lsdkjfaalksdjflkjsdfs";
const REFRESH_TOKEN_SECRET = "sdljfaskljdfaklsjdfksd";
const MONGO_DB_URI =
  "mongodb://test:test123@ds141221.mlab.com:41221/reading";
const __prod__ = process.env.NODE_ENV === "production";

export default {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  MONGO_DB_URI,
  __prod__,
};
