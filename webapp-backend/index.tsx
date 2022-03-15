const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.get('/', (request, response) => {
    const jsonResponse = {
        title: 'Welcome to the backed service.',
        version: '0.0.1',
        description:
            "This is the backend of the webapp in https://github.com/ZamirAmiri/KubernetesInstallationGuide.git."
    }
    response.send(JSON.stringify(jsonResponse));
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`)
})