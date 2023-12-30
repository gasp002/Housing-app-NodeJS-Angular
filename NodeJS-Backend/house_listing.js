var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var port = 3000;
// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200, // Certains navigateurs peuvent renvoyer des erreurs avec les requêtes pré-vérifiées (OPTIONS)
}));
// Array to store house listings
var houseListings = [
    {
        id: 0,
        name: 'Acme Fresh Start Housing',
        city: 'Chicago',
        state: 'IL',
        photo: "https://angular.io/assets/images/tutorials/faa/bernard-hermant-CLKGGwIBTaY-unsplash.jpg",
        availableUnits: 4,
        wifi: true,
        laundry: true
    },
    {
        id: 1,
        name: 'A113 Transitional Housing',
        city: 'Santa Monica',
        state: 'CA',
        photo: "https://angular.io/assets/images/tutorials/faa/brandon-griggs-wR11KBaB86U-unsplash.jpg",
        availableUnits: 0,
        wifi: false,
        laundry: true
    },
    {
        id: 2,
        name: 'Warm Beds Housing Support',
        city: 'Juneau',
        state: 'AK',
        photo: "https://angular.io/assets/images/tutorials/faa/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg",
        availableUnits: 1,
        wifi: false,
        laundry: false
    },
    {
        id: 3,
        name: 'Homesteady Housing',
        city: 'Chicago',
        state: 'IL',
        photo: "https://angular.io/assets/images/tutorials/faa/ian-macdonald-W8z6aiwfi1E-unsplash.jpg",
        availableUnits: 1,
        wifi: true,
        laundry: false
    },
    {
        id: 4,
        name: 'Happy Homes Group',
        city: 'Gary',
        state: 'IN',
        photo: "https://angular.io/assets/images/tutorials/faa/krzysztof-hepner-978RAXoXnH4-unsplash.jpg",
        availableUnits: 1,
        wifi: true,
        laundry: false
    },
    {
        id: 5,
        name: 'Hopeful Apartment Group',
        city: 'Oakland',
        state: 'CA',
        photo: "https://angular.io/assets/images/tutorials/faa/r-architecture-JvQ0Q5IkeMM-unsplash.jpg",
        availableUnits: 2,
        wifi: true,
        laundry: true
    },
    {
        id: 6,
        name: 'Seriously Safe Towns',
        city: 'Oakland',
        state: 'CA',
        photo: "https://angular.io/assets/images/tutorials/faa/phil-hearing-IYfp2Ixe9nM-unsplash.jpg",
        availableUnits: 5,
        wifi: true,
        laundry: true
    },
    {
        id: 7,
        name: 'Hopeful Housing Solutions',
        city: 'Oakland',
        state: 'CA',
        photo: "https://angular.io/assets/images/tutorials/faa/r-architecture-GGupkreKwxA-unsplash.jpg",
        availableUnits: 2,
        wifi: true,
        laundry: true
    },
    {
        id: 8,
        name: 'Seriously Safe Towns',
        city: 'Oakland',
        state: 'CA',
        photo: "https://angular.io/assets/images/tutorials/faa/saru-robert-9rP3mxf8qWI-unsplash.jpg",
        availableUnits: 10,
        wifi: false,
        laundry: false
    },
    {
        id: 9,
        name: 'Capital Safe Towns',
        city: 'Portland',
        state: 'OR',
        photo: "https://angular.io/assets/images/tutorials/faa/webaliser-_TPTXZd9mOo-unsplash.jpg",
        availableUnits: 6,
        wifi: true,
        laundry: true
    }
];
var applications = [];
// Route to get all house listings
app.get('/api/houseListing', function (req, res) {
    res.json(houseListings);
});
app.get('/api/houseListing/:id', function (req, res) {
    var houseId = parseInt(req.params.id, 10);
    var houseListing = houseListings.find(function (listing) { return listing.id === houseId; });
    if (houseListing) {
        res.json(houseListing);
    }
    else {
        res.status(404).json({ error: 'House listing not found' });
    }
});
app.get('/api/houseListingsByLocation', function (req, res) {
    var _a = req.query, city = _a.city, state = _a.state;
    if (!city || !state) {
        return res.status(400).json({ error: 'City and state are required parameters' });
    }
    var filteredListings = houseListings.filter(function (listing) { return listing.city.toLowerCase() === city.toLowerCase() && listing.state.toLowerCase() === state.toLowerCase(); });
    res.json(filteredListings);
});
app.post('/api/houseListing/submitApplication', function (req, res) {
    var _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, id = _a.id;
    console.log('Received application data:', { firstName: firstName, lastName: lastName, email: email, houseId: id });
    applications.push({ firstName: firstName, lastName: lastName, email: email, houseId: id });
    console.log('Updated applications array:', applications);
    res.json({ success: true });
});
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
