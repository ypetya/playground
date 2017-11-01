import TextComponent from "./textcomponent";
import UserComponent from "./user";
import Lobby from "../../model/lobby";
import Person from "../../model/person";

export default class LobbyComponent extends TextComponent {
    protected componentClass = "lobby";
    private userComponent: UserComponent;

    public setData(data?: any) {
        super.setData(data);
        if (this.data && this.data.length) {
            this.userComponent.setData(this.data[0].getPeople());
        }
        return this;
    }

    protected createSubComponents() {
        this.userComponent = new UserComponent();
        this.subComponents.push(this.userComponent);
        super.createSubComponents();
    }

    protected getText(data: Lobby) {
        let len = "";
        if (data && data.getPeople().length) {
            len = " # " + data.getPeople().length;

            if(data.getPeople().length>=4) {
                return "Megvagyunk!";
            }
        }
        return `Lobby${len}`;
        
    }
}
