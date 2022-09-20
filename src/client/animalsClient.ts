import axios from "axios";
import {AnimalDto, AnimalDataDto} from "./animalDto";

// JW: missing return type, also please don't use "any", since TS4 discourages this usage, instead use "unknown" when you're really not sure.
export function getAnimals(callback: (animal: [AnimalDto]) => any) { 

    // JW: cleaner approach would be `async function () { ...await }`, see example below.

    return axios.get<AnimalDataDto>('https://www.xylesoft.de/dev/testing.json')
        // JW: callback here is probably best avoided, allow the caller to manipulate the data in their own scope after this method has validated the response.
        .then(response => callback(response.data.data)) 
        // JW: Data type hinting for "error", probably best to use .catch((error: Error) => { ... }), this will prevent the requirement of "error as Error" below (in the else clause). 
        .catch(error => { 
            if (error.response) {
                // JW: Note: Use Template Literal 
                console.log("Error: " + error.response.status + " " + error.response.data);
            } else if (error.request) {
                // JW: Note: Use a comma instead of plus, since error.request is most likely an object, which as a string will be outputted as "[object: Object]"". 
                // Following would be better: console.log("Error", error.request); 
                console.log("Error: " + error.request);
            } else {
                console.log('Error', error.message); // JW: `console.error(error as Error);`.
            }
        })
}



// Example of "async ... await..." method.
function isErrorObject<T>(o: unknown, containsProperty?: string): o is Error & T {
    if (containsProperty) {
        return Boolean(o && o instanceof Error && containsProperty in o);
    }

    return Boolean(o && o instanceof Error);
}

export async function getAnimals2(): Promise<AnimalDto[] | null> {
    try {
        const response = await axios.get<AnimalDataDto>('https://www.xylesoft.de/dev/testing.json');

        // Make sure the data is as expected.
        if (!response || !('data' in response) || !('data' in response.data)) {
            throw new Error('Invalid response, cannot handle.');
        }

        return response.data.data;
    } catch (error) {
        if (isErrorObject<{ response?: Record<string, unknown>; }>(error, 'response') && error.response) {
            console.log(`Error: ${error.response.status} ${JSON.stringify(error.response.data)}`);
        } else if (isErrorObject<{ request?: Record<string, unknown>; }>(error) && error.request) {
            console.log("Error (Request)", error.request);
        } else if (isErrorObject<{ message?: string; }>(error)) {
            console.error(error); 
        } else {
            throw error; // cannot handle, throw up the caller stack.
        }
    }

    return null;
}