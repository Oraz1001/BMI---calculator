// server.js for import mod
const express = require('express');
const path = require('path');
const app = express(); //setup the app and server
const PORT = 3000;

app.use(express.urlencoded({ extended: true })); // for parsing form data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
// Routes
// Homepage route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// BMI calculation route
app.post('/calculate', (req, res) => {
    const { weight, height, age, gender } = req.body;

    // Input validation
    if (!weight || !height || weight <= 0 || height <= 0) {
        return res.send(`
            <h1>Error</h1>
            <p>Please enter valid positive numbers for weight and height.</p>
            <a href="/">Go back</a>
        `); //sends to the route 
    }

    // BMI Calculation
    const bmi = (weight / (height * height)).toFixed(2); //round bmi - 2 decimal pl
    let category;
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 24.9) category = 'Normal weight';
    else if (bmi < 29.9) category = 'Overweight';
    else category = 'Obesity';

    // Health tips based on BMI
    let tips;
    switch (category) {
        case 'Underweight':
            tips = 'Consider a balanced diet with more calories.';
            break;
        case 'Normal weight':
            tips = 'Maintain your current lifestyle for a healthy weight.';
            break;
        case 'Overweight':
            tips = 'Incorporate regular exercise and watch your diet.';
            break;
        case 'Obesity':
            tips = 'Consult a healthcare provider for a personalized plan.';
            break;
    }

    res.send(`
        <h1>BMI Result</h1>
        <p>Your BMI is ${bmi} (${category}).</p>
        <p>Age: ${age}</p>
        <p>Gender: ${gender}</p>
        <p>Health Tips: ${tips}</p>
        <a href="/">Go back</a>
    `);
});

// used for the start of the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
