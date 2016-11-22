# Ajax

Client-side Javascript library for working with RESTful APIs using chainable and modular AJAX/XHR requests.

This library is a JSON first library out-of-the-box but can be used to process any type of data via customizable headers.

## Installation

Include the ajax.js file.

Ajax has no dependencies.

## TLDR Usage
```
var url = 'http://localhost:3000';
var ajax = new Ajax(url);

ajax.resource('users')
	.get(data => console.log('GET LIST', data));

ajax.resource('users')
	.id(1)
	.get(data => console.log('GET SINGLE', data));

ajax.resource('users')
	.data({first: "John", last: "Doe"})
	.post(data => console.log('POST CREATE', data));

ajax.resource('users')
	.id(1)
	.delete(data => console.log('DELETE', data));

ajax.resource('users')
	.where('first')
	.is('John')
	.get(data => console.log('FILTERED IS', data));

ajax.resource('users')
	.where('last')
	.isNot('Smith')
	.get(data => console.log('FILTERED ISNOT', data));

ajax.resource('users')
	.where('first')
	.is('John')
	.and()
	.where('last')
	.isNot('Smith')
	.get(data => console.log('FILTERED DOUBLE', data));

ajax.resource('users')
	.id(1)
	.resource('cars')
	.id(3)
	.get(data => console.log('NESTED RESOURCE', data));
```

## Basic Usage

Create a new Ajax() instance and pass the API url to the constructor.
```
const url = 'http://your-url';
const ajax = new Ajax(url);
```
Or create a new instace without passing a url to the constructor and call the url() method on the new object instance, passing in the url string as a parameter;
```
const url = 'http://your-url';
const ajax = new Ajax();
ajax.url(url);
```
This is useful if you want to call multiple APIs from the same Ajax instance.
```
const ajax = new Ajax();

ajax.url('http://URL1')
	.resource('users')
	.get(data => data);

ajax.url('http://URL2')
	.resource('cars')
	.get(data => data);
```
You can acheive a similar effect by creating multiple instances and passing in the corresponding url strings on instantiation.
```
const ajax1 = new Ajax('http://URL1');
const ajax2 = new Ajax('http://URL2');

ajax1.resource('users')
	.get(data => data);

ajax2.resource('cars')
	.get(data =>  data);
```
However, if you are working primarily with a single REST API it is recommended to instantiate the new object with the url parameter and use that instance throughout your app.
```
const ajax = new Ajax('http://url');

ajax.resource('users')
	.get(data => data);
```
Ajax is designed to allow for extensive and powerful requests.

You can start building your request, leave it, perform some other application calls/logic and come back to your request to finish and send it.

Ajax requests are sent only when a final XHR METHOD i.e. GET/POST/PUT/PATCH/DELETE is called on the object.

### Basic Usage Scenarios
```
const ajax = new Ajax();

// Code/logic to select the API url
// Set the url string

ajax.url('http://url');


// Users Route call in the application is initiated
// Set the ajax resource as 'users'

ajax.resource('users');


// Single User resource is called in the application
// Call the id() method to set the resource :id

ajax.id(3);


// Send a GET call to the backend API
// Call the .get() method to retrieve the specified User data

ajax.get(data => data);


// A different User resource is called
// Set the id() method to set the new resource :id
// Send the request via the get() method in the same call

ajax.id(4)
	.get(data => data);


// The Cars resource is navigated to within the application
// Retrieve data to display all of the cars
// Call the resource() method then the get() method

ajax.resource('cars')
	.get(data => data);


// A User has asked to delete their account from the application
// Call the resource() method, the id() method, then the delete() method

ajax.resource('users')
	.id(41)
	.delete(data => data);


// A new User has signed up for a new account
// Call the resource() method to set the resource
// Call the data() method passing the user's data and then the post() method to send the data

const userData = {
	first: 'John',
	last: 'Doe',
	username: 'jDoe'
	email: 'jDoe@email.com'
}

ajax.resource('users')
	.data(userData)
	.post(data => data);


// A third party API needs to be called.

const newAPIURL = 'http://new_url';
ajax.url('newAPIUrl');


// However it is advised to create a new ajax instance in this case.

const newAPIURL = 'http://new_url';
const newAjax = Ajax('http://new_url');
```
### .resource()
Call the resource() method to declare the API endpoint i.e. 'users'
```
ajax.resource('users');
```
### .id()
Call the id() method after the resource method to declare a single resource.
```
ajax.resource('users')
	.id(1);
```
## XHR Methods
### GET
GET /users

