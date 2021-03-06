/**
 * Rectangle
 * @param scene CGFscene where the Rectangle will be displayed
 * @param left_top_x x coordinate of the left top vertex
 * @param left_top_y y coordinate of the left top vertex
 * @param right_bottom_x x coordinate of the right bottom vertex
 * @param right_bottom_y y coordinate of the right bottom vertex
 * @constructor
 */
function Rectangle(scene, left_top_x, left_top_y, right_bottom_x, right_bottom_y) {
    CGFobject.call(this, scene);
    if (typeof left_top_x == 'undefined' || typeof left_top_y == 'undefined' || typeof right_bottom_x == 'undefined' || typeof right_bottom_y == 'undefined') {
        this.left_top_x = -1; 		this.left_top_y = 1;
        this.right_bottom_x = 1;   	this.right_bottom_y = -1;
    } else {
        this.left_top_x = left_top_x; this.left_top_y = left_top_y;
        this.right_bottom_x = right_bottom_x; this.right_bottom_y = right_bottom_y;
    }
    if (typeof minS == 'undefined' || typeof maxS == 'undefined' || typeof minT == 'undefined' || typeof maxT == 'undefined') {
        this.minS = 0;        this.maxS = 1;
        this.minT = 0;        this.maxT = 1;
    } else {   this.minS = minS; this.maxS = maxS; this.minT = minT; this.maxT = maxT;   }
    this.initBuffers();
};

Rectangle.prototype = Object.create(CGFobject.prototype);
Rectangle.prototype.constructor = Rectangle;

/**
 * Initializes the Rectangle buffers (vertices, indices, normals and texCoords)
 */
Rectangle.prototype.initBuffers = function() {
    this.indices = [];
    this.indicesTris = [];
    this.indicesLines = [];

    this.vertices = [
        this.left_top_x, this.right_bottom_y, 0,
        this.right_bottom_x, this.right_bottom_y, 0,
        this.left_top_x, this.left_top_y, 0,
        this.right_bottom_x, this.left_top_y, 0
    ];

    this.indicesTris = [
        0, 1, 2,
        2, 1, 3
    ];

    this.normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ];

    this.texCoords = [
        this.minS, this.maxT,
        this.maxS, this.maxT,
        this.minS, this.minT,
        this.maxS, this.minT
    ];

    this.createIndicesLines();
    this.setFillMode();
    this.initGLBuffers();
};

/**
 * Updates the Rectangle amplification factors
 * @param amplif_s s domain amplification factor
 * @param amplif_t t domain amplification factor
 */
Rectangle.prototype.setAmplifFactor = function(amplif_s, amplif_t) {
    var dist_s = Math.abs(this.left_top_x - this.right_bottom_x);
    var dist_t = Math.abs(this.left_top_y - this.right_bottom_y);

    this.texCoords = [
        this.minS, this.maxT * dist_t / amplif_t,
        this.maxS * dist_s / amplif_s, this.maxT * dist_t / amplif_t,
        this.minS, this.minT,
        this.maxS * dist_s / amplif_s, this.minT
    ];

    this.updateTexCoordsGLBuffers();
};


Rectangle.prototype.createIndicesLines = function() {
    ntris = this.indicesTris.length / 3;
    this.indicesLines = new Array(ntris * 6);
    for (var i = 0; i < ntris; i++) {
        this.indicesLines[i * 6] = this.indicesTris[i * 3];
        this.indicesLines[i * 6 + 1] = this.indicesTris[i * 3 + 1];

        this.indicesLines[i * 6 + 2] = this.indicesTris[i * 3 + 1];
        this.indicesLines[i * 6 + 3] = this.indicesTris[i * 3 + 2];

        this.indicesLines[i * 6 + 4] = this.indicesTris[i * 3 + 2];
        this.indicesLines[i * 6 + 5] = this.indicesTris[i * 3];
    }
};

Rectangle.prototype.setFillMode = function() {
    this.indices = this.indicesTris;
    this.primitiveType = this.scene.gl.TRIANGLES;
};

Rectangle.prototype.setLineMode = function() {
    this.indices = this.indicesLines;
    this.primitiveType = this.scene.gl.LINES;
};