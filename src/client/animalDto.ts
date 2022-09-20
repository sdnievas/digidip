// JW: semicolons missing at the end of each property declaration. Althugh the linter rules will prevent this :)
export interface AnimalDto {
    name: string,
    surname: string,
    dateOfBirth: Date,
    petType: string,
    breed: string,
    sex: string
}

export interface AnimalDataDto {
    data: [AnimalDto] // JW: use "AnimalDto[];" instead, this implies a array with one Object which is AnimalDto, which isn't the case.
}