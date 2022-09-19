import axios from "axios";
import {AnimalDto, AnimalDataDto} from "./animalDto";

export function getAnimals(callback: (animal: [AnimalDto]) => any) {
    return axios.get<AnimalDataDto>('https://www.xylesoft.de/dev/testing.json')
        .then(response => callback(response.data.data))
        .catch(error => {
            if (error.response) {
                console.log("Error: " + error.response.status + " " + error.response.data);
            } else if (error.request) {
                console.log("Error: " + error.request);
            } else {
                console.log('Error', error.message);
            }
        })
}
