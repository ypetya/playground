import PersonModel from "../../model/person";
import Component from "../../client/display/component";

export default class Person extends Component {
    componentClass = "person";

    getText(person:PersonModel) {
        return person.getName();
    }
} 