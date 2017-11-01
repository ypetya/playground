
import {IOSocket} from "../interface/definitions";
import io = require("socket.io");
import * as d3 from "d3";
import ChatComponent from "./display/chat";

const content = d3.select(".content");
const socket : any = io("/");
const chatComponent = new ChatComponent(socket).setParent(content).render();
