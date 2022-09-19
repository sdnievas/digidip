export interface AnimalDto {
    name: string,
    surname: string,
    dateOfBirth: Date,
    petType: string,
    breed: string,
    sex: string
}

export interface AnimalDataDto {
    data: [AnimalDto]
}