import * as d3 from "d3";
import SingleComponent from "./singlecomponent";

/**
 * ComplexComponent 
 * 
 * Feature : able to render subcomponents
 * Supports :
 *  - calling createSubComponents method on data bind
 *  - calls the render method of each subcomponent present in the subComponents Array
 *  - chains subcomponents as beeing descendent. sets up subcomponents parent initially if needed 
 */
export default class Component extends SingleComponent {

    private subComponentsCreated: boolean = false;
    protected subComponents: Array<Component>;

    public render(): Component {
        //console.log('render', this.componentClass, this.parent.node());
        super.render();

        this.d3SelectionEnter.call((parentNode: any) => {

            this.subComponents.forEach((c: Component, i: number) => {
                // set parent only if not explicitly set
                if (c.parent == null) c.parent = parentNode;

                c.render();
            });
        });
        //console.log('render finished', this.componentClass);
        return this;
    }

    public setData(data?: any) {
        if (!this.subComponentsCreated) {
            this.subComponents = new Array<Component>();
            this.createSubComponents();
            this.subComponentsCreated = true;
        }
        return super.setData(data);
    }

    /** 
     * populate subcomponents
    */
    protected createSubComponents() {
    }
}
