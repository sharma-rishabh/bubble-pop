(function () {
  const randomInt = (upperLimit) => {
    return Math.floor(Math.random() * upperLimit);
  };

  const px = pixel => pixel + 'px';

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
      const poppedBubble = this.#bubbles.find((bubble => bubble.id === bubbleId));
      const indexOfPoppedBubble = this.#bubbles.indexOf(poppedBubble);
      this.#bubbles.splice(indexOfPoppedBubble, 1);
    }

    remainingBubbles() {
      return this.#bubbles.length;
    }

    get getBubbles() {
      return this.#bubbles.slice(0);
    }
  }

  const drawBubble = (bubble) => {
    const bubbleElement = document.createElement('div');

    bubbleElement.style.top = px(bubble.y);
    bubbleElement.style.left = px(bubble.x);
    bubbleElement.style.width = px(bubble.size);
    bubbleElement.style.backgroundColor = 'black';

    bubbleElement.id = bubble.id;
    bubbleElement.className = 'bubble'

    return bubbleElement;
  };

  const drawPoints = (points) => {
    const pointsElements = document.createElement('div');
    const pointsHeading = document.createElement('h2');
    const pointsText = document.createTextNode(`Points: ${points}`);

    pointsElements.className = 'point';
    pointsElements.appendChild(pointsHeading);
    pointsHeading.appendChild(pointsText);
    pointsHeading.id = 'score';

    return pointsElements;
  };

  const drawGame = (bubbles, view, points) => {
    const bubblesList = bubbles.getBubbles;
    const viewInfo = view.getInfo;

    const viewElement = document.createElement('div');
    viewElement.appendChild(drawPoints(points));

    bubblesList.forEach((bubble) => {
      const bubbleElement = drawBubble(bubble);
      viewElement.appendChild(bubbleElement);
    });

    viewElement.id = 'view';
    viewElement.style.width = px(viewInfo.width);
    viewElement.style.height = px(viewInfo.height);
    viewElement.style.top = px(viewInfo.top);
    viewElement.style.left = px(viewInfo.left);

    document.body.appendChild(viewElement);
  };

  const redrawGame = (bubble, scoreboard) => {
    const viewElement = document.getElementById('view');
    const scoreboardElement = document.getElementById('score');

    scoreboardElement.innerText = `Points: ${scoreboard.points}`;
    viewElement.appendChild(drawBubble(bubble));
  };

  const showScore = (scoreboard) => {
    const gameOverDiv = document.createElement('div');
    gameOverDiv.className = 'game-over';
    const gameOverText = document.createTextNode('GAME OVER!!');
    gameOverDiv.appendChild(gameOverText);

    const scoreElement = document.getElementById('score');
    scoreElement.append(gameOverDiv);
  };

  const isBubble = (id) => {
    return id.startsWith('bubble-');
  };

  const isGameOver = (bubbles) => {
    return bubbles.remainingBubbles() === 10
  }

  const updateGame = (event, bubbles, scoreboard) => {
    if (!isBubble(event.target.id)) {
      return;
    }

    if (isGameOver(bubbles)) {
      return;
    }

    const bubble = event.target;
    scoreboard.points++;
    bubble.remove();
    bubbles.popBubble(bubble.id);
  };

  const createBubble = (bubbles, id, view, scoreboard, initialTimer) => {
    let timer = initialTimer;
    let localId = id;

    setTimeout(() => {
      if (isGameOver(bubbles)) {
        showScore(scoreboard);
        return;
      }

      timer = timer - 5;
      const bubbleOrigin = view.randomPoint();
      console.log(bubbleOrigin);
      const bubble = {
        id: 'bubble-' + localId, ...bubbleOrigin, size: 50
      }
      bubbles.addBubble(bubble);

      redrawGame(bubble, scoreboard);
      createBubble(bubbles, localId + 1, view, scoreboard, timer);
    }, timer);
  };

  const main = () => {
    const view = new View({ top: 50, left: 50, bottom: 300, right: 800 });
    const bubbles = new Bubbles();
    const scoreboard = { points: 0 };
    drawGame(bubbles, view, scoreboard.points);

    const viewElement = document.getElementById('view');
    viewElement.addEventListener('mousedown', (event) => {
      updateGame(event, bubbles, scoreboard)
    });

    createBubble(bubbles, 1, view, scoreboard, 800);
  };

  window.onload = main;
}
)()