var Discordie = require("discordie");
var Events = Discordie.Events;

var client = new Discordie();

client.connect({
	token: "MjU3NzM4OTE0OTM1MjA5OTk0.Cy_F2g.QRwMvSkIXz3p-pWiC9DtZvgGMNg"
});

client.Dispatcher.on(Events.GATEWAY_READY, e => {
	console.log("Connected as: " + client.User.username);
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
	if(e.message.content == "ping"){
		e.message.channel.sendMessage("pong");
	}
});