var Discordie = require("discordie");
var Events = Discordie.Events;
var client = new Discordie();
var request = require('request');

client.connect({
	token: "MjU3NzM4OTE0OTM1MjA5OTk0.Cy_F2g.QRwMvSkIXz3p-pWiC9DtZvgGMNg"
});

var streams = [
	"sc2fantv", 
	"blizzheroes", 
	"mcintyrelol"
];

var commands = [
	"!commands - Show all commands",
	"!streams - See which added streamers are live",
	"!streamers - See which streamers are on the list",
	"!battlefyInvite - get team battlefy invite url"
];

client.Dispatcher.on(Events.GATEWAY_READY, e => {
	console.log("Connected as: " + client.User.username);
});


client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
	var message = e.message.content;
	switch(message){
		case "!commands":
			getCommands(e);
			break;
		case "!streamers":
			getStreamers(e);
			break;
		case "!battlefyInvite":
			getBattlefyInvite(e);
			break;
		case "!streams":
			getLiveStreamers(e);
			break;
		default:
			break;
	}
});

//Shows all the commands
function getCommands(e){
	e.message.channel.sendMessage(commands);
}

//gets a list of the streamers
function getStreamers(e){
	e.message.channel.sendMessage(streams);
}

//posts our teams battlefy invite
function getBattlefyInvite(e){
	e.message.channel.sendMessage("https://go.battlefy.com/BC3GAzRtcG5U");
}

//makes a call to the twitch API and checks if the stramer is online
function getLiveStreamers(e){
	for (var i = 0; i < streams.length; i++) {
		var stream = streams[i];
		request({
			url: 'https://api.twitch.tv/kraken/streams/'+stream,
			headers: {
				'Client-ID': 'pehzjk3hxmz13990yfjw79v0kagfw1'
			}
		}, function(err, res, body){
			streamer = JSON.parse(body, null, 2);
			if(streamer.stream != null){
			e.message.channel.sendMessage(streamer.stream.channel.display_name + " is live at " + streamer.stream.channel.url);
			}
		});
	}
}
