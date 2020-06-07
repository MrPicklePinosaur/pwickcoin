import io from 'socket.io-client'

enum MSG_TYPE {
    JOINED = 'joined', //called when we join
    OTHER_JOINED = 'other_joined' // called when another client joins
}

export class Network {
    //list of people on the network - in the future, replace with friend system and query the
    //public key from a db or sm
    addresses: string[] = [];
    socket: SocketIOClient.Socket;

    constructor(serverUrl: string) {
        this.socket = io.connect(serverUrl);

        this.socket.on('connect', () => {
            console.log(`Connected to ${serverUrl}`);

            //broadcast public key (THIS IS TEMP)
            this.socket.emit(MSG_TYPE.JOINED, {address: `${Math.random()}`});
        });

        //when we first establish connection, the server will give us a list of other clients
        this.socket.on(MSG_TYPE.JOINED, (data: {connected: string[]}) => {
            console.log(data);
            console.log(`Joined server with ${data.connected.length} connected clients`);
            this.addresses = data.connected;
        });

        //when someone else joins, we just add them to our list
        this.socket.on(MSG_TYPE.OTHER_JOINED,(data: {new_address: string}) => {
            console.log(`User with address ${data.new_address.substring(0,10)}... has joined`);
            this.addresses.push(data.new_address);
        });

    }

}