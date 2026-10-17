export type Mood = 'happy' | 'sad' | 'celebrating' | 'waving';
export type Animal = { id: string; name: string; image: number; expressions?: Partial<Record<Mood, number>> };

/** Add `expressions: { happy: require('...lion_happy.png'), sad: ..., celebrating: ... }` per animal when the art is ready. */
export const ANIMALS: Animal[] = [
  { id: 'lion', name: 'Lion', image: require('../../assets/animals/lion.png') },
  { id: 'elephant', name: 'Elephant', image: require('../../assets/animals/elephant.png') },
  { id: 'tiger', name: 'Tiger', image: require('../../assets/animals/tiger.png') },
  { id: 'dog', name: 'Dog', image: require('../../assets/animals/dog.png') },
  { id: 'cat', name: 'Cat', image: require('../../assets/animals/cat.png') },
  { id: 'monkey', name: 'Monkey', image: require('../../assets/animals/monkey.png') },
  { id: 'giraffe', name: 'Giraffe', image: require('../../assets/animals/giraffe.png') },
  { id: 'zebra', name: 'Zebra', image: require('../../assets/animals/zebra.png') },
  { id: 'rabbit', name: 'Rabbit', image: require('../../assets/animals/rabbit.png') },
  { id: 'bear', name: 'Bear', image: require('../../assets/animals/bear.png') },
];
export const getAnimal = (id?: string) => ANIMALS.find((a) => a.id === id) ?? ANIMALS[0];
