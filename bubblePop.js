(function () {
  const px = pixel => pixel + 'px';

  const randomInt = (upperLimit) => {
    return Math.floor(Math.random() * upperLimit);
  };

  const getRandomSize = () => {
    const sizes = [10, 20, 30, 40, 50];
    return sizes[randomInt(sizes.length)];
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
  };

  const getRelativePoints = (size) => {
    return 6 - (size / 10);
  };

  const updateGame = (event, bubbles, scoreboard) => {
    if (!isBubble(event.target.id)) {
      return;
    }

    if (isGameOver(bubbles)) {
      return;
    }

    const bubbleElement = event.target;
    const bubble = bubbles.findBubble(bubbleElement.id);
    scoreboard.points += getRelativePoints(bubble.size);
    bubbleElement.remove();
    bubbles.popBubble(bubbleElement.id);
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
      const bubble = {
        id: 'bubble-' + localId, ...bubbleOrigin, size: getRandomSize()
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
      updateGame(event, bubbles, scoreboard);
    });

    createBubble(bubbles, 1, view, scoreboard, 800);
  };

  window.onload = main;
}
)()