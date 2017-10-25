import Lobby from "../../model/lobby";
import * as d3 from "d3";

export default class LobbyComponent {
    private data : Array<Lobby>;
    private d3Component : any;
    
    constructor(lobbyData?: Lobby) {
        this.data = [lobbyData];
    }

    public render() {
        // update
        this.d3Component = d3.selectAll(".lobby")
            .data(this.data)
            .text((data)=>data.getPeople());
        // enter
        this.d3Component
            .enter()
            .append("div")
            .text((data:Lobby)=>data.getPeople());
        // exit
        this.d3Component.exit().remove();
    }

    public update(data:Lobby) {
        this.data = [data];
    }
}