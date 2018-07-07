const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 8080;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// SET UP LOGGING
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append server.log');
		}
	});
	next();
});

// MAKE MAINTENANCE MODE HAPPEN
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

// OPEN UP PUBLIC STUFF
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear() +1;
});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	// res.send('hello world');
	// res.send('<h1>hello world</h1>');
	res.render('home.hbs', {
		pageTitle: 'This is mah HOMEPAGE',
		message: 'Yo welcome to this shit yo'
		// currentYear: new Date().getFullYear()
	});

	// res.send({
	// 	name: 'Paul',
	// 	things: ['Yo', 'Also']
	// })
});

app.get('/about', (req, res) => {
	// res.send('<h2>About Page</h2>');
	res.render('about.hbs', {
		pageTitle: 'ABOUUTTTTT',
		currentYear: new Date().getFullYear()
	});

})

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: "Yeah"
	})
})

app.listen(port, () => {
		console.log(`Server up on ${port}`);
});
