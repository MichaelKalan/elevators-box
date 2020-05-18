import {
  animationSpeed,
  shaftWidth,
  elevatorHeight,
  storyHeight,
  doorDelay
} from "./settings.js";

export default class Elevator {
  constructor(props) {
    this.prefix = "e_";
    this.id = props.id;
    this.story = 0;
    this.queue = [];
    this.moving = false;
    this.container = props.container;
    this.bell = new Audio("assets/ding.mp3");

    this.render();
  }

  render() {
    this.shaft = document.createElement("div");
    this.shaft.className = "elevator";
    this.shaft.style.cssText = `width: ${shaftWidth}px; height: ${elevatorHeight}px; bottom:0; left: ${this
      .id * shaftWidth}px `;
    this.container.appendChild(this.shaft);
  }

  addToQueue(task) {
    this.queue = [...this.queue, task];
    if (!this.moving) {
      this.runNext();
    }
  }

  stepQueue() {
    this.queue.shift();
  }

  runNext() {
    if (this.queue.length > 0) {
      this.moving = true;
      this.go();
    } else this.moving = false;
  }

  arrived() {
    this.bell.play();
    this.queue[0].reset();
    this.stepQueue();
    setTimeout(this.runNext.bind(this), doorDelay);
  }

  async go() {
    this.moveTo(this.queue[0].story);
    setTimeout(this.arrived.bind(this), animationSpeed);
  }

  moveTo(story) {
    if (this.story === story) return;
    const travel = story > this.story ? storyHeight : -storyHeight;
    const stories = Math.abs(this.story - story);
    for (let i = 0; i < stories; i++) {
      this.shaft.style.bottom = `${parseInt(this.shaft.style.bottom) +
        travel}px`;
    }
    this.story = story;
  }
}
