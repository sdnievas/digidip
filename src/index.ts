import {AnimalDto} from "./client/animalDto";
import {getAnimals} from "./client/animalsClient";
import {Animal} from "./model/animal";

const processAnimals = function(animalDtos: [AnimalDto]) {
    animalDtos.map(mapDtoToAnimal)
        .map(animal => JSON.stringify(animal))
        .forEach(animalJson => process.stdout.write(animalJson + "\n"))
}

function mapDtoToAnimal(animalDto: AnimalDto): Animal {
    return {
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
    const breed = animal.breed;
    const type = animal.petType;
    return sex + " " + breed + " " + type
}

function mapSex(sexChar: string): string {
    switch (sexChar) {
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
