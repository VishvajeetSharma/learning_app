export type Mood = 'happy' | 'sad' | 'celebrating' | 'waving';
export type Animal = {
  id: string;
  name: string;
  image: number;
  expressions?: Partial<Record<Mood, number>>;
};

export const ANIMALS: Animal[] = [
  { id: 'lion', name: 'Lion', image: require('../../assets/animals/lion.png') },
  { id: 'elephant', name: 'Elephant', image: require('../../assets/animals/elephant.png') },
  { id: 'tiger', name: 'Tiger', image: require('../../assets/animals/tiger.png') },
  { id: 'dog', name: 'Dog', image: require('../../assets/animals/dog.png') },
  { id: 'cat', name: 'Cat', image: require('../../assets/animals/cat.png') },
  { id: 'bear', name: 'Bear', image: require('../../assets/animals/bear.png') },
  { id: 'giraffe', name: 'Giraffe', image: require('../../assets/animals/giraffe.png') },
  { id: 'zebra', name: 'Zebra', image: require('../../assets/animals/zebra.png') },
  { id: 'camel', name: 'Camel', image: require('../../assets/animals/camel.png') },
  { id: 'cow', name: 'Cow', image: require('../../assets/animals/cow.png') },
  { id: 'horse', name: 'Horse', image: require('../../assets/animals/horse.png') },
  { id: 'mouse', name: 'Mouse', image: require('../../assets/animals/mouse.png') },
  { id: 'pig', name: 'Pig', image: require('../../assets/animals/pig.png') },
  { id: 'sheep', name: 'Sheep', image: require('../../assets/animals/sheep.png') },
  { id: 'wolf', name: 'Wolf', image: require('../../assets/animals/wolf.png') },
];

export const getAnimal = (id?: string) =>
  ANIMALS.find((a) => a.id === id) ?? ANIMALS[0];
