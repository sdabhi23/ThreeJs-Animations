var mySceneTLX;
var mySceneTLY;
var mySceneBRX;
var mySceneBRY;
var mySceneW;
var mySceneH;
var myCenterX;
var myCenterY;

var helpContent;
function initialiseHelp(){
    helpContent="";
    helpContent = helpContent + "<h2>Making your own magnetic compass help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>Shown how to make a semi-permanent magnet using a piece of metal and a permanent magnet.</p>";
    helpContent = helpContent + "<p>Show an iron pin. Rub magnet (show magnet with red and black ends) across the needle in one direction. Stick needle through cork and float on water. Show that pin always rets in one direction. Repeat experiment by rubbing another needle in the reverse direction. Show that the direction is opposite.</p>"
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<p>The top line has animation controls. There are two states of the experiment.</p>";
    helpContent = helpContent + "<h3>The setup stage</h3>";
    helpContent = helpContent + "<p>The initial state is setup stage. In this stage, you can see a control window at the right. ";
    helpContent = helpContent + "You have access to flipping the poles of the magnet, which allows you to change the polarity of the resulting temporary magnet.</p>";
    helpContent = helpContent + "<h3>The animation stage</h3>";
    helpContent = helpContent + "<p>The panel in the scene has the following options:</p>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>Magnetize the rod - For rubbing the magnet over the rod in order to create a temporary magnet";
    helpContent = helpContent + "<li>Float the rod - To let the rod float freely, by placing it over the piece of cork in the water trough";
    helpContent = helpContent + "<li>Reset - To reset the experiment";    
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<p>You can pause and resume the animation by using the pause/play button on the top line</p>";
    helpContent = helpContent + "<p>The round button can also be used for resetting the animation.</p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo(){
    infoContent="";
    infoContent = infoContent + "<h2>Making your own magnetic compass (INFO)</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>Shown how to make a semi-permanent magnet using a piece of metal and a permanent magnet.</p>";
    infoContent = infoContent + "<p>Magnets can be made by exposing ferromagnetic metals like iron and nickel to magnetic fields.</p>"
    infoContent = infoContent + "<p>There are three methods of making temporary magnets:</p>"
    infoContent = infoContent + "<ol type=\"1\"> <li>Single touch method</li> <li>Double touch method</li> <li>Using electric current</li> </ol>";
    infoContent = infoContent + "<p>The <b>Single Touch Method</b> has been demonstrated in this experiment</p>";
    infoContent = infoContent + "<h3>Single Touch Method</h3>";
    infoContent = infoContent + "<p>Place a paper on a flat surface and place the ferromagnetic object on it. Then rub the permanent magnet over the surface of the object. Make sure to rub in one direction only. It is also necessary to lift the magnet from the surface of the object, after every swipe or run. Then swipe it again, in the same motion as before and continue rubbing the magnet over the object as required.</p>";
    infoContent = infoContent + "<p>If the process of swiping the permanent magnet over the ferromagnetic object has been done correctly, then on freely suspending the object will aling itself in North-South direction.</p>";
    infoContent = infoContent + "<p>The more times you rub the permanent magnet over your ferromagnetic object, the more powerful your temporary magnet will become.</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}

function initialiseScene(){
    mySceneTLX = -16;
    mySceneTLY = 27;
    mySceneBRX = 16;
    mySceneBRY = 12;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;

    var light = new THREE.PointLight( 0xff0000, 7, 200 );
    PIEaddElement( light );
    light.position.set(-50,50,50);

    PIEscene.background = new THREE.Color( 0x00BFFF );
    //PIEscene.background = new THREE.Color( 0xFCEDB2 );
    var ambient = new THREE.AmbientLight( 0x555555 );
    PIEaddElement(ambient);

    var light = new THREE.DirectionalLight( 0x123456 );
    light.position = PIEcamera.position;
    PIEaddElement(light);

    var ambient = new THREE.AmbientLight( 0x555555 );
    PIEaddElement(ambient);

    var light = new THREE.DirectionalLight( 0x123456 );
    light.position = PIEcamera.position;
    PIEaddElement(light);

    var groundMaterial = new THREE.MeshPhongMaterial( { color: 0x024406, specular: 0x111111} );
    var mesh233 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), groundMaterial );
    mesh233.position.y = -25;
    mesh233.rotation.x = - Math.PI / 2;
    PIEaddElement( mesh233 );

    PIErenderer.shadowMap.enabled = false;
}

var controls;
function startOrbitalControls() {
    controls = new THREE.OrbitControls(PIEcamera, PIErenderer.domElement);
    controls.enabled = false;
}

function addTable(){
    var tableGeom = new THREE.CubeGeometry( 20, 0.5, 20 );
    var tableTop =  new THREE.Mesh( tableGeom,new THREE.MeshBasicMaterial({color: 0x8B4513}));
    tableTop.position.y -=0.8;
    PIEaddElement(tableTop);

    var edges = new THREE.EdgesGeometry( tableGeom );
    var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000 } ) );
    
    tableTop.add(line);

    var tablelegGeom = new THREE.CubeGeometry( 0.5, 10, 0.5 );
    var tableleg =  new THREE.Mesh( tablelegGeom,new THREE.MeshBasicMaterial({color: 0x8B4513}));
    tableleg.position.set(-9.5,-5,9.5);
    
    var edges2 = new THREE.EdgesGeometry( tablelegGeom );
    var line2 = new THREE.LineSegments( edges2, new THREE.LineBasicMaterial( { color: 0x000 } ) );
    
    tableleg.add(line2);
    tableTop.add(tableleg);  

    var tablelegGeom2 = new THREE.CubeGeometry( 0.5, 10, 0.5 );
    var tableleg2 =  new THREE.Mesh( tablelegGeom2,new THREE.MeshBasicMaterial({color: 0x8B4513}));
    tableleg2.position.set(9.5,-5,9.5);
    
    var edges3 = new THREE.EdgesGeometry( tablelegGeom2 );
    var line3 = new THREE.LineSegments( edges3, new THREE.LineBasicMaterial( { color: 0x000 } ) );
    
    tableleg2.add(line3);
    tableTop.add(tableleg2); 

    var tablelegGeom3 = new THREE.CubeGeometry( 0.5, 10, 0.5 );
    var tableleg3 =  new THREE.Mesh( tablelegGeom3,new THREE.MeshBasicMaterial({color: 0x8B4513}));
    tableleg3.position.set(-9.5,-5,-9.5);
    
    var edges4 = new THREE.EdgesGeometry( tablelegGeom3 );
    var line4 = new THREE.LineSegments( edges4, new THREE.LineBasicMaterial( { color: 0x000 } ) );
    
    tableleg3.add(line4);
    tableTop.add(tableleg3);

    var tablelegGeom4 = new THREE.CubeGeometry( 0.5, 10, 0.5 );
    var tableleg4 =  new THREE.Mesh( tablelegGeom4,new THREE.MeshBasicMaterial({color: 0x8B4513}));
    tableleg4.position.set(9.5,-5,-9.5);
    
    var edges5 = new THREE.EdgesGeometry( tablelegGeom4 );
    var line5 = new THREE.LineSegments( edges5, new THREE.LineBasicMaterial( { color: 0x000 } ) );
    
    tableleg4.add(line5);
    tableTop.add(tableleg4);
}

