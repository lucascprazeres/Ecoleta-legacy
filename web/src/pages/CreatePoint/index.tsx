import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowDownLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import axios from 'axios';
import api from '../../services/api';
import Dropzone from '../../components/Dropzone';

import './styles.css';

import logo from '../../assets/logo.svg'

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUF, setSelectedUF] = useState<string>('0');
  const [selectedCity, setSelectedCity] = useState<string>('0');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
  const [selectedFile, setSelectedFile] = useState<File>();

  const history = useHistory();

  useEffect(() => {
    api.get('items')
      .then(response => setItems(response.data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);
        
        setUfs(ufInitials);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (!selectedUF || selectedUF === '0') {
      return setCities([]);
    }

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
      .then(response => {
        const cityName = response.data.map(city => city.nome);

        setCities(cityName);
      })
      .catch(error => console.log(error));
  }, [selectedUF]);

  function handleUFSelection(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;

    setSelectedUF(uf);
  }

  function handleCitySelection(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;

    setSelectedCity(city);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    const position = event.latlng
    setSelectedPosition([
      position.lat,
      position.lng
    ]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;

    setFormData({...formData, [name]: value});
  }

  function handleItemSelection(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([ ...selectedItems, id ]);
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { name, email, whatsapp } = formData;
    const uf = selectedUF;
    const city = selectedCity;
    const [ latitude, longitude ] = selectedPosition;
    const items = selectedItems;

    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('uf', uf);
    data.append('city', city);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('items', items.join(','));
    
    if (selectedFile) {
      data.append('image', selectedFile);
    }

    api.post('/points', data)
      .then(() => {
        alert('Ponto de coleta criado!');
        history.replace('/');
      })
      .catch(err => console.log(err));

  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowDownLeft />
          Voltar para a Home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro do <br /> ponto de coleta</h1>

        <Dropzone onFileUploaded={setSelectedFile}/>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={[-1.4629204, -48.4946974]} zoom={15} onclick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {selectedPosition ? <Marker position={selectedPosition} /> : null}
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf" id="uf"
                value={selectedUF}
                onChange={handleUFSelection}
              >
                <option value="0">Selecione uma UF</option>
                {ufs.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city" id="city"
                value={selectedCity}
                onChange={handleCitySelection}
              >
                <option value="0">Selecione uma cidade</option>
                {selectedUF || selectedUF !== '0'
                  ? cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                  ))
                  : null}
              </select>
            </div>
          </div>

        </fieldset>

        <fieldset>
          <legend>
            <h2>Itens de coleta</h2>
            <span>Selecione um ou mais items abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map(item => (
              <li
                key={item.id}
                onClick={() => handleItemSelection(item.id)}
                className={selectedItems.includes(item.id) ? 'selected' : ''}
                >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}

          </ul>
        </fieldset>

        <button type="submit">
          Cadastrar ponto de coleta
        </button>
      </form>
    </div >
  );
}

export default CreatePoint;