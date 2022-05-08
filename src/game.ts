/// --- Set up a system ---

class RotatorSystem {
  // this group will contain every entity that has a Transform component
  group = engine.getComponentGroup(Transform);

  update(dt: number) {
    // iterate over the entities of the group
    for (const entity of this.group.entities) {
      // get the Transform component of the entity
      const transform = entity.getComponent(Transform);

      // mutate the rotation
      transform.rotate(Vector3.Up(), dt * 20);
    }
  }
}

// Add a new instance of the system to the engine
// engine.addSystem(new RotatorSystem());

const colorBlue = new Material();
colorBlue.albedoColor = Color3.Gray();
colorBlue.metallic = 0.9;
colorBlue.roughness = 0.1;

const colorGreen = new Material();
colorGreen.albedoColor = Color3.Green();
colorGreen.metallic = 0.9;
colorGreen.roughness = 0.5;

const colorRed = new Material();
colorRed.albedoColor = Color3.Red();
colorRed.metallic = 0.5;

/// --- Spawner function ---

function spawnCube(x: number, y: number, z: number) {
  // create the entity
  const cube = new Entity();
  // add a transform to the entity
  cube.addComponent(new Transform({ position: new Vector3(x, y, z) }));
  // add a shape to the entity
  cube.addComponent(new SphereShape());
  cube.addComponent(colorBlue);
  // add the entity to the engine
  engine.addEntity(cube);
  return cube;
}

/// --- Spawn a cube ---

const cube = spawnCube(8, 2, 8);
cube.addComponent(
  new OnPointerDown(() => {
    cube.getComponent(Transform).scale.z *= 1;
    cube.getComponent(Transform).scale.x *= 1;
    spawnCube(Math.random() * 8 + 1, Math.random() * 8, Math.random() * 8 + 1);
  })
);

let cylinder = new Entity();
cylinder.addComponent(new CylinderShape());
cylinder.addComponent(
  new Transform({
    position: new Vector3(10, 2, 10),
    scale: new Vector3(1, 3, 1),
  })
);
cylinder.addComponent(colorGreen);
engine.addEntity(cylinder);

let cone = new Entity();
cone.addComponent(new ConeShape());
cone.addComponent(
  new Transform({
    position: new Vector3(10, 7, 10),
    scale: new Vector3(2, 2, 2),
  })
);
cone.addComponent(colorRed);
engine.addEntity(cone);

const modArea = new Entity()
modArea.addComponent(
  new AvatarModifierArea({
    area: { box: new Vector3(16, 4, 16) },
    modifiers: [AvatarModifiers.HIDE_AVATARS],
  })
)
modArea.addComponent(
  new CameraModeArea({
    area: { box: new Vector3(16, 1, 14) },
    cameraMode: CameraMode.FirstPerson,
  })
)
modArea.addComponent(
  new Transform({
    position: new Vector3(8,0,8)
  })
)
engine.addEntity(modArea)

let HelloWorld = new Entity();
HelloWorld.addComponent(new PlaneShape());
HelloWorld.addComponent(
  new Transform({
    position: new Vector3(10, 10, 4),
    scale: new Vector3(10, 8, 2),
    rotation: new Quaternion(0,180,0,0);
  })
);
HelloWorld.addComponent(colorBlue);

const text = new TextShape("Hello World!");
text.fontSize = 1;
text.color = Color3.White();
HelloWorld.addComponent(text);
engine.addEntity(HelloWorld);

let avocado = new Entity();
avocado.addComponent(new GLTFShape("models/avocado.gltf"));
avocado.addComponent(
  new Transform({
    position: new Vector3(3, 1, 3),
    scale: new Vector3(50, 50, 50),
  })
);
engine.addEntity(avocado);
