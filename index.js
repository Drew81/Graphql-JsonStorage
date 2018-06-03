const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const cors = require('cors');

app.use(cors());


app.use('/graphql', expressGraphQL({
	schema: schema,
	graphiql: true,
	pretty:  true
}));

app.listen(4000, () => {
	console.log('Server running 4000')
});