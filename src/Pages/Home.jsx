import React, { Component } from 'react';
import Menu from '../Components/Menu';
import CardContainer from '../Components/CardContainer';
import { fetchPhotos } from '../Services/photoAPI';

export default class Home extends Component {

    state = {
        photos: [],
        isLoading: false,
        searchTerm: '',
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      }

    handleClick = () => {
        const { searchTerm } = this.state;

        this.setState({
            isLoading: true,
        }, () => this.requestPhotos(searchTerm))
    }

    requestPhotos = async (searchTerm) => {
        const photos = await fetchPhotos(searchTerm);
        this.setState({
            isLoading: false,
            searchTerm: '',
            photos
        })
    }

    componentDidMount() {
        this.requestPhotos('praia')
    }

  render() {
    const {
        photos,
        isLoading,
        searchTerm
    } = this.state;

    return (
      <div>
        <Menu />
        
        <div className='field has-addons is-flex is-justify-content-center mt-4'>
            <div className='control'>
                <input 
                    className='input'
                    name='searchTerm'
                    type="text"
                    placeholder='Experimete Praia'
                    value={ searchTerm }
                    onChange={ this.handleChange }
                />
            </div>
            <div className='control'>
                <button 
                    className={`button is-info ${isLoading && "is-loading"}`}
                    onClick={ this.handleClick }
                >
                    Buscar
                </button>
            </div>
        </div>
        { !isLoading &&
            <CardContainer photos={ photos } />
        }
      </div>
    )
  }
}
