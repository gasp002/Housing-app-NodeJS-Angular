const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200, // Certains navigateurs peuvent renvoyer des erreurs avec les requêtes pré-vérifiées (OPTIONS)
}));

// Array to store house listings
const houseListings = [
    {
        id: 0,
        name: 'Acme Fresh Start Housing',
        city: 'Chicago',
        state: 'IL',
        photo: `https://angular.io/assets/images/tutorials/faa/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`,
        availableUnits: 4,
        wifi: true,
        laundry: true
    },
    {
        id: 1,
        name: 'A113 Transitional Housing',
        city: 'Santa Monica',
        state: 'CA',
        photo: `https://angular.io/assets/images/tutorials/faa/brandon-griggs-wR11KBaB86U-unsplash.jpg`,
        availableUnits: 0,
        wifi: false,
        laundry: true
    },
    {
        id: 2,
        name: 'Warm Beds Housing Support',
        city: 'Juneau',
        state: 'AK',
        photo: `https://angular.io/assets/images/tutorials/faa/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg`,
        availableUnits: 1,
        wifi: false,
        laundry: false
    },
    {
        id: 3,
        name: 'Homesteady Housing',
        city: 'Chicago',
        state: 'IL',
        photo: `https://angular.io/assets/images/tutorials/faa/ian-macdonald-W8z6aiwfi1E-unsplash.jpg`,
        availableUnits: 1,
        wifi: true,
        laundry: false
    },
    {
        id: 4,
        name: 'Happy Homes Group',
        city: 'Gary',
        state: 'IN',
        photo: `https://angular.io/assets/images/tutorials/faa/krzysztof-hepner-978RAXoXnH4-unsplash.jpg`,
        availableUnits: 1,
        wifi: true,
        laundry: false
    },
    {
        id: 5,
        name: 'Hopeful Apartment Group',
        city: 'Oakland',
        state: 'CA',
        photo: `https://angular.io/assets/images/tutorials/faa/r-architecture-JvQ0Q5IkeMM-unsplash.jpg`,
        availableUnits: 2,
        wifi: true,
        laundry: true
    },
    {
        id: 6,
        name: 'Seriously Safe Towns',
        city: 'Oakland',
        state: 'CA',
        photo: `https://angular.io/assets/images/tutorials/faa/phil-hearing-IYfp2Ixe9nM-unsplash.jpg`,
        availableUnits: 5,
        wifi: true,
        laundry: true
    },
    {
        id: 7,
        name: 'Hopeful Housing Solutions',
        city: 'Oakland',
        state: 'CA',
        photo: `https://angular.io/assets/images/tutorials/faa/r-architecture-GGupkreKwxA-unsplash.jpg`,
        availableUnits: 2,
        wifi: true,
        laundry: true
    },
    {
        id: 8,
        name: 'Seriously Safe Towns',
        city: 'Oakland',
        state: 'CA',
        photo: `https://angular.io/assets/images/tutorials/faa/saru-robert-9rP3mxf8qWI-unsplash.jpg`,
        availableUnits: 10,
        wifi: false,
        laundry: false
    },
    {
        id: 9,
        name: 'Capital Safe Towns',
        city: 'Portland',
        state: 'OR',
        photo: `https://angular.io/assets/images/tutorials/faa/webaliser-_TPTXZd9mOo-unsplash.jpg`,
        availableUnits: 6,
        wifi: true,
        laundry: true
    }

];

let applications : { firstName: string; lastName: string; email: string; houseId: number }[] = [];

// Route to get all house listings
app.get('/api/houseListing', (req, res) => {
    res.json(houseListings);
});

app.get('/api/houseListing/:id', (req, res) => {
    const houseId = parseInt(req.params.id, 10);

    const houseListing = houseListings.find(listing => listing.id === houseId);

    if (houseListing) {
        res.json(houseListing);
    } else {
        res.status(404).json({ error: 'House listing not found' });
    }
});

app.get('/api/houseListingsByLocation', (req, res) => {
    const { city, state } = req.query;

    if (!city || !state) {
        return res.status(400).json({ error: 'City and state are required parameters' });
    }

    const filteredListings = houseListings.filter(
        listing => listing.city.toLowerCase() === city.toLowerCase() && listing.state.toLowerCase() === state.toLowerCase()
    );

    res.json(filteredListings);
});

app.post('/api/houseListing/submitApplication', (req, res) => {
    const { firstName, lastName, email, id } = req.body;

    console.log('Received application data:', { firstName, lastName, email, houseId: id });

    applications.push({ firstName, lastName, email, houseId: id });
    console.log('Updated applications array:', applications);

    res.json({ success: true });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
