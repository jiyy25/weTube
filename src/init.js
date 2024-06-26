import 'dotenv/config'
import "./db";
import "./models/video";
import "./models/join";
import app from "./server";

const PORT = 4001;

app.listen(PORT, () => { console.log(`server listening on port http://localhost:${PORT} !!`) });