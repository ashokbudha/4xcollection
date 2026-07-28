import "dotenv/config";

import app from "./app.js";
import connectDB from "./db/index.js";

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("Express App Error:", error);
      throw error;
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  })
  .catch((error) => {
    console.error("MongoDB Connection Failed:", error);
  });
