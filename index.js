kaboom({
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
  clearColor: [0, 0, 0, 1],
});

// movement constants
const MOVE_SPEED = 120;
const JUMP_FORCE = 350;

loadRoot('./images/');
loadSprite('coin', 'wbKxhcd.png');
loadSprite('evil-shroom', 'KPO3fR9.png');
loadSprite('brick', 'pogC9x5.png');
loadSprite('block', 'M6rwarW.png');
loadSprite('mario', 'Wb1qfhK.png');
loadSprite('mushroom', '0wMd92p.png');
loadSprite('surprise', 'gesQ1KP.png');
loadSprite('unboxed', 'bdrLpi6.png');
loadSprite('pipe-top-left', 'ReTPiWY.png');
loadSprite('pipe-top-right', 'hj2GK4n.png');
loadSprite('pipe-bottom-left', 'c1cYSbt.png');
loadSprite('pipe-bottom-right', 'nqQ79eI.png');

loadSprite('blue-block', 'fVscIbn.png');
loadSprite('blue-brick', '3e5YRQd.png');
loadSprite('blue-steel', 'gqVoI2b.png');
loadSprite('blue-evil-shroom', 'SvV4ueD.png');
loadSprite('blue-surprise', 'RMqCc1G.png');

scene('game', () => {
  layers(['bg', 'obj', 'ui'], 'obj');

  const map = [
    '                                                   ',
    '                                                   ',
    '                                                   ',
    '                                                   ',
    '                                                   ',
    '                                                   ',
    '                                                   ',
    '                                                   ',
    '                                                   ',
    '                                                   ',
    '                                                   ',
    '                                                   ',
    '                                                   ',
    '                                                   ',
    '                                                   ',
    '                                                   ',
    '             %   =*=%=                             ',
    '                                                   ',
    '                                       -+          ',
    '                         ^    ^        ()          ',
    '  =======================================  ========',
  ];

  const levelCfg = {
    height: 20,
    width: 20,
    '=': [sprite('block'), solid()],
    $: [sprite('coin')],
    '%': [sprite('surprise'), solid(), 'coin-surprise'],
    '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
    '}': [sprite('unboxed'), solid()],
    '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
    ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
    '-': [sprite('pipe-top-left'), solid(), scale(0.5)],
    '+': [sprite('pipe-top-right'), solid(), scale(0.5)],
    '^': [sprite('evil-shroom'), solid()],
    '#': [sprite('mushroom'), solid()],
  };

  const gameLevel = addLevel(map, levelCfg);

  const score = 0;
  const scoreLabel = add([
    text(score),
    pos(950, 30),
    scale(4),
    layer('ui'),
    { value: score },
  ]);

  const levelName = 'test';
  add([text(`Level: ${levelName}`), pos(10, 10)]);

  const player = add([
    sprite('mario'),
    solid(),
    pos(80, 0),
    body(),
    origin('bot'),
  ]);

  // player movements
  // left
  keyDown('left', () => {
    player.move(-MOVE_SPEED, 0);
  });
  // right
  keyDown('right', () => {
    player.move(MOVE_SPEED, 0);
  });
  // jump
  keyPress('space', () => {
    if (player.grounded()) {
      player.jump(JUMP_FORCE);
    }
  });
});

start('game');
