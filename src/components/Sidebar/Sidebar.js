import React from 'react';
import './sidebar.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker'
import ru from "date-fns/locale/ru/index.js"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { ReactComponent as About } from './about.svg'
import { ReactComponent as Help } from './help.svg'
import { ReactComponent as Car } from './car.svg'
import { ReactComponent as Card } from './card.svg'
import { ReactComponent as Data } from './data.svg'
import { ReactComponent as Phone } from './phone.svg'
import { ReactComponent as Email } from './email.svg'
import { ReactComponent as Address } from './address.svg'

const payments = [{ id: 0, title: 'Наличная' }, { id: 1, title: 'Безналичная' }];

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        selectedDate: null,
        selectedPayment: -1,
        phone: "",
        email: "",
        address: ""
      },
      errors: {
      }
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputPhoneChange = this.handleInputPhoneChange.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handlePaymentChange = this.handlePaymentChange.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  handleDateChange(date) {
    var data = { ...this.state.data }
    data.selectedDate = date;
    this.setState({ data });
    this.resetError('date');
  }


  handleInputChange(event) {
    var data = { ...this.state.data }
    data[event.target.name] = event.target.value;
    this.setState({ data })
  }

  handleInputPhoneChange(phone) {
    this.resetError('phone');
    var data = { ...this.state.data }
    data.phone = phone;
    this.setState({ data })
  }

  handleInputFocus(event) {
    this.resetError(event.target.name);
  }

  handleSelectChange(event) {
    this.props.updateData(event.target.value);
    this.resetError('car');
  }

  handlePaymentChange(event) {
    var data = { ...this.state.data }
    data.selectedPayment = event.target.value;
    this.setState({ data })
    this.resetError('payment');
  }

  resetError(param) {
    var errors = { ...this.state.errors }
    errors[param] = 0;
    this.setState({ errors })
  }

  sendRequest() {
    let errors = {};
    if (this.props.selectedCar === -1)
      errors.car = 1;
    if (this.state.data.selectedPayment === -1)
      errors.payment = 1;
    if (this.state.data.selectedDate == null || this.state.data.selectedDate === "")
      errors.date = 1;
    if (this.state.data.phone == null || this.state.data.phone === "")
      errors.phone = 1;
    else {
      var pattern = /^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/;
      if (this.state.data.phone.match(pattern) == null)
        errors.phone = 2;
    }
    if (this.state.data.email == null || this.state.data.email === "")
      errors.email = 1;
    else {
      var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      if (this.state.data.email.match(pattern) == null)
        errors.email = 2;
    }
    if (this.state.data.address == null || this.state.data.address === "")
      errors.address = 1;


    this.setState({ errors });
    console.log(Object.keys(errors).length);
    if (Object.keys(errors).length > 0) {
      return;
    }

    let request = this.state.data;
    request.selectedCar = this.props.selectedCar;
    alert(JSON.stringify(request));
  }


  render() {
    const listCars = this.props.cars.map((car) =>
      <option key={car.id} value={car.id}>{car.title}</option>
    );
    const listPayments = payments.map((payment) =>
      <option key={payment.id} value={payment.id}>{payment.title}</option>
    );

    return (
      <div className="sidebar flex flex-column">
        <div className="sidebar-title">
          Сервис
        </div>
        <div className="sidebar-inputs flex-1 flex flex-column">
          <div className="mb-2">
            <div className={'sidebar-control' + (this.state.errors.car ? ' invalid' : '')}>
              <Car />
              <select value={this.props.selectedCar} onChange={this.handleSelectChange}>
                <option value="-1" disabled hidden>Выберите технику</option>
                {listCars}
              </select>
            </div>
            {this.state.errors.car > 0 &&
              <div className="error-text">
                Поле должно быть заполнено
              </div>
            }
          </div>

          <div className="mb-2">
            <div className={'sidebar-control' + (this.state.errors.payment ? ' invalid' : '')}>
              <Card />
              <select value={this.state.data.selectedPayment} onChange={this.handlePaymentChange}>
                <option value="-1" disabled hidden>Выберите форму оплаты</option>
                {listPayments}
              </select>
            </div>
            {this.state.errors.payment > 0 &&
              <div className="error-text">
                Поле должно быть заполнено
              </div>
            }
          </div>

          <div className="mb-2">
            <div className={'sidebar-control' + (this.state.errors.date ? ' invalid' : '')}>
              <Data />
              <DatePicker
                selected={this.state.data.selectedDate}
                onChange={this.handleDateChange}
                name="selectedDate"
                dateFormat="dd.MM.yyyy"
                locale={ru}
                placeholderText="Дата аренды"
              />
            </div>
            {this.state.errors.date > 0 &&
              <div className="error-text">
                Поле должно быть заполнено
              </div>
            }
          </div>

          <div className="mb-2">
            <div className={'sidebar-control' + (this.state.errors.phone ? ' invalid' : '')}>
              <Phone />
              <div>
                <PhoneInput
                  country={'ru'}
                  onChange={this.handleInputPhoneChange}
                  disableInitialCountryGuess='false'
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
            </div>
            {this.state.errors.phone === 1 &&
              <div className="error-text">
                Поле должно быть заполнено
              </div>
            }
            {this.state.errors.phone === 2 &&
              <div className="error-text">
                Не соответствует формату +7 (999) 999-99-99
              </div>
            }
          </div>

          <div className="mb-2">
            <div className={'sidebar-control' + (this.state.errors.email ? ' invalid' : '')}>
              <Email />
              <input placeholder="Email"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                name="email">
              </input>
            </div>
            {this.state.errors.email === 1 &&
              <div className="error-text">
                Поле должно быть заполнено
              </div>
            }
            {this.state.errors.email === 2 &&
              <div className="error-text">
                Не соответствует формату email 'example@domain.ru'
              </div>
            }
          </div>

          <div className="mb-2">
            <div className={'sidebar-control' + (this.state.errors.address ? ' invalid' : '')}>
              <Address />
              <input placeholder="Адрес работ"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                name="address">
              </input>
            </div>
            {this.state.errors.address > 0 &&
              <div className="error-text">
                Поле должно быть заполнено
              </div>
            }
          </div>

          <button className="btn-apply" onClick={this.sendRequest}>
            Оформить заявку
          </button>
        </div>

        <div className="sidebar-footer">
          <a href='/' className="flex">
            <About className="mr-1" />
            <div >О сервисе</div>
          </a>
          <a href='/' className="flex">
            <Help className="mr-1" />
            <div >Помощь</div>
          </a>
        </div>
      </div>
    )
  }
}

export default Sidebar;