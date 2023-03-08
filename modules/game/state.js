const STATE = Object.freeze({
    START: Symbol('start'),
    PENDING: Symbol('pending'),
    CONTINUE: Symbol('continue'),
    PAUSE: Symbol('pause'),
    END: Symbol('end'),
});
const MODE = Object.freeze({
    CLASSIC: Symbol('classic'),
    POOP: Symbol('poop'),
    GOD: Symbol('god'),
});
const FOOD = Object.freeze({
    APPLE: Symbol('apple'),
    BANANA: Symbol('banana'),
    MOUSE: Symbol('mouse'),
});
const SPEED = Object.freeze({
    SLOW: Symbol(500),
    NORMAL: Symbol(350),
    FAST: Symbol(200),
});
