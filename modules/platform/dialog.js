class Dialog extends ViewControl {
    mode = () => {
        return `<fieldset style="border: none">
      <legend style="font-weight: bold"> Choose Mode</legend>

      <input type="radio" id="GOD" name="radio" value="GOD">
      <label for="GOD">God Mode (not ok)</label><br>

      <input type="radio" id="POOP" name="radio" value="POOP">
      <label for="POOP">Poop Mode</label><br>

      <input checked type="radio" id="CLASSIC" name="radio" value="CLASSIC" />
      <label for="CLASSIC">Classic Mode</label>
    </fieldset>
    <button id="accept" class="button info__button">Accept</button>
    `;
    }

    speed = () => {
        return `<fieldset style="border: none">
      <legend style="font-weight: bold"> Choose Speed</legend>

      <input type="radio" id="FAST" name="radio" value="FAST">
      <label for="fast">Fast</label><br>

      <input checked type="radio" id="NORMAL" name="radio" value="NORMAL">
      <label for="normal">Normal</label><br>

      <input type="radio" id="SLOW" name="radio" value="SLOW" />
      <label for="slow">Slow</label>
    </fieldset>
    <button id="accept" class="button info__button">Accept</button>
    `
    };

    food = () => {
        return `<fieldset style="border: none">
      <legend style="font-weight: bold"> Choose Food</legend>

      <input ${this.gameFood === FOOD.APPLE ? 'checked' : ''} type="radio" id="apple" name="radio" value="APPLE">
      <label for="apple"><img class="radio__img" src="${pictures.apple.src}" alt=""></label><br>

      <input ${this.gameFood === FOOD.BANANA ? 'checked' : ''} type="radio" id="banana" name="radio" value="BANANA">
      <label for="banana"><img class="radio__img" src="${pictures.banana.src}" alt=""></label><br>
      <input ${this.gameFood === FOOD.MOUSE ? 'checked' : ''} type="radio" id="mouse" name="radio" value="MOUSE">
      <label for="mouse"><img class="radio__img" src="${pictures.mouse.src}" alt=""></label><br>
    </fieldset>
    <button id="accept" class="button info__button">Accept</button>
    `;
    }

    constructor() {
        super('dialog', getElements('dialog'));
        this.el.addEventListener('click', this.clickHandler.bind(this));
        this.gameMode = '';
        this.gameSpeed = '';
        this.gameFood = '';
    }
    hide() {
        this.el.removeAttribute('open');
    }
    show(kind, gameMode, gameSpeed, gameFood) {
        this.gameFood = gameFood;
        this.gameMode = gameMode;
        this.gameSpeed = gameSpeed;
        this.el.innerHTML = this[kind]();
        this.el.setAttribute("open", "open");
    }
    returnCheckedValue() {
        return document.querySelectorAll('input[name=radio]:checked')[0].value;
    }
}
