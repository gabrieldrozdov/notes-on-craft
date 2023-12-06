var Engine = Matter.Engine,
	Render = Matter.Render,
	Runner = Matter.Runner,
	Composites = Matter.Composites,
	Common = Matter.Common,
	MouseConstraint = Matter.MouseConstraint,
	Mouse = Matter.Mouse,
	World = Matter.World,
	Bodies = Matter.Bodies;

// create engine
var engine = Engine.create(),
	world = engine.world;

// create renderer
var render = Render.create({
	element: document.body,
	engine: engine,
	options: {
		width: 1920,
		height: 1080,
		background: '',
		showAngleIndicator: false,
		wireframes: false
	}
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
var	options = { 
		isStatic: true,
		render: {
			fillStyle: 'transparent'
		}
	};

world.bodies = [];

// these static walls will not be rendered in this sprites example, see options
World.add(world, [
	Bodies.rectangle(0, 1080/2, 20, 20000, options),
	Bodies.rectangle(1920, 1080/2, 20, 20000, options),
	Bodies.rectangle(1920/2, 1100, 1920, 20, options)
]);

var stack = [];
for (let i=0; i<10; i++) {
	let body = Bodies.rectangle(Math.random()*1800+100, -Math.random()*500, 200, 300, {
		render: {
			sprite: {
				texture: '/test.png',
				xScale: .5,
				yScale: .5
			}
		},
		angle: Math.round(Math.random()*100),
		friction: 0.2
	});
	stack.push(body);
}
World.add(world, stack);

// add mouse control
var mouse = Mouse.create(render.canvas),
	mouseConstraint = MouseConstraint.create(engine, {
		mouse: mouse,
		constraint: {
			stiffness: 0.1,
			render: {
				visible: false
			}
		}
	});

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
	min: { x: 0, y: 0 },
	max: { x: 1920, y: 1080 }
});

const canvas = document.querySelector('canvas');
canvas.classList.add('home-matter');
const homeMatterContainer = document.querySelector('.home-matter-container');
homeMatterContainer.appendChild(canvas);