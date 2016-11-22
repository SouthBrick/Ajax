# Ajax

TODO: Write a project description

## Installation

TODO: Describe the installation process

## Usage

```
const url = 'http://your-url';
const ajax = new Ajax(url);

ajax.resource('users')
	.get(data => data);

ajax.resource('users')
	.id(1)
	.get(data => data);

ajax.resource('users')
	.where('first')
	.is('John')
	.get(data => data);

ajax.resource('users')
	.where('last')
	.isNot('Smith')
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
