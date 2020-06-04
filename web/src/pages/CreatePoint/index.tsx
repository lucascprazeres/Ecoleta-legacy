import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom'
import { FiArrowDownLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import axios from 'axios';
import api from '../../services/api';

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

  const [ufs, setUfs] = useState<string[]>([]);

  const [cities, setCities] = useState<string[]>([]);

  const [selectedUF, setSelectedUF] = useState<string>();

  const [selectedCity, setSelectedCity] = useState<string>();

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
      return;
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

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowDownLeft />
          Voltar para a Home
        </Link>
      </header>

      <form>
        <h1>Cadastro do <br /> ponto de coleta</h1>

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
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={[-1.4629204, -48.4946974]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[-1.4629204, -48.4946974]} />
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
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
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
              <li key={item.id}>
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