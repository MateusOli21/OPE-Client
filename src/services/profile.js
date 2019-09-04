import {http} from './config';

export default{
    getResults: ()=>{
        return http.get('pokemon')
    }
}