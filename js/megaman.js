var currentPlayer;
var jumpTimer = 0;
var currentPower = 1;
var mapaCutman;
window.onload = function() {

    //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
    //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
    //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

    var game = new Phaser.Game(504, 474, Phaser.AUTO, '', { preload: preload, create: create, update:update });
    var map;
    var layer;

    function preload () {
        console.log('preload');
        // this.load.image('mapaCutman', 'images/enemigos/cutman/mapa.png');
        // this.load.image('mapaCutman2', 'images/enemigos/cutman/mapa2.png');
        this.load.tilemap('map', 'images/enemigos/cutman/mapa-cutman-grande.json', null, Phaser.Tilemap.TILED_JSON)//
        this.load.image('map', 'images/enemigos/cutman/cutman-map-sprite-grande.png')
        //this.load.tileset('level2', 'cutman-map-sprite-grande.png', 32, 32);
        this.load.spritesheet('megaman', 'images/personajes/megaman.png', 32, 31);
        //this.load.image('vacio', 'images/items/vacio.png');
        console.log('preload ok');
    }	
    function create () {
        console.log('create');
        map = game.add.tilemap('map');
        console.log(map);
        map.addTilesetImage('map');
        map.setCollisionBetween(1, 5);
        layer = map.createLayer('Capa de Patrones 1');
        layer.resizeWorld();

        game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.world.setBounds(0,0,3344, 2153);//mapaCutman
        //game.world.setBounds(0,0,6688, 4306);//mapaCutman2
        game.physics.arcade.gravity.y = 800;

        //mapaCutman = game.add.sprite(0, 0, 'mapaCutman2').anchor.set(0);

        //a que velcidad caerá
        game.time.desiredFps = 30;
        //cuanta presion gravitacional
        var Megaman = [];
        //cargo los sprite
        var megaman = game.add.sprite(0, 4208, 'megaman');
        megaman.frame = 3;//frame inicial
        megaman.animations.add('run1', [6, 7, 8, 7], 8, true);//animacion de correr
        megaman.animations.add('jump1', [9, 10], 1, false);//animacion de salto
        megaman.animations.add('stand1', [3], 1, false);//parado

        megaman.animations.add('run2', [33, 34, 35, 34], 8, true);//animacion de correr
        megaman.animations.add('jump2', [36, 37], 1, false);//animacion de salto
        megaman.animations.add('stand2', [30], 1, false);//parado

        megaman.animations.add('run3', [60, 61, 62, 61], 8, true);//animacion de correr
        megaman.animations.add('jump3', [63, 64], 1, false);//animacion de salto
        megaman.animations.add('stand3', [57], 1, false);//parado

        megaman.animations.add('run4', [87, 88, 89, 88], 8, true);//animacion de correr
        megaman.animations.add('jump4', [90, 91], 1, false);//animacion de salto
        megaman.animations.add('stand4', [84], 1, false);//parado

        megaman.anchor.x = 0.5;//centro el personaje en eje x
        megaman.anchor.y = 0.5;//centro personaje en eje y

        megaman.scale.x = 2;
        megaman.scale.y = 2;
        // mapaCutman.scale.x = 2;
        // mapaCutman.scale.y = 2;

        console.log('megaman');
        console.log(megaman);

        //cargo los botones
        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        oneKey = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        twoKey = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        threeKey = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        fourKey = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        fiveKey = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
        sixKey = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
        sevenKey = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
        eightKey = game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);

        //seteo mi jugador
        currentPlayer = megaman;
        //habilito lq fisicq en el objeto
        game.physics.enable(currentPlayer);
        //indico cuanto rebota al impactar sobre el suelo
        currentPlayer.body.bounce.y = 0;
        //indico si luego de impactar el suelo, se apoya en el o sigue de largo
        currentPlayer.body.collideWorldBounds = true;
        //camara que lo sigue
        game.camera.follow(currentPlayer);//3344 2153




        // game.platforms = game.add.physicsGroup();

        // game.platforms.create(0, 2103, 'vacio');.

        // game.platforms.setAll('body.allowGravity', false);
        // game.platforms.setAll('body.immovable', true);
        // game.platforms.setAll('body.velocity.x', 100);




    }
    function update(){
        game.physics.arcade.collide(currentPlayer, layer);
        function CapturarSalto(){
            if (upKey.isDown && game.time.now > jumpTimer) { return true;}else{return false;}
        }
        function CapturarSuelo(personaje){
            return personaje.body.onFloor();
        }
        function Saltar(personaje){
            personaje.animations.play('jump'+currentPower);
            personaje.body.velocity.y = -200;
            jumpTimer = game.time.now + 750;
        }
        function Correr(personaje){
            personaje.animations.play('run'+currentPower);
        }
        if (leftKey.isDown)
        {
            currentPlayer.scale.x = -2;
            currentPlayer.x-=6;
            if (CapturarSalto()) { Saltar(currentPlayer);}else{if (CapturarSuelo(currentPlayer)) {Correr(currentPlayer);}}// && game.time.now > jumpTimer        
        }
        else if (rightKey.isDown)
        {
            currentPlayer.scale.x = 2;
            currentPlayer.x+=6;
            if (CapturarSalto()) { Saltar(currentPlayer);}else{if (CapturarSuelo(currentPlayer)) {Correr(currentPlayer);}}// && game.time.now > jumpTimer  
        }
        else if (upKey.isDown)
        {
            Saltar(currentPlayer);
        }
        else
        {
            if (CapturarSuelo(currentPlayer)) { currentPlayer.animations.play('stand'+currentPower);}
            
        }

        if (oneKey.isDown) {currentPower = 1;}
        if (twoKey.isDown) {currentPower = 2;}
        if (threeKey.isDown) {currentPower = 3;}
        if (fourKey.isDown) {currentPower = 4;}
        // console.log('camara y');
        // console.log(game.camera.y);
        // console.log('player y');
        // console.log(currentPlayer.position.y);
        // console.log('camara x');
        // console.log(game.camera.x);
        // console.log('player x');
        // console.log(currentPlayer.position.x);
    }
};