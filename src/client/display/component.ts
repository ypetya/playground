import * as d3 from "d3";

const defaultContainer = d3.select("body");

export default class Component {
    protected data: Array<any>;
    protected d3Component: any;
    protected componentClass: string;
    protected tagName = "div";
    protected parent:any = defaultContainer;

    constructor(data?: any) {
        this.setData(data);
    }

    public render() : Component {
        this.update();
        this.enter();
        this.exit();

        this.bindEvents();
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
            .text(this.getText);
    }

    protected exit() {
        this.d3Component.exit().remove();
    }

    /**
     * d3Component is ready, bind events to it 
     */
    protected bindEvents() {
    }

    public setData(data: any) {
        if (Array.isArray(data)) {
            this.data = data;
        } else {
            this.data = data ? [data] : [];
        }
        return this;
    }

    protected getText(data?: any) {
        return data || "";
    }

    public setParent(parent: any) {
        this.parent = parent;
        return this;
    }
}
