import Component from "../../client/display/component";
import * as d3 from "d3";

export default class InputFieldComponent extends Component {

    protected tagName = "input";
    protected componentClass = "userInput";
    private callbackFn:Function;
    private d3Node:any;

    constructor(fieldName: string) {
        super('');
        this.componentClass = fieldName;
    }

    public setCallbackOnEnter(callbackFn:Function){
        this.callbackFn = callbackFn;
        return this;
    }

    protected update() {
        this.d3Component = this.parent
            .selectAll(`.${this.componentClass}`)
            .data(this.data)
            .text(this.getText);
    }
     
    protected enter() {
        this.d3Component
            .enter()
            .append(this.tagName)
            .classed(this.componentClass, true)
            .attr('type','text')
            .attr('value', (d) => d.value);
    }

    protected bindEvents() {
        this.d3Node = this.parent.select(`input.${this.componentClass}`);   
        this.d3Node.on("keydown", this.onKey.bind(this));
    }

    private onKey() {
        if(d3.event.key == "Enter"){
            const message = this.d3Node.node().value;
            const newValue = this.callbackFn(message);
            this.d3Node.node().value = newValue;
        };
    }


    public setData(data: any) {
        if (Array.isArray(data)) {
            this.data = data;
        } else {
            this.data = typeof(data) == "string" ? [{value: data}] : [];
        }
        return this;
    }
}