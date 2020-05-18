import componentFactory from "./ComponentsFactory.js";
import { shaftWidth } from "./settings.js";

export default class Building {
  constructor(options) {
    this.container = options.container;
    this.setStyles(options.elevators);
    this.stories = this.setStories(options.stories);
    this.elevators = this.setElevators(options.elevators);
  }

  setStyles(shafts) {
    this.container.style.cssText = `width: ${shafts * shaftWidth + 30}px`;
  }

  setStories = count =>
    componentFactory("story", count, {
      container: this.container,
      callback: this.directTask.bind(this)
    });

  setElevators = count =>
    componentFactory("elevator", count, { container: this.container });

  directTask(task) {
    let work = this.elevators.concat().sort(function(a, b) {
      if (Math.abs(a.story - task.story) < Math.abs(b.story - task.story))
        return -1;
      else return 1;
    });
    this.elevators[work[0].id].addToQueue(task);
  }
}