var rod;
function addRod() {

    var rodGeom = new THREE.CubeGeometry( 6, 0.1, 1 );
    rod =  new THREE.Mesh( rodGeom ,new THREE.MeshBasicMaterial({color: 0xC0C0C0}));
    rod.position.z += 8;
    rod.position.y += 0;
    PIEaddElement(rod);
    var edges = new THREE.EdgesGeometry( rodGeom );
    var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000 } ) );
    rod.add(line);

    var end1Geom = new THREE.CubeGeometry( 1, 0.1, 1 );
    end1 =  new THREE.Mesh( end1Geom ,new THREE.MeshBasicMaterial({color: 0xFF4500}));
    end1.position.x += 3.5;
    var edges1 = new THREE.EdgesGeometry( end1Geom );
    var line1 = new THREE.LineSegments( edges1, new THREE.LineBasicMaterial( { color: 0x000 } ) );
    end1.add(line1);
    rod.add(end1);

    var end2Geom = new THREE.CubeGeometry( 1, 0.1, 1 );
    end2 =  new THREE.Mesh( end2Geom ,new THREE.MeshBasicMaterial({color: 0xEDC71C}));
    end2.position.x -= 3.5;
    var edges2 = new THREE.EdgesGeometry( end2Geom );
    var line2 = new THREE.LineSegments( edges2, new THREE.LineBasicMaterial( { color: 0x000 } ) );
    end2.add(line2);
    rod.add(end2);

    PIErender();

}

function addTrough() {
    
    var tex1 = new THREE.TextureLoader().load( "waternormals.jpg",  function(texture) {
        var baseGeom = new THREE.CubeGeometry( 12, 0.5, 12);
        var base = new THREE.Mesh( baseGeom, new THREE.MeshBasicMaterial( {map: texture} ) );
        base.position.z -= 1;
        PIEaddElement(base);
    } );

    var tex2 = new THREE.TextureLoader().load( "leather.jpg", function(texture) {
        var theboundary = [];
        var edges = [];
        var lines = [];
        var geometry = new THREE.BoxGeometry(0.1, 2, 12);
        material=new THREE.MeshBasicMaterial({map:texture});

        for(var i=0; i<2; i++){
            theboundary[i]=new THREE.Mesh(geometry, material);
            PIEaddElement(theboundary[i]);
            edges[i] = new THREE.EdgesGeometry(geometry);
            lines[i] = new THREE.LineSegments( edges[i], new THREE.LineBasicMaterial( { color: 0x000 } ) );
            theboundary[i].add(lines[i]);
        }
        theboundary[0].position.set(-6, 0.5, 0);
        theboundary[1].position.set(6, 0.5, 0);

        geometry=new THREE.BoxGeometry(12, 2, 0.1);
        for(var i=2; i<4; i++){
            theboundary[i]=new THREE.Mesh(geometry, material);
            PIEaddElement(theboundary[i]);
            edges[i] = new THREE.EdgesGeometry(geometry);
            lines[i] = new THREE.LineSegments( edges[i], new THREE.LineBasicMaterial( { color: 0x000 } ) );
            theboundary[i].add(lines[i]);
        }
        theboundary[2].position.set(0, 0.5, -6);
        theboundary[3].position.set(0, 0.5, 6);

        for(var i=0; i<4; i++) {
            theboundary[i].position.z -= 1;           
        }

    } );

    PIErender();

}

var magnet, magOriPosX;
function addMagnet() {

    var texture = new THREE.TextureLoader().load( "magnet.jpg", function(texture) {
        var bodyGeom = new THREE.CubeGeometry(2.5, 0.75, 0.75);
        magnet = new THREE.Mesh(bodyGeom, new THREE.MeshBasicMaterial({map: texture}));
        magOriPosX = magnet.position.x;
        magnet.position.y += 1.5;
        magnet.position.z += 8.25;
        magnet.rotation.z += Math.PI/4;
        magnet.position.x -= 3;
        PIEaddElement(magnet);
        var edges = new THREE.EdgesGeometry( bodyGeom );
        var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000 } ) );
        magnet.add(line);
    });

    PIErender();

}

var corkPosY;
var cork;
function addCork() {
    var texture = new THREE.TextureLoader().load( "cork.jpg" );
    var bodyGeom = new THREE.CubeGeometry(2, 0.75, 2);
    cork = new THREE.Mesh(bodyGeom, new THREE.MeshBasicMaterial({map: texture}));
    cork.position.y += 0.4;
    cork.position.z -= 1;
    PIEaddElement(cork);
    var edges = new THREE.EdgesGeometry( bodyGeom );
    var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000 } ) );
    cork.add(line);
    PIErender();
}

function addCompass() {
    var img = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('compass.jpg')
    });
    var bgMesh = new THREE.Mesh(new THREE.BoxGeometry(4, 0.01, 4), img);
    bgMesh.position.x += 7;
    bgMesh.position.z += 8;
    PIEaddElement(bgMesh);
    PIErender();
}

function loadExperimentElements(){
    PIEsetExperimentTitle("Making your own magnetic compass");
    PIEsetDeveloperName("Shrey Dabhi");

    initialiseHelp();
    initialiseInfo();
    initialiseScene();
    addTable();
    addRod();
    addCork();
    addTrough();
    addMagnet();
    addControls();
    addCompass();

    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);

    startOrbitalControls();

	PIErender();    

}

var flipped = false, magnetized = false, floatRod = false, magnetizing = false, yPole = 'S';
function addControls() {
    PIEaddInputCheckbox("Flip Magnet", false, flipMagnet);
    PIEaddDisplayCommand("Info", info);
    PIEaddDisplayCommand("Magnetize the rod", magnetize);
    PIEaddDisplayCommand("Float the rod", float);
    PIEaddDisplayCommand("Reset", resetExperiment);
}

function info() {
    window.alert("Stop the animation to flip the magnet!");
}

function float() {
    if(!magnetizing) {
        rod.position.y = 0.8;
        rod.position.z = -1;
        floatRod = true;
    } else {
        window.alert("Wait for the rod to be magnetized!");
    }
}

function magnetize() {
    if(!floatRod) {
        magnetizing = true;
    } else {
        window.alert("Cannot magnetize a floating rod!");
    }
}

function flipMagnet() {
    flipped = !flipped;
    if(flipped) {
        yPole = 'N';
        magnet.rotation.z -= Math.PI;
    } else {
        yPole = 'S';
        magnet.rotation.z += Math.PI;
    }
    PIErender();
}


function resetExperiment() {
    if(!magnetizing) {
        floatRod = false;
        magnetized = false;
        magnetizing = false;
        rod.rotation.y = 0;
        rod.position.y = 0;
        rod.position.z = 8;
        magnet.rotation.z = Math.PI/4;
        if(yPole == 'N') {
            magnet.rotation.z -= Math.PI;
        }
        magnet.position.y = 1.5;
        magnet.position.x = -3;
        i=0;
        j=0;
    } else {
        window.alert("Wait for the current action to be finished!");       
    }
}

var ctr = 0, j=0, i=0;
function updateExperimentElements(t, dt) {
    if(floatRod) {
        if(magnetized) {
            if(yPole == 'S') {
                if((rod.rotation.y <= Math.PI/2 && rod.rotation.y >= 0)) {
                    cork.rotation.y += 0.008;
                    rod.rotation.y += 0.008;
                }
            }
            if(yPole == 'N') {
                if((rod.rotation.y <= 0 && rod.rotation.y >= -Math.PI/2)) {
                    cork.rotation.y -= 0.008;
                    rod.rotation.y -= 0.008;
                }
            }
        } else {
            cork.rotation.y += 0.008;
            rod.rotation.y += 0.008;
        }
        magnet.position.y = 0;
        magnet.rotation.z = 0;
    }

    if(magnetizing) {
        if(i<100) {
            magnet.position.x += 7/100;
        } else if(i > 100) {
            j += 1;
            magnet.position.x = -3;
            i=0;
        }
        if(j == 5) {
            magnetizing = false;
            magnetized = true;
            magnet.position.x = -3;
            j=0;
        }

        i += 1;
        
    }
}
