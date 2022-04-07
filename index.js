const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();

app.use(cors());
// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(express.urlencoded({ extended: true }));

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: 'ambulancedispatchsystem-f3ebc',
        privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDg/8TR8sXlhlRQ\nT2zydAjX2gRGvN/ccpGmtrvweniMQoDpIdacsHcNsKX5TvZjSac4g5B/V8CMOOGN\nKNNXNVgbDnVNettDxzW/nctlJAbLcKR+1JmO4m4vgo54JjMk/uh6fvUiDzpwIonq\ntubrmfb6AiqpGsb5fEiMhnkZB9Qn0ugVULNry17P/PHcQkQCIh9rwv+k5n6yvLNz\nkzRt2mR4J9mfJFjw0NDRvSHRD1i0TH/Fn4VDTTXaLqRL6I3LyB4NjiVIpbtblqGR\ngp7tx79nXzk79pE3wUg20WZYuXc9itzNyyWoeHGHaAflV8GCrtNu76UV0P/busqe\nJxNONyzlAgMBAAECggEAGhYFTXsabxlDIrmGrdh+ovn7p3Dj+nTNBrlmckPcwJRA\nSmc6MNnzv6JUp+I8BjhmmxKD2QPFRuycV+edEx4T7DUhq/07uTC6PlBO4dfKsuEJ\nLUw8TnjZogf+uRbitJ4aOYOJK6z8zz3t5AjXHocv/33rUMZSPeAnMCWyGhESi5g8\nVDpuE9Z7OeBx8hFb7ngSTpOrpeXR9Cci8FhvTEfL9DduqcGQniLnozC+63OAzb/e\ny4l8KL2QydzW9rnbBFom1ILSaKg1vJ4MWFwepu/XfvU5ijUHzwPBwAWpSULEhr9f\nPrhYPcxyyWWOM9zriRfQoEj9lcODqDGKrO0uTBjbyQKBgQD254Qrn9Pg5CJAcx5p\nhXFUv2n/j0UF2Lcp7D+TGzmN+iN3SQt5exDoKwgp5QQoFwuyloCwLs9iectRJyH2\noY43kc8sfizQDev6EJdaCbAHpDkjmNEePU4scoW97pHKwj8zW3/6MmCpB/+VHA2b\nb94DFF2mqpORh0kXcK7tGcrSGQKBgQDpSauaZOSDQgHdrE/DNjLO4TYLtt+HfeEl\nlP43WIm77yIhOGGve/cNpnMhcNW0J/Lcr3xfGZroyCExe7C1McAqRCHcR6AmCvBB\nN8ZiaWL/EdZcaNkv1CXpR0SDYaM0QFaJRqSFrNYBUwymuacGKIkCSCuoqg4nx8Gy\nji21LPsCrQKBgQC82y/U8obtwXKVm7iKfEDI0zUv/pWMOE06KvQiALQQbmHMbznw\nrPqsq6Wt7fg09hPDga1jlhqZN5IWO/mVndObm9M9NDHw3oU+nIw4mapk3e+607w5\nBimSg/La6e3oipYvIXENnpUjFfQgSPn7iCDoeB5+SoFf0nxNCqsyvwTNmQKBgBZQ\nur6JGibIIJ+QxQx6Wb/aYS4bryQp0Wij6PFoYbx9cnlVCFsd85L1shunzHlwPNYJ\nX09FhsDvq+Us3MloWeZxIAAPRe19rF/AsxRk2lhl32h1ixj9JSc8bvxWUaNE6EI3\nZLN4xfvYcuRb6/M1221BdBOtOK9rd0baPNsQ0239AoGBALiyshbIwCMC9pO9VIOM\nKKxUxrVWlhUVCi3HFMFN9G3hc1FANNpwzCt+zNt/wkMep8mRxeMjibSj+WPJWV93\nZ1v6E3TvPPE48TfuNMJPpK2o3ET1Sp7tgjt6bLDHeH4h8AqlI0tNKBfzoRqHY57e\nB6FM+N4bQepccbeP6cRZrPin\n-----END PRIVATE KEY-----\n',
        clientEmail: 'firebase-adminsdk-br4b0@ambulancedispatchsystem-f3ebc.iam.gserviceaccount.com',
    }),
    databaseURL: 'https://ambulancedispatchsystem-f3ebc.firebaseio.com',
});

