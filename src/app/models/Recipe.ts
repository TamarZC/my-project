import Layer from "./Layer";

export default class Recipe {
    constructor
        (

            public Id: number,
            public Name: string,
            public CategoryId: number,
            public PreparationTimeInMinute: number,
            public Level: number,
            public AddDate: Date,
            public Layers: Layer[],
            public Preparation: string[],
            public UserId: number,
            public Image: string,
            IsDisplay: boolean

        ) {


    }
}