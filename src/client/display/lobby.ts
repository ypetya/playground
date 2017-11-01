import Lobby from "../../model/lobby";
import Component from "../../client/display/component";
import UserComponent from "../../client/display/user";
import Person from "../../model/person";

export default class LobbyComponent extends Component {
    protected componentClass = "lobby";

    protected subComponents: Array<Component> = [];

    public setData(data?: any) {
        super.setData(data);
        if (this.data && this.data.length) {
            const subComponent = new UserComponent(this.data[0].getPeople());
            this.subComponents = [subComponent];
        }
        return this;
    }

    protected getText(data: Lobby) {
        return "Lobby";
    }

    public render() : LobbyComponent {
        super.render();
        this.subComponents.forEach(c => {
            c.setParent(this.d3Component)
            c.render();
        });
        return this;
    }
}
