import Component from "../../client/display/component";
import Person from "../../model/person";
import Message from "../../model/message";

import * as d3 from "d3";

export default class MessageComponent extends Component {
    protected componentClass = "message";
    protected tagName = "p"
    protected data : [Message];
    protected d3MessageSender : any;
    protected d3Message : any;


    protected update() {
        this.d3Component = this.parent
            .selectAll(`.${this.componentClass}`)
            .data(this.data);
        
        console.log(this.data);
    }

    protected enter() {
        this.d3Component
            .enter()
            .append(this.tagName)
            .classed(this.componentClass, true)
            .each(function(d:Message){
                d3.select(this).append("p").classed("sender",true).text(d.getSender().getName());
                d3.select(this).append("p").classed("text",true).text(d.getText());
            });
    }
}
