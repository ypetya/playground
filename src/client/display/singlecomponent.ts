
export default class SingleComponent {
    protected data: Array<any>;
    protected d3Selection: any;
    protected d3SelectionEnter: any;
    protected d3SelectionExit: any;
    protected componentClass: string;
    protected tagName = "div";
    protected parent:any;

    constructor(data?: any) {
        this.setData(data);
    }

    public render() : SingleComponent {
        this.update();
        this.enter();
        this.exit();

        this.bindEvents();
        return this;
    }

    protected update() {
        this.d3Selection = this.parent
            .selectAll(`.${this.componentClass}`)
            .data(this.data);
    }

    protected enter() {
        this.d3SelectionEnter = this.d3Selection
            .enter()
            .append(this.tagName)
            .classed(this.componentClass, true);
    }

    protected exit() {
        this.d3SelectionExit = this.d3Selection.exit().remove();
    }

    /**
     * d3Component is ready, bind events to it 
     */
    protected bindEvents() {
    }

    public setData(data?: any) {
        if (Array.isArray(data)) {
            this.data = data;
        } else {
            const isDataDefined = !!data || data === '';
            this.data = isDataDefined ? [data] : [];
        }
        return this;
    }

    public setParent(parent: any) {
        this.parent = parent;
        return this;
    }
}
