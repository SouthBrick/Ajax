# Ajax

TODO: Write a project description

## Installation

TODO: Describe the installation process

## Basic Usage

Create a new instance and pass the API url to the constructor
```
const url = 'http://your-url';
const ajax = new Ajax(url);
```
Or create a new instace without passing a url to the constructor and call the url() method on the new object instance
```
const url = 'http://your-url';
const ajax = new Ajax();
ajax.url(url);
```
### GET
```
/users
ajax.resource('users')
	.get(data => data);

/users/1
ajax.resource('users')
	.id(1)
	.get(data => data);

/users?first=John
ajax.resource('users')
	.where('first')
	.is('John')
	.get(data => data);

/users?last_ne=Smith
ajax.resource('users')
	.where('last')
	.isNot('Smith')
	.get(data => data);
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
```
TODO: Add
```
### POST
POST /users
```
ajax.resource('users')
	.data({first: 'Peter', last: 'Smith'})
	.post(data => data);
```

### Nested Resources
GET /users/1/cars/3
```
ajax.resource('users')
	.id(1)
	.resource('cars')
	.id(3);
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
