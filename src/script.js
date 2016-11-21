console.log('Load Script');
var url = 'http://localhost:3000/comments';
var ajax = new Ajax();

ajax.url(url).get(function (data) {
	console.log('Data', data);
});