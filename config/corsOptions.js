const whitelist = [
  "http://localhost:3000",
  "https://localhost:3000",
  //   --> New Urls here <--
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS!"));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
