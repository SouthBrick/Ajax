var url = 'http://localhost:3000';
var ajax = new Ajax();

ajax.url(url)
	.resource('comments')
	.id(1)
	.get(function (data) {
		console.log('data', data);
	});

ajax.url(url)
	.resource('comments')
	.where("body")
	.is("some comment")
	.get(function (data) {
		console.log('query', data);
	});

ajax.url(url)
	.resource('comments')
	.where("id")
	.isNot(1)
	.get(function (data) {
		console.log('ISNOT', data);
	});

ajax.url(url)
	.resource('posts')
	.get(function (data) {
		console.log('LIST', data);
	});

ajax.url(url)
	.resource('posts')
	.data({title: "test title", author: "test author"})
	.post(function(data) {
		console.log('POST', data);
	});

ajax.url(url)
	.resource('posts')
	.where("id")
	.is(1)
	.and()
	.where("postId")
	.isNot(3)
	.get(function (data) {
		console.log('DOUBLE IDENTIFIER', data);
	});

ajax.url(url)
	.resource('users')
	.id(1)
	.resource('cars')
	.id(3)
	.get(data => data);