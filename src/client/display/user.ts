import PersonModel from "../../model/person";
import TextComponent from "./textcomponent";

export default class Person extends TextComponent {
    protected componentClass = "person";

    getText(person:PersonModel) {
        return person.getName();
    }
} 