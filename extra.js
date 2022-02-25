const canPoop = () => ({
	poop: () => console.log('Going to 💩...'),
});

// Combined previous behaviours
const socialBehaviors = (self) => Object.assign({}, canSayHi(self), canEat(), canPoop());

const alligator = (name) => {
	const self = {
		name,
	};

	const alligatorBehaviors = (self) => ({
		bite: () => console.log('Yum yum!'),
	});

	return Object.assign(self, socialBehaviors(self), alligatorBehaviors(self));
};

const jack = alligator('jack');
jack.sayHi(); // Hi! I'm jack
jack.eat('Banana'); // Eating Banana...
jack.bite(); // Yum yum!