app.get('/', async (req, res) => {
    res.status(200).send('Hello World!');
});

app.post('/register', async (req, res) => {
    const { fName, lName, email, contact, add, pass, type } = JSON.parse(req.body);
    admin.firestore().collection('users').add({ fName, lName, email, contact, add, pass, type }).then((snapshot) => {
        res.status(200).send(snapshot.id);
    });
});

app.post('/login', async (req, res) => {
    const { email, pass, type } = JSON.parse(req.body);

    if (type === 'Management') { 
        if (email === 'management' && pass === 'management') {
            res.status(200).send(JSON.stringify({admin: 'management'}));
        }
    } else {
        const result = await admin.firestore().collection('users').where('email', '==', email).where('pass', '==', pass).where('type', '==', type);
        result.get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
               id: doc.id,
               ...doc.data()
            }))
            res.status(200).send(data);
        });
    }
});

app.get('/getAllUsers', async (req, res) => {
    const result = await admin.firestore().collection('users');
    result.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
        res.status(200).send(data);
    });
});

app.post('/updateUser', async (req, res) => {
    const { id, fName, lName, email, contact } = JSON.parse(req.body);
    const user = admin.firestore().collection('users').doc(id);
    user.update({ fName, lName, email, contact }).then(() => {
        res.status(200).send('Updated');
    });
});

app.post('/deleteUser', async (req, res) => {
    const { id } = JSON.parse(req.body);
    const user = admin.firestore().collection('users').doc(id).delete();
    user.then(() => {
        res.status(200).send('Deleted');
    });  
});

app.get('/getAllPosts', async (req, res) => {
    const result = await admin.firestore().collection('posts');
    result.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
           id: doc.id,
           ...doc.data()
        }))
        res.status(200).send(data);
    });
});

app.get('/getUserPosts', async (req, res) => {
    const result = await admin.firestore().collection('posts').where('userId', '==', req.query.id);
    result.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
           id: doc.id,
           ...doc.data()
        }))
        res.status(200).send(data);
    });
});

app.post('/createPost', async (req, res) => {
    const { title, description, category } = JSON.parse(req.body);
    admin.firestore().collection('posts').add({ title, description, category, applicants: [] }).then((snapshot) => {
        res.status(200).send(snapshot.id);
    });
});

app.post('/updatePost', async (req, res) => {
    const { id, title, description, category } = JSON.parse(req.body);
    const user = admin.firestore().collection('posts').doc(id);
    user.update({ title, description, category }).then(() => {
        res.status(200).send('Updated');
    });
});

app.post('/deletePost', async (req, res) => {
    const { id } = JSON.parse(req.body);

    const post = admin.firestore().collection('posts').doc(id).delete();
    post.then(() => {
        res.status(200).send('Deleted');
    });
});

app.post('/applyJob', async (req, res) => {
    const { email, Fname, Lname, phone, Add, city, province, country, school, program, edu_lvl, gr_date, emp_name, job_t, job_d, w_year } = JSON.parse(req.body);

    const result = admin.firestore().collection('posts').doc(String(req.query.id)).get();

    result.then((snapshot) => {
        let post = snapshot.data();
        if (post.applicants) {
            post.applicants.push({ email, Fname, Lname, phone, Add, city, province, country, school, program, edu_lvl, gr_date, emp_name, job_t, job_d, w_year });
        } else {
            post.applicants = [{ email, Fname, Lname, phone, Add, city, province, country, school, program, edu_lvl, gr_date, emp_name, job_t, job_d, w_year }];
        }

        admin.firestore().collection('posts').doc(String(req.query.id)).update({ applicants: post.applicants }).then(() => {
            res.status(200).send('Updated');
        });
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});