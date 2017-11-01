import Component from "./component";

export default class TextComponent extends Component {

    protected update() {
        super.update();
        this.d3Selection.text(this.getText);
    }

    protected enter() {
        super.enter();
        this.d3SelectionEnter.text(this.getText);
    }

    protected getText(data?: any) {
        return data || "";
    }

}