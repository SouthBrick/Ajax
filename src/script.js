console.log('Load Script');
var url = 'http://localhost:3000';
var ajax = new Ajax();

// ajax.url(url).get(function (data) {
// 	console.log('Data', data);
// });

// ajax.url(url).id(1).get('comments');

ajax.url(url).resource('comments').id(1).get(function (data) {
	console.log('data', data);
});

ajax.url(url).resource('comments').where("body").is("some comment").get(function (data) {
	console.log('query', data);
});


ajax.url(url).resource('comments').where("id").isNot(1).get(function (data) {
	console.log('ISNOT', data);
});

ajax.url(url).resource('posts').get(function (data) {
	console.log('LIST', data);
});

ajax.url(url).resource('posts').data({title: "test title", author: "test author"}).post(function(data) {
	console.log('POST', data);
});
// ajax.url()
// 	.resource('comments')
// 	.id(123)
// 	.get();

// .where('users').equals('123');

// buildings/123/floors/?name="3rd"

// .resource('buildings')
// .id(123)
// .resource('floors')
// .where('name')
// .equals("3rd");
// .get();


// paths.push(path);

// paths = paths.reduce(function (prev, next) {
// 	return prev + '/' + next;
// }, '');
// .resource('buildings')