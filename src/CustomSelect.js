import React, {Component} from 'react';
import Loader from "./Loader";

export default class CustomSelect extends Component {

    constructor(props){ //конструктор этого класса
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    state = {
        country:[],
        new_country:[],
        f_country:[],
        num:10,
        url:'https://restcountries.eu/rest/v2/',
        name:'',
        isLoading:true
    }

    async componentDidMount() {
        const url = `${this.state.url}${'all'}`
        try{
            const response = await (await fetch(url)).json()
            this.setState({
                country: response, isLoading:false
            })
        }catch (e) {
            console.log(e)
        }
    }

    async handleChange (event) {
        this.setState({name: event.target.value})
        let name = event.target.value

        let url = `${this.state.url}name/${name}`
        if(!name || name === ' '){
            url = `${this.state.url}all`
        }

        const response = await fetch(url)
        const data = await response.json()

        this.setState({country: data, isLoading:false})
    }

    seelctNum = (event) =>{
        this.setState({num:event.target.value})
    }

    fiitredCounrty  (num, arr){
        if(arr.status === 404){
            return [{name:'Not found'}]
        }
        return arr.slice(0, num)
    }

    // searchCountry = (arr) =>{
    //     const {name} = this.state
    //     if(!name){
    //         return arr
    //     }
    //     let mass = arr.concat()
    //     return mass.filter((item)=>{
    //         return item['name'].toLowerCase().includes(name.toLowerCase())
    //     })
    // }


    render(){

        //let filtredData = this.searchCountry(this.state.country)
        let filtredData = this.state.country

        let resData = this.fiitredCounrty(this.state.num, filtredData)
        return(
            <React.Fragment>
                <input
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <select name="number" id="num" onChange={this.seelctNum}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>

                {
                    this.state.isLoading
                        ? <Loader/>
                        : <ul>
                            {resData.map((item, index)=>{
                                return <li key = {index}>{item.name}</li>
                            })}
                        </ul>
                }
            </React.Fragment>
        )
    }
}


