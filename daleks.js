"use strict";
var DALEKMOVES;
(function (DALEKMOVES) {
    ;
    function isDaleksKey(key) {
        switch (key) {
            case 37 /* ArrowLeft */:
            case 38 /* ArrowUp */:
            case 39 /* ArrowRight */:
            case 40 /* ArrowDown */:
            case 33 /* ArrowRightUp */:
            case 34 /* ArrowRightDown */:
            case 35 /* ArrowLeftDown */:
            case 36 /* ArrowLeftUp */:
            case 105 /* NumberRightUp */:
            case 99 /* NumberRightDown */:
            case 97 /* NumberLeftDown */:
            case 103 /* NumberLeftUp */:
            case 88 /* Key_X */:
            case 88 /* Fire */:
            case 74 /* Key_J */:
            case 74 /* Jump */:
            case 32 /* Space */:
                return true;
        }
        ;
        return false;
    }
    DALEKMOVES.isDaleksKey = isDaleksKey;
    function KeyToDirection(key) {
        switch (key) {
            case 37 /* ArrowLeft */:
                return 1 /* Left */;
            case 40 /* ArrowDown */:
                return 8 /* Bottom */;
            case 38 /* ArrowUp */:
                return 2 /* Top */;
            case 39 /* ArrowRight */:
                return 4 /* Right */;
            case 33 /* ArrowRightUp */:
            case 105 /* NumberRightUp */:
                return 6 /* RightTop */;
            case 34 /* ArrowRightDown */:
            case 99 /* NumberRightDown */:
                return 12 /* RightBottom */;
            case 35 /* ArrowLeftDown */:
            case 97 /* NumberLeftDown */:
                return 9 /* LeftBottom */;
            case 36 /* ArrowLeftUp */:
            case 103 /* NumberLeftUp */:
                return 3 /* LeftTop */;
            case 32 /* Space */:
                return 16 /* StayStill */;
        }
        return 0 /* Undefined */;
    }
    DALEKMOVES.KeyToDirection = KeyToDirection;
})(DALEKMOVES || (DALEKMOVES = {}));
var DALEKOPTIONS;
(function (DALEKOPTIONS) {
    class DalekOptions {
        constructor() {
            this.border = 14;
            this.cellSize = 64;
            this.halfCellSize = 32;
            this.tileSize = 24;
            this.tilesPerCellRow = 4;
            this.tilesPerCellCol = 4;
            this.rowTiles = 20;
            this.colTiles = 20;
            this.showGrid = true;
            this.gridColor = [0, 0, 128, 16];
            this.initialOpponents = 5;
            this.nextLevelOpponents = 2;
            this.activeJumps = 5;
            this.initialBombs = 3;
            this.nextLevelBombs = 2;
            this.showMouseDirection = true;
            this.canvasWidth = 2 * this.border + this.tileSize * this.colTiles;
            this.canvasHeight = 2 * this.border + this.tileSize * this.rowTiles;
            //constructor() {
            //   this.canvasWidth = 2 * this.border + this.tileSize * this.colTiles;
            //    this.canvasHeight = 2 * this.border + this.tileSize * this.rowTiles;
            //}
        }
        ;
    }
    ;
    DALEKOPTIONS.dalekOptions = new DalekOptions();
})(DALEKOPTIONS || (DALEKOPTIONS = {}));
var INTERFACES;
(function (INTERFACES) {
    class ElementPos {
        constructor(row = 0, col = 0) {
            this.row = row;
            this.col = col;
        }
        *[Symbol.iterator]() {
            yield this.row;
            yield this.col;
        }
    }
    INTERFACES.ElementPos = ElementPos;
    ;
    class Point {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        *[Symbol.iterator]() {
            yield this.x;
            yield this.y;
        }
    }
    INTERFACES.Point = Point;
    ;
    // export type Jumping = {
    //     from: Point;
    //     to: Point;
    //     current: Point;
    //     tick: number;
    // }
})(INTERFACES || (INTERFACES = {}));
/// <reference path="./interfaces.ts" />
/// <reference path="./dalek-options.ts" />
var DALEKPLAYER;
(function (DALEKPLAYER) {
    const ACTIVE_JUMPS = DALEKOPTIONS.dalekOptions.activeJumps;
    const INITIAL_BOMBS = DALEKOPTIONS.dalekOptions.initialBombs;
    const NEXTLEVEL_BOMBS = DALEKOPTIONS.dalekOptions.nextLevelBombs;
    class Player {
        constructor(id, active, moveKeys, img) {
            this.id = id;
            this.active = active;
            this.moveKeys = moveKeys;
            this.img = img;
            this.jumps = ACTIVE_JUMPS;
            this.bombs = INITIAL_BOMBS;
        }
        actsOnKey(key) {
            return this.active && this.moveKeys.indexOf(key) >= 0;
        }
        resetJumps() {
            this.jumps = ACTIVE_JUMPS;
        }
        newLevelBombs() {
            this.bombs += NEXTLEVEL_BOMBS;
        }
        jump() {
            if (this.jumps > 0) {
                this.jumps--;
                return true;
            }
            return false;
        }
        throwBomb() {
            if (this.bombs > 0) {
                this.bombs--;
                return true;
            }
            return false;
        }
        ;
        throwHyperBomb() {
            if (this.bombs > 1) {
                this.bombs -= 2;
                return true;
            }
            return false;
        }
        ;
        //public canJump = (): boolean => this.jumps > 0;
        //public canThrowBomb = (): boolean => this.bombs > 0;
        //public canThrowSuperBomb = (): boolean => this.bombs > 1;
        draw(xpos, ypos) {
            image(this.img, xpos, ypos);
            if (!this.active) {
                push();
                fill(255, 255, 255, 128);
                noStroke();
                rect(xpos, ypos, options.tileSize, options.tileSize);
                pop();
            }
        }
        drawScaled(xpos, ypos, side) {
            image(this.img, xpos, ypos, side);
        }
    }
    DALEKPLAYER.Player = Player;
    ;
})(DALEKPLAYER || (DALEKPLAYER = {}));
/// <reference path="./interfaces.ts" />
var DALEKOPPONENT;
(function (DALEKOPPONENT) {
    class GameOpponent {
        constructor(id, canMove, points, img) {
            this.id = id;
            this.canMove = canMove;
            this.points = points;
            this.img = img;
        }
        draw(xpos, ypos) {
            image(this.img, xpos, ypos);
        }
        setDeadImage(img) {
            delete this.img;
            this.img = img;
        }
    }
    DALEKOPPONENT.GameOpponent = GameOpponent;
    class OpponentInfo {
        constructor(points, img) {
            this.points = points;
            this.img = img;
        }
    }
    DALEKOPPONENT.OpponentInfo = OpponentInfo;
    ;
    function infoFromImages(images) {
        return images.map((img, index) => new OpponentInfo(index, img));
    }
    DALEKOPPONENT.infoFromImages = infoFromImages;
})(DALEKOPPONENT || (DALEKOPPONENT = {}));
/// <reference path="./dalek-options.ts" />
/// <reference path="./dalek-moves.ts" />
/// <reference path="./interfaces.ts" />
/// <reference path="./player.ts" />
/// <reference path="./opponent.ts" />
var DALEKS;
(function (DALEKS) {
    const EMPTYSTRING = '';
    const options = DALEKOPTIONS.dalekOptions;
    const isDaleksKey = DALEKMOVES.isDaleksKey;
    var Opponent = DALEKOPPONENT.GameOpponent;
    var Pos = INTERFACES.ElementPos;
    var Point = INTERFACES.Point;
    class Daleks {
        constructor(player, opponentsInfo, jumpImages) {
            this.player = player;
            this.opponentsInfo = opponentsInfo;
            this.jumpImages = jumpImages;
            this.gameLevel = 1;
            this.score = 0;
            this.elements = [];
            this.opponents = [];
            this.playerJump = null;
            this.active = () => this.player.active;
            this.MaxPoint = new Point(options.rowTiles * options.tileSize + options.border, options.colTiles * options.tileSize + options.border);
            this.initializeGame();
        }
        gameBombs() {
            return this.player ? this.player.bombs : 0;
        }
        gameJumps() {
            return this.player ? this.player.jumps : 0;
        }
        endGame(player, lastPos) {
            player.active = false;
            this.clearElement(player.id);
            this.setElement(lastPos, player);
        }
        initializeGame() {
            delete this.opponents;
            delete this.elements;
            this.gameLevel = 1;
            this.score = 0;
            this.createOpponnets();
            this.initializePositions();
            this.startJumping(new Pos(10, 10), this.terrainPos(this.player));
        }
        createOpponnets() {
            this.opponents = [];
            this.elements = [];
            for (let level = this.gameLevel; level > 0; level--) {
                this.createLevelOpponnets(level);
            }
        }
        createLevelOpponnets(level) {
            const index = min(level, this.opponentsInfo.length - 1);
            const items = level > 1 ? options.nextLevelOpponents : options.initialOpponents;
            let initialId = this.opponents.length;
            for (let i = 0; i < items; i++) {
                const opp = new Opponent('opp' + initialId++, true, this.opponentsInfo[index].points, this.opponentsInfo[index].img);
                this.opponents.push(opp);
            }
        }
        initializePositions() {
            this.randomPlayerPosition(this.player);
            this.initializeOpponentPositions();
        }
        initializeOpponentPositions() {
            for (let i = 0; i < this.opponents.length; i++) {
                this.randomPosition(this.opponents[i]);
            }
        }
        randomPlayerPosition(player) {
            if (!player.active)
                return;
            this.randomPosition(player);
        }
        randomPosition(element) {
            const pos = this.randomMove();
            this.setElement(pos, element);
        }
        randomMove() {
            do {
                const pos = new Pos(floor(random(options.rowTiles)), floor(random(options.colTiles)));
                if (!this.collides(pos)) {
                    return pos;
                }
            } while (true);
        }
        getPositionedOpponent(pos) {
            const elem = this.elements.find(el => el.pos.row == pos.row && el.pos.col == pos.col);
            if (!elem)
                return;
            const opp = this.opponents.find(opp => opp.id == elem.element.id);
            return opp;
        }
        getElement(elem) {
            return this.elements.find(el => el.element.id == elem.id);
        }
        setElement(pos, elem) {
            this.elements.push({ pos, element: elem });
        }
        clearElement(id) {
            const index = this.elements.findIndex(el => el.element.id == id);
            if (index >= 0) {
                this.elements.splice(index, 1);
            }
        }
        move(key, action) {
            if (!this.player.active)
                return;
            if (!isDaleksKey(key))
                return;
            const loopGameLevel = action == 1 /* Control */ && key == 32 /* Space */;
            do {
                this.playerJump = null;
                this.movePlayer(this.player, key);
                if (!this.player.active) {
                    //game ends
                    return;
                }
                this.moveOpponents(this.player);
            } while (!this.checkLevelEnd() && loopGameLevel);
        }
        movePlayer(player, key) {
            const elem = this.getElement(player);
            if (!elem)
                return;
            const newPos = this.applyMove(elem.pos, key);
            this.clearElement(elem.element.id);
            if (this.collides(newPos)) {
                this.endGame(player, newPos);
            }
            else {
                this.setElement(newPos, player);
            }
        }
        moveOpponents(player) {
            const elem = this.getElement(player);
            if (!elem)
                return;
            for (let i = 0; i < this.opponents.length; i++) {
                const opp = this.opponents[i];
                if (!opp.canMove)
                    continue;
                const oppElem = this.getElement(opp);
                if (!oppElem)
                    continue;
                this.clearElement(opp.id);
                const newPos = this.moveTowards(oppElem.pos, elem.pos);
                if (this.collides(newPos)) {
                    if (this.isSamePosition(elem.pos, newPos)) { //the player is in trouble
                        this.endGame(player, newPos);
                        return;
                    }
                    this.applyCollision(newPos, opp);
                }
                else {
                    this.setElement(newPos, opp);
                }
            }
        }
        isSamePosition(left, right) {
            return left.row == right.row && left.col == right.col;
        }
        applyCollision(pos, opp) {
            const prevOpp = this.getPositionedOpponent(pos);
            if (!prevOpp)
                return;
            prevOpp.canMove = false;
            prevOpp.points += opp.points;
            prevOpp.setDeadImage(this.opponentsInfo[0].img);
            this.score += prevOpp.points;
            opp.canMove = false;
            opp.points = 0;
            opp.setDeadImage(this.opponentsInfo[0].img);
        }
        moveTowards(from, to) {
            const local = new Pos(...from); //make a copy, since the ref changes
            if (from.row < to.row)
                local.row++;
            else if (from.row > to.row)
                local.row--;
            if (from.col < to.col)
                local.col++;
            else if (from.col > to.col)
                local.col--;
            return local;
        }
        applyMove(pos, key) {
            if (key == 32 /* Space */) {
                return pos;
            }
            if (key == 74 /* Jump */) {
                if (this.player.jump()) {
                    const next = this.randomMove();
                    this.startJumping(pos, next);
                    return next;
                }
            }
            let { row, col } = pos; //make a copy
            const move = DALEKMOVES.KeyToDirection(key);
            if (move & 2 /* Top */)
                row--;
            if (move & 8 /* Bottom */)
                row++;
            if (move & 1 /* Left */)
                col--;
            if (move & 4 /* Right */)
                col++;
            return this.applyBounds(new Pos(row, col));
        }
        applyBounds(pos) {
            let { row, col } = pos;
            if (row < 0)
                row = 0;
            if (col < 0)
                col = 0;
            if (row >= options.rowTiles)
                row = options.rowTiles - 1;
            if (col >= options.colTiles)
                col = options.colTiles - 1;
            return new Pos(row, col);
        }
        collides(pos) {
            const index = this.elements.findIndex(e => e.pos.col == pos.col && e.pos.row == pos.row);
            return index >= 0;
        }
        checkLevelEnd() {
            if (!this.active())
                return true;
            if (this.activeOpponents())
                return false;
            const beginPos = new Pos(...this.terrainPos(this.player));
            delete this.opponents;
            delete this.elements;
            this.gameLevel++;
            this.player.newLevelBombs();
            this.player.resetJumps();
            this.createOpponnets();
            this.initializePositions();
            this.startJumping(beginPos, this.terrainPos(this.player));
            return true;
        }
        activeOpponents() {
            return this.opponents.some(opp => opp.canMove);
        }
        draw() {
            for (let i = 0; i < this.opponents.length; i++) {
                this.drawElement(this.opponents[i]);
            }
            if (!this.playerJump) {
                this.drawElement(this.player);
            }
            else {
                this.flyJumpingPlayer();
            }
        }
        startJumping(from, to) {
            if (!this.jumpImages)
                return;
            if (this.jumpImages.length == 0)
                return;
            this.playerJump = [];
            const jumpFrom = this.terrainPoint(from);
            const jumpTo = this.terrainPoint(to);
            const ticks = floor(frameRate() * 0.7);
            const x1 = jumpFrom.x, y1 = jumpFrom.y;
            const x2 = jumpTo.x, y2 = jumpTo.y;
            //bezier(x1, y1, x2, y1, x1, y2, x2, y2);
            //bezier(x1, y1, x1, y2, x2, y1, x2, y2);
            this.playerJump.push({ pt: new Point(x1, y1), rate: 0, img: this.jumpImages[0] });
            for (let i = 1; i < ticks; i++) {
                const t = i / ticks;
                const x = bezierPoint(x1, x2, x1, x2, t);
                const y = bezierPoint(y1, y1, y2, y2, t);
                const rate = floor(100 * sin(map(i, 0, ticks, 0, PI)));
                this.playerJump.push({ pt: new Point(x, y), rate, img: this.jumpImages[i] });
            }
            this.playerJump.push({ pt: new Point(x2, y2), rate: 0, img: this.jumpImages[ticks] });
        }
        flyJumpingPlayer() {
            if (!this.playerJump)
                return;
            if (this.playerJump.length == 0)
                return;
            const jump = this.playerJump.splice(0, 1);
            this.drawJump(jump[0]);
            if (this.playerJump.length == 0) {
                this.playerJump = null;
            }
        }
        drawJump(jump) {
            const { x, y } = jump.pt;
            const side = floor(options.tileSize * (jump.rate / 100) + options.tileSize);
            image(jump.img, x, y, side, side);
            this.player.drawScaled(x, y, side);
        }
        playerPos() {
            const elem = this.getElement(this.player);
            if (!elem)
                return new Point();
            const xplus = random([0, options.tileSize]);
            const yplus = random([0, options.tileSize]);
            const { x, y } = this.terrainPoint(elem.pos);
            return new Point(x + xplus, y + yplus);
        }
        drawElement(id) {
            const elem = this.getElement(id);
            if (!elem)
                return;
            const { x, y } = this.terrainPoint(elem.pos);
            elem.element.draw(x, y);
        }
        terrainPos(id) {
            const elem = this.getElement(id);
            if (!elem)
                return new Pos();
            return elem.pos;
        }
        terrainPoint(pos) {
            const x = options.border + pos.col * options.tileSize;
            const y = options.border + pos.row * options.tileSize;
            return new Point(x, y);
        }
        mousePos(pt) {
            const [x, y] = [...this.applyMouseBounds(pt)];
            const row = x;
            const col = y;
            return new Pos(row, col);
        }
        applyMouseBounds(pt) {
            let { x, y } = pt;
            if (x < options.border)
                x = options.border;
            if (y < options.border)
                y = options.border;
            if (x >= this.MaxPoint.x)
                x = this.MaxPoint.x;
            if (y >= this.MaxPoint.y)
                y = this.MaxPoint.y;
            return new Point(x, y);
        }
    }
    DALEKS.Daleks = Daleks;
    ;
})(DALEKS || (DALEKS = {}));
;
var DUST;
(function (DUST) {
    class Particle {
        constructor(x, y, c, moveRange = 1, minPoint = 2, maxPoint = 4) {
            this.x = x;
            this.y = y;
            this.c = c;
            this.moveRange = moveRange;
            this.minPoint = minPoint;
            this.maxPoint = maxPoint;
            this.ticks = 0;
        }
        draw() {
            push();
            stroke(this.c);
            strokeWeight(floor(random(this.minPoint, this.maxPoint)));
            point(this.x, this.y);
            pop();
        }
        tick() {
            this.ticks++;
            this.x += floor(random(-this.moveRange, this.moveRange));
            this.y += floor(random(-this.moveRange, this.moveRange));
            this.c.setAlpha(alpha(this.c) - this.ticks);
            return this.ticks;
        }
    }
    ;
    class Dust {
        constructor(x1, y1, x2, y2, alive, moveRange = 1, minPoint = 2, maxPoint = 4) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            this.alive = alive;
            this.moveRange = moveRange;
            this.minPoint = minPoint;
            this.maxPoint = maxPoint;
            this.granes = [];
        }
        draw() {
            this.granes.forEach(part => part.draw());
        }
        tick(items, pt1, pt2) {
            const xx1 = pt1 ? pt1.x : this.x1;
            const yy1 = pt1 ? pt1.y : this.y1;
            const xx2 = pt2 ? pt2.x : pt1 ? pt1.x : this.x2;
            const yy2 = pt2 ? pt2.y : pt1 ? pt1.y : this.y2;
            const dust = items ? items : 5;
            const newDust = floor(random(0, dust));
            this.tickIt(newDust, xx1, yy1, xx2, yy2);
        }
        tickIt(items, x1, y1, x2, y2) {
            for (let i = 0; i < items; i++) {
                const part = new Particle(floor(random(x1, x2)), floor(random(y1, y2)), color(floor(random(1, 255)), floor(random(1, 255)), floor(random(1, 255)), floor(random(64, 255))), this.moveRange, this.minPoint, this.maxPoint);
                this.granes.push(part);
            }
            this.granes = this.granes.filter(part => part.tick() < this.alive);
        }
        reset() {
            this.granes = [];
        }
    }
    DUST.Dust = Dust;
})(DUST || (DUST = {}));
/// <reference path="./dalek-options.ts" />
var TERRAIN;
(function (TERRAIN) {
    const options = DALEKOPTIONS.dalekOptions;
    class Terrain {
        constructor(corners, borders, grass) {
            this.corners = corners;
            this.borders = borders;
            this.grass = grass;
            this.terrain = createGraphics(options.canvasWidth, options.canvasHeight);
            //2 * options.border + options.tileSize * options.rowTiles);
            this.generateTerrain(corners, borders, grass);
        }
        generateTerrain(corners, borders, grass) {
            this.terrain.background(0);
            this.drawTop(corners, borders);
            this.drawLines(grass, borders);
            this.drawBottom(corners, borders);
            this.drawGrid();
        }
        drawTop(corners, borders) {
            const maxTilesWidth = options.tileSize * options.colTiles;
            this.terrain.image(corners[0], 0, 0);
            for (let i = options.border; i < maxTilesWidth; i += options.cellSize) {
                this.terrain.image(borders[0], i, 0);
            }
            this.terrain.image(corners[1], maxTilesWidth + options.border, 0);
        }
        drawBottom(corners, borders) {
            const maxTilesWidth = options.tileSize * options.colTiles;
            const bottomHeight = options.tileSize * options.rowTiles + options.border;
            this.terrain.image(corners[3], 0, bottomHeight);
            for (let i = options.border; i < maxTilesWidth; i += options.cellSize) {
                this.terrain.image(borders[3], i, bottomHeight);
            }
            this.terrain.image(corners[2], maxTilesWidth + options.border, bottomHeight);
        }
        drawLines(grass, borders) {
            let lineHeight = options.border;
            for (let row = 0; row < options.rowTiles; row++) {
                this.drawLine(grass, borders, lineHeight);
                lineHeight += options.cellSize;
            }
        }
        drawLine(grass, borders, lineHeight) {
            const maxTilesWidth = options.tileSize * options.colTiles;
            this.terrain.image(borders[1], 0, lineHeight);
            for (let i = options.border; i < maxTilesWidth; i += options.cellSize) {
                this.terrain.push();
                this.terrain.translate(i + options.halfCellSize, lineHeight + options.halfCellSize);
                this.terrain.imageMode(CENTER);
                switch (random([1, 2, 3, 4])) {
                    case 1: break;
                    case 2:
                        this.terrain.rotate(HALF_PI);
                        break;
                    case 3:
                        this.terrain.rotate(PI);
                        break;
                    case 4:
                        this.terrain.rotate(PI + HALF_PI);
                        break;
                }
                this.terrain.image(random(grass), 0, 0);
                this.terrain.pop();
            }
            this.terrain.image(borders[2], maxTilesWidth + options.border, lineHeight);
        }
        drawGrid() {
            if (!options.showGrid)
                return;
            const lineEnd = options.canvasWidth - options.border;
            this.terrain.strokeWeight(1);
            this.terrain.stroke(options.gridColor);
            for (let i = 0, height = options.border; i <= options.rowTiles; i++, height += options.tileSize) {
                this.terrain.line(options.border, height, lineEnd, height);
            }
            for (let i = 0, width = options.border; i <= options.colTiles; i++, width += options.tileSize) {
                this.terrain.line(width, options.border, width, lineEnd);
            }
        }
        draw() {
            image(this.terrain, 0, 0);
            //background(this.terrain);
        }
    }
    TERRAIN.Terrain = Terrain;
    ;
})(TERRAIN || (TERRAIN = {}));
/// <reference path="./dalek-options.ts" />
/// <reference path="./dalek-moves.ts" />
/// <reference path="./daleks.ts" />
/// <reference path="./terrain.ts" />
/// <reference path="./dust.ts" />
/// <reference path="./opponent.ts" />
const KEY_SHIFT = 16;
const KEY_CONTROL = 17;
const KEY_ALT = 18;
const options = DALEKOPTIONS.dalekOptions;
let grass;
let corners;
let borders;
let opponents;
let jumpImages;
let redPlayer;
let bluePlayer;
let terrain;
let daleks;
//let theCanvas:  HTMLCanvasElement;
let infoTicks = 0;
let dust;
let playerDust;
let score = 0;
let highScore = 0;
let level = 1;
let jumps = 0;
let bombs = 0;
function preload() {
    grass = preloadGrassImages();
    corners = preloadCornerImages();
    borders = preloadBorderImages();
    opponents = preloadOpponentImages();
    jumpImages = preloadJumpImages();
    redPlayer = loadImage("./images/red-32-gimp-24be.png");
    bluePlayer = loadImage("./images/blue-32-gimp-24bbe.png");
}
function setup() {
    let cnv = createCanvas(options.canvasWidth, options.canvasHeight);
    cnv.id('johnCanvas');
    frameRate(10);
    terrain = new TERRAIN.Terrain(corners, borders, grass);
    const theCanvas = document.getElementById('johnCanvas');
    let elem = document.getElementById('new-game');
    elem.addEventListener('click', (event) => { newGame(); theCanvas.focus(); loop(); });
    dust = new DUST.Dust(options.border, options.border, options.canvasWidth, options.canvasHeight, 30);
    playerDust = new DUST.Dust(options.border, options.border, options.canvasWidth, options.canvasHeight, 5, 2, 3, 6);
    displayGameInfo();
}
function draw() {
    terrain.draw();
    dust.draw();
    dust.tick();
    if (daleks) {
        playerDust.draw();
        playerDust.tick(2, daleks.playerPos());
        daleks.draw();
        if (!daleks.active())
            DrawInfo(infoTicks++);
        else
            infoTicks = 0;
    }
    else {
        DrawInfo(infoTicks++);
    }
}
function mouseClicked() {
    if (!daleks || !daleks.active()) {
        newGame();
        // loop();
    }
}
function keyPressed() {
    const token = keyIsDown(KEY_ALT) ? 4 /* Shift */ :
        keyIsDown(KEY_SHIFT) ? 4 /* Shift */ :
            keyIsDown(KEY_CONTROL) ? 1 /* Control */ :
                0 /* Undefined */;
    daleks.move(keyCode, token);
    playerDust.reset();
    displayGameInfo();
    //loop();
}
function keyReleased() {
    //noLoop();
}
function newGame() {
    terrain = new TERRAIN.Terrain(corners, borders, grass);
    daleks = new DALEKS.Daleks(new DALEKPLAYER.Player("red", true, [38 /* ArrowUp */, 40 /* ArrowDown */, 37 /* ArrowLeft */, 39 /* ArrowRight */,
        36 /* ArrowLeftUp */, 35 /* ArrowLeftDown */, 33 /* ArrowRightUp */, 34 /* ArrowRightDown */,
        74 /* Jump */, 88 /* Fire */], redPlayer), DALEKOPPONENT.infoFromImages(opponents), jumpImages);
    playerDust.reset();
    displayGameInfo();
}
function DrawInfo(tick) {
    push();
    noStroke();
    fill(255, 255, 255, 96);
    rect(0, 0, options.canvasWidth, options.canvasHeight);
    fill(8, 64, 32);
    textFont('Arial', 16);
    const s = "Πατήστε με το ποντίκι για να αρχίσετε ...";
    const w = textWidth(s);
    const tsize = textSize();
    let size = tsize << 1;
    if (tick < tsize) {
        size -= tick;
    }
    else {
        size -= tsize;
    }
    text(s, (options.canvasWidth - w) >> 1, options.canvasHeight - tsize - size, options.canvasWidth, options.canvasHeight);
    pop();
}
function displayGameInfo() {
    if (daleks) {
        score = daleks.score;
        level = daleks.gameLevel;
        jumps = daleks.gameJumps();
        bombs = daleks.gameBombs();
    }
    highScore = max(score, highScore);
    showInfo('level', level);
    showInfo('jumps', jumps);
    showInfo('bombs', bombs);
    showInfo('score', score);
    showInfo('high-score', highScore);
}
function showInfo(elementId, info) {
    const elt = document.getElementById(elementId);
    elt.innerHTML = `${info}`;
}
function preloadGrassImages() {
    let grass1 = loadImage("./images/grass_00.png");
    let grass2 = loadImage("./images/grass_01.png");
    let grass3 = loadImage("./images/grass_02.png");
    let grass4 = loadImage("./images/grass_03.png");
    let grass5 = loadImage("./images/grass_04.png");
    let grass6 = loadImage("./images/grass_05b.png");
    let grass7 = loadImage("./images/grass_06b.png");
    let grass8 = loadImage("./images/grass_07b.png");
    return [
        grass1, grass1, grass1,
        grass2, grass3, grass4, grass5, grass6,
        grass1, grass2, grass3,
        grass7,
        grass4, grass5,
        grass1,
        grass8,
        grass1, grass2, grass4
    ];
}
function preloadCornerImages() {
    let corner0 = loadImage("./images/border-00.png");
    let corner1 = loadImage("./images/border-01.png");
    let corner2 = loadImage("./images/border-02.png");
    let corner3 = loadImage("./images/border-03.png");
    return [corner0, corner1, corner2, corner3];
}
function preloadBorderImages() {
    let border0 = loadImage("./images/border-top.png");
    let border1 = loadImage("./images/border-left.png");
    let border2 = loadImage("./images/border-right.png");
    let border3 = loadImage("./images/border-bottom.png");
    return [border0, border1, border2, border3];
}
function preloadOpponentImages() {
    let opponent0 = loadImage("./images/dead-dalek.png");
    let opponent1 = loadImage("./images/wasp_01.png");
    let opponent2 = loadImage("./images/wasp_02.png");
    let opponent3 = loadImage("./images/wasp_03.png");
    let opponent4 = loadImage("./images/wasp_04.png");
    return [opponent0, opponent1, opponent2, opponent3, opponent4];
}
function preloadJumpImages() {
    let jump0 = loadImage("./images/onJump_01.png");
    let jump1 = loadImage("./images/onJump_02.png");
    let jump2 = loadImage("./images/onJump_03.png");
    let jump3 = loadImage("./images/onJump_04.png");
    let jump4 = loadImage("./images/onJump_05.png");
    let jump5 = loadImage("./images/onJump_06.png");
    let jump6 = loadImage("./images/onJump_07.png");
    return [jump0, jump1, jump2, jump3, jump3, jump4, jump5, jump6];
}
