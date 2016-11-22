# Ajax

Client-side Javascript Application for chainable AJAX/XHR requests

## Installation

Include the ajax.js file.

Ajax relies on no dependencies.

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
### .resource()
Call the resource() method to declare the API endpoint i.e. 'users'
```
ajax.resource('users');
```
### .id()
Call the id() method after the resource method to declare single resource.
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

Sends a POST request with JSON data

NOTE: data passed to the .data() method is automatically converted to JSON
```
ajax.resource('users')
	.data({first: 'Peter', last: 'Smith'})
	.post(data => data);
```
### PUT
PUT /users/1

Sends a PUT request with JSON data for the specified resource :id
```
ajax.resource('users')
	.id(1)
	.data({first: 'Peter', last: 'Johnson'})
	.put(data => data);
```
### PATCH
PATCH /users/1
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
