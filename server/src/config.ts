const ACCESS_TOKEN_SECRET = "lsdkjfaalksdjflkjsdfs";
const REFRESH_TOKEN_SECRET = "sdljfaskljdfaklsjdfksd";
const MONGO_DB_URI =
  "mongodb://abdulqshabbir:test123@ds219983.mlab.com:19983/reading-list";
const __prod__ = process.env.NODE_ENV === "production";

export default {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  MONGO_DB_URI,
  __prod__,
};