Send a GET request for a list of resource type 'users'
```
ajax.resource('users')
	.get(data => data);
```
GET /users/1

Sends a GET request for a single resource with id = 1
```
ajax.resource('users')
	.id(1)
	.get(data => data);
```
### POST
POST /users

Sends a POST request with data as a JSON object.

NOTE: data passed to the .data() method is automatically converted to JSON
```
ajax.resource('users')
	.data({first: 'Peter', last: 'Smith'})
	.post(data => data);
```
### PUT
PUT /users/1

Sends a PUT request for the specified resource :id and data.

NOTE: data passed to the .data() method is automatically converted to JSON
```
ajax.resource('users')
	.id(1)
	.data({first: 'Peter', last: 'Johnson'})
	.put(data => data);
```
### PATCH
PATCH /users/1

Sends a PATCH request for the specified resource :id and data.

NOTE: data passed to the .data() method is automatically converted to JSON
```
ajax.resource('users')
	.data({first: 'Dan'})
	.patch(data => data);
```
### DELETE
DELETE /users/1

Sends a DELETE request to delete to specified resource :id
```
ajax.resource('users')
	.id(1)
	.delete(data => data);
```
## Filters
### Equality
GET /users?first=John
```
ajax.resource('users')
	.where('first')
	.is('John')
	.get(data => data);
```
### InEquality
GET /users?last_ne=Smith
```
ajax.resource('users')
	.where('last')
	.isNot('Smith')
	.get(data => data);
```
### Greater Than
```
TODO: Add
```
### Less Than
```
TODO: Add
```
### Multiple Filters
GET /users?first=John&state_ne=GA
```
ajax.resource('users')
	.where('first')
	.is('John')
	.and()
	.where('state')
	.isNot('GA')
	.get(data => data);
```
### Custom Filters
GET /users?first=John
```
ajax.resource('users')
	.filter('?first=John')
	.get(data => data);
```
### Custom Filters and Builtin Filters
GET /users?first=John&last=Smith
```
ajax.resource('users')
	.filter('?first=John')
	.and()
	.where('last')
	.is('Smith')
	.get(data => data);
```

### Nested Resources
GET /users/1/cars/3
```
ajax.resource('users')
	.id(1)
	.resource('cars')
	.id(3)
	.get(data => data);
```
## Headers
### .headers()
The .headers() method can accept a single Object or an Array of Objects.

The method sets the headers for the XHR request via the native XMLHTTPRequest setRequestHeader() method.
```
ajax.headers({'Content-type': 'application/x-www-form-urlencoded'});
```
OR an Array of Objects
```
const headers = [
	{'Content-type': 'application/x-www-form-urlencoded'},
	{'Authorization': 'Token'}
];

ajax.headers(headers);
```
You can call the .headers() any amount of times when building a request.

Each call will append the Object or Array to the current list of headers
```
ajax.headers({'Content-type': 'application/x-www-form-urlencoded'});
ajax.headers({'Authorizaion': 'Token'});
```
Multiple .headers() methods can be chained simultaneously
```
ajax.headers({'Content-type': 'application/x-www-form-urlencoded'})
	.headers({'Authorizaion': 'Token'});
```
### Passing Other types of Data via Headers
Ajax is a JSON first library out-of-the-box.

If you need to pass a different type of data i.e. Form, XML then call the .json() method with a parameter of false to turn JSON off. 

Then pass in the appropriate headers for the data type you need
```
ajax.json(false)
	.headers({'Content-type': 'application/x-www-form-urlencoded'});
```
You can call the json method before or after any headers method call.
```
ajax.headers({'Content-type': 'application/x-www-form-urlencoded'});
	.json(false);
```
NOTE: headers are cleared after every request method is called

However the JSON state set via the .json() method will persist.

To turn JSON back on call the .json() method with a parameter of true.
```
ajax.resource('upload')
	.json(false)
	.headers({'Content-type': 'application/x-www-form-urlencoded'})
	.data(formData)
	.post(data => data);

ajax.json(true)
	.resource('users')
	.get(data => data);
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

TODO: Write history

## Credits

TODO: Write credits

## License

TODO: Write license
