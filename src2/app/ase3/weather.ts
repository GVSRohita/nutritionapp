export class Weather 
{
    list : [{
        main : {
            temp : number;
            temp_min : number;
            temp_max : number;
            pressure: number;
            sea_level: number;
            grnd_level: number;
            humidity: number;
            temp_kf:number;
            };
        dt_txt : string;
    }]
}