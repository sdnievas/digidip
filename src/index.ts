import {AnimalDto} from "./client/animalDto";
import {getAnimals} from "./client/animalsClient";
import {Animal} from "./model/animal";

const processAnimals = function(animalDtos: [AnimalDto]) { // JW: 1. no return type.  2. AnimalDto[] is more reasonable. Although [TypeA, TypeB] is valid.
    animalDtos.map(mapDtoToAnimal)
        .map(animal => JSON.stringify(animal))
        .forEach(animalJson => process.stdout.write(animalJson + "\n"))
}

function mapDtoToAnimal(animalDto: AnimalDto): Animal {
    return {
        // JW: Note: instead of use str + str, try using template literals instead, e.g.: return `${animalDto.name} ${animalDto.surname}`;
        name: animalDto.name + " " + animalDto.surname,
        age: calculateAge(animalDto.dateOfBirth),
        animal: formatAnimal(animalDto)
    }
}

function calculateAge(dateOfBirth: Date) : number {
    const millis = Date.now() - new Date(dateOfBirth).valueOf();
    const years = millis / (1000 * 60 * 60 * 24 * 365) // milliseconds * seconds * minutes * hours * days
    return Math.floor(years)
}

function formatAnimal(animal: AnimalDto): string {
    const sex = mapSex(animal.sex);
    // JW: Note: you can do "const { breed, type } = animal;" too.
    const breed = animal.breed;
    const type = animal.petType;
    // JW: Note: instead of use str + str + str, try using template literals instead, e.g.: return `${sex} ${breed} ${type}`;
    return sex + " " + breed + " " + type
}

function mapSex(sexChar: string): string {
    switch (sexChar) {
        // JW: brackets for case 'x': are not necassary, first time i've seen this done to be honest :)
        case 'm': {
            return "Male";
        }
        case 'f': {
            return "Female";
        }
        default: {
            throw "Invalid sex";
        }
    }
}

getAnimals(processAnimals)
