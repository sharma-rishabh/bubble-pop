const randomInt = (upperLimit) => {
  return Math.floor(Math.random() * upperLimit);
};

class View {
  #viewSize;
  constructor(viewSize) {
    this.#viewSize = viewSize;
  };

  randomPoint() {
    const width = this.#viewSize.right - this.#viewSize.left;
    const height = this.#viewSize.bottom - this.#viewSize.top;
    return {
      x: this.#viewSize.left + randomInt(width),
      y: this.#viewSize.top + randomInt(height),
    }
  }

  get getInfo() {
    const height = this.#viewSize.bottom - this.#viewSize.top;
    const width = this.#viewSize.right - this.#viewSize.left;
    return {
      height,
      width,
      x: this.#viewSize.left,
      y: this.#viewSize.top
    }
  }

}

class Bubbles {
  #bubbles;
  constructor() {
    this.#bubbles = [];
  }

  addBubble(bubble) {
    this.#bubbles.push(bubble);
  }

  popBubble(bubbleId) {
    const poppedBubble = this.#bubbles.find(bubble => bubble.id === bubbleId);
    const indexOfPoppedBubble = this.#bubbles.indexOf(poppedBubble);
    this.#bubbles.splice(indexOfPoppedBubble, 1);
  }

  remainingBubbles() {
    return this.#bubbles.length;
  }

  findBubble(bubbleId) {
    return this.#bubbles.find(bubble => bubble.id === bubbleId);
  }

  get getBubbles() {
    return this.#bubbles.slice(0);
  }
}
