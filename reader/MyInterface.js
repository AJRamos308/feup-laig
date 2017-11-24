 /**
 * MyInterface class, creating a GUI interface.
 * @constructor
 */
function MyInterface(availableShaders) {
	//call CGFinterface constructor
	this.availableShaders = availableShaders;


    CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui

    this.gui = new dat.GUI();


    return true;
};

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 */
MyInterface.prototype.addLightsGroup = function(lights) {
    var group = this.gui.addFolder("Lights");
    group.open();

    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;

    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            group.add(this.scene.lightValues, key);
        }
    }
};

/**
 * Adds a folder containing the IDs of the selectable nodes passed as parameter.
 */
MyInterface.prototype.addSelectablesGroup = function(selectables) {
	this.scene.selectableValues = {};
	for (let i = 0; i < selectables.length; i++) {
		const selectable = selectables[i];
		this.scene.selectableValues[selectable] = false;

	}

    this.shadersFolder = this.gui.addFolder("Shaders");
	this.shadersFolder.open();

    for (var key in selectables) {
        if (selectables.hasOwnProperty(key)) {
            this.shadersFolder.add(this.scene.selectableValues, selectables[key]);
        }
    }
};

MyInterface.prototype.addShaderOptions = function(){
	//this.availableShaders
	//automatically update selectedShader
	this.shadersFolder.add(this.scene, 'selectedShader', this.availableShaders).name('Shaders: ');


	this.shadersFolder.addColor(this.scene, 'selectionColor');

	obj=this;
	//automatically update wireframe
	this.shadersFolder.add(this.scene, 'wireframe');
};