const multer = require('multer');
const uuidv4 = require('uuid/v4');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png:': 'png',
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    callback(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer ({
    storage:storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ) {
            callback(null, true);
        } else {
            callback(null, false);
            return callback (new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// module.exports = multer({
//     storage: storage
// }).single('image');

module.exports = upload.single('image');

// const multer = require('multer');

// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png'
// };

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, 'images');
//     },
//     filename: (req, file, callback) => {
//         const name = file.originalname.split(' ').join('_');
//         const extension = MIME_TYPES[file.mimetype];
//         callback(null, name + Date.now() + '.' + extension);
//     }
// });

// module.exports = multer({storage: storage}).single('image');