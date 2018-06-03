const axios = require('axios');
//const _ = require('lodash');

const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLNonNull,
	GraphQLSchema
} = require('graphql');
//Hard coded data
/*
const customer = [
	{id:'1', name:'John Doe', email:'1@w.com', age:'25'},
	{id:'2', name:'JBruce Lee', email:'1@w.com', age:'25'},
	{id:'3', name:'Joe Woo', email:'1@w.com', age:'25'},
]
*/
//customer tyoe
const CustomerType = new GraphQLObjectType({
	name: 'Customer',
	fields: () => ({
		id: {type: GraphQLString},
		name: {type: GraphQLString},
		email: {type:GraphQLString},
		age:{type: GraphQLString}
	})
});
 
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		customer: {
		type: CustomerType,
		args: {
			id:{type:GraphQLString}
		},
		resolve(parentValue, args) {
			return axios.get('http://localhost:3000/customers/' + args.id)
				.then(res => res.data);
			/*
			for(let i = 0;i < customers.length;i++){
				if(customers[i].id == args.id){
					return customers[1];
				}
			}*/
		}
	},
	customers: {
		type: new GraphQLList(CustomerType),
		resolve(parentValue, args){
			return axios.get('http://localhost:3000/customers/')
				.then(res => res.data);
		}
	}
	}
	
});
//Mutation 
const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addCustomer: {
			type: CustomerType,
			args: {
				name: {type: new GraphQLNonNull(GraphQLString)},
				email: {type: new GraphQLNonNull(GraphQLString)},
				age: {type: new GraphQLNonNull(GraphQLInt)},
			},
			resolve(parentValue, args) {
				return axios.post('http://localhost:3000/customers', {
					name: args.name,
					email: args.email,
					age: args.age
				}).then(res => res.data);
			}
		},
		deleteCustomer: {
			type: CustomerType,
			args: {
				id: {type: new GraphQLNonNull(GraphQLString)}
			},
			resolve(parentValue, args) {
				return axios.delete('http://localhost:3000/customers/' + args.id)
				.then(res => res.data);
			}
		},
		editCustomer: {
			type: CustomerType,
			args: {
				id: {type: new GraphQLNonNull(GraphQLString)},
				name: {type: GraphQLString},
				email: {type: GraphQLString},
				age: {type: GraphQLInt},
			},
			resolve(parentValue, args) {
				return axios.patch('http://localhost:3000/customers/' + args.id, args)
				.then(res => res.data);
			}
		}

	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation
});