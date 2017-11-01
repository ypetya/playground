import Component from "./component";
import * as d3 from "d3";

interface InputValueType {
    value: string
}

export default class InputFieldComponent extends Component {

    protected tagName = "input";
    protected componentClass = "userInput";
    private callbackFn: Function;
    private d3Node: any;

    constructor(fieldName: string) {
        super('');
        this.componentClass = fieldName;
    }

    public setCallbackOnEnterKey(callbackFn: Function) {
        this.callbackFn = callbackFn;
        return this;
    }

    protected enter() {
        super.enter();
        this.d3SelectionEnter.attr('type', 'text')
            .attr('value', (d: InputValueType) => d.value);
    }

    protected bindEvents() {
        this.d3SelectionEnter.call((entering:any)=>{
            entering.on("keydown", this.onKey.bind(this, entering.node()));
        });
    }

    private onKey(node:any) {
        if (d3.event.key == "Enter") {
            const message = node.value;
            const newValue = this.callbackFn(message);
            node.value = newValue;
        };
    }

    public setData(data: any) {
        if(typeof (data) == "string") {
            data = { value: data };
        }
        return super.setData(data);
    }
}