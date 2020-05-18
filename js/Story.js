import { storyHeight } from "./settings.js";

export default class Story {
  constructor(props) {
    this.prefix = "s_";
    this.id = props.id;
    this.callback = props.callback;
    this.container = props.container;

    this.renderStory();
    this.renderButton();
  }

  renderStory() {
    this.story = document.createElement("div");
    this.story.id = this.prefix + this.id;
    this.story.className = "story";
    this.story.style.cssText = `height:${storyHeight}px`;
    this.container.prepend(this.story);
  }

  renderButton() {
    this.button = document.createElement("button");
    this.button.onclick = this.callElevator.bind(this);
    this.story.appendChild(this.button);
  }

  callElevator() {
    this.button.classList.add("waiting");
    this.callback({ story: this.id, reset: this.reset.bind(this) });
  }

  reset() {
    this.button.classList.remove("waiting");
  }
}
