/**
 * MyInterface class, creating a GUI interface.
 * @constructor
 */
function MyInterface() {
    //call CGFinterface constructor
    this.availableShaders = {
        'Main Shader': 0,
        'Flat Shading': 1,
        'Simple texturing': 2,
    };

    this.availableScenes = {
        'Main Room': 1,
        'Forest': 2,
    };

    CGFinterface.call(this);
}

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    CGFinterface.prototype.init.call(this, application); // call CGFinterface init

    // init GUI. For more information on the methods, check: http://workshop.chromeexperiments.com/examples/gui

    this.gui = new dat.GUI();

    //game folders
    this.gameFolder = this.gui.addFolder('Game Settings');
    this.gameFolder.open();
    this.gameFolder.add(this.scene.server, "gameType", MyServer.gameTypes).name('Game Type');
    this.gameFolder.add(this.scene.server, "botLevel1", MyServer.botLevels).name('Bot 1 Level');
    this.gameFolder.add(this.scene.server, "botLevel2", MyServer.botLevels).name('Bot 2 Level');
    this.gameFolder.add(this.scene, "selectedScene", this.availableScenes).name('Selected Scene');
	this.gameFolder.add(this.scene, "countdownSeconds", 10, 99).name('Turn Duration');
	this.gameFolder.add(this.scene, "startNewGame").name('Start New Game');

    return true;
};

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 */
MyInterface.prototype.addLightsGroup = function(lights) {
    var group = this.gui.addFolder("Lights");
    // group.open();

    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;

    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            group.add(this.scene.lightValues, key).name('Light ' + key.substring(5, key.length));
        }
    }
};

/**
 * Adds a folder containing the IDs of the selectable nodes passed as parameter.
 */
/* MyInterface.prototype.addShadersGroup = function(selectables) {
    this.shadersFolder = this.gui.addFolder("Shaders Options");
	this.shadersFolder.open();

	this.shadersFolder.add(this.scene, 'selectedSelectable', selectables).name('Selectables: ');
	this.shadersFolder.add(this.scene, 'selectedShader', this.availableShaders).name('Shaders: ');
	this.shadersFolder.addColor(this.scene, 'selectionColor').name('Selection Color: ');
	this.shadersFolder.add(this.scene,'scaleFactor', -10.0, 10.0);
	this.shadersFolder.add(this.scene, 'wireframe').name('Wireframe');
}; */