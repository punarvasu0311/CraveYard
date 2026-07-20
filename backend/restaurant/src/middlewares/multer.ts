import multer from "multer";

const storage = multer.memoryStorage();
// this adds the part of file in frontend formdata(addRestaurant.tsx) to req.file and remaining to req.body
const uploadFile = multer({ storage }).single("file");

export default uploadFile;
