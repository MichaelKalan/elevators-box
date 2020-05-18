import Story from "./Story.js";
import Elevator from "./Elevator.js";

export default function componentFactory(type, amount, props) {
  let produce = [];
  for (let i = 0; i < amount; i++) {
    props.id = i;
    switch (type) {
      case "story":
        produce.push(new Story(props));
        break;
      case "elevator":
        produce.push(new Elevator(props));
        break;
      default:
        break;
    }
  }
  return produce;
}
