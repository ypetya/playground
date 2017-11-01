import Component from "./component";
import Person from "../../model/person";
import Message from "../../model/message";

import * as d3 from "d3";

export default class MessageComponent extends Component {
    protected componentClass = "message";
    protected tagName = "p"
   
    protected enter() {
        this.d3SelectionEnter = this.d3Selection
            .enter()
            .append(this.tagName)
            .classed(this.componentClass, true)
            .each(function(d:Message){
                d3.select(this).append("span").classed("sender",true).text(d.getSender().getName());
                d3.select(this).append("span").classed("text",true).text(d.getText());
            });
    }
}
