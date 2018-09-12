import React, { Component } from 'react'
import classNames from 'classnames'
import creditCardType from 'credit-card-type'

export default class extends Component {
  constructor () {
    super()
    // Randomise on each
    const currencies = ['$', '£', '€']
    const currencySymbol = currencies[Math.floor(Math.random() * currencies.length)]
    const amountToPay = `${String(Math.floor(Math.random() * 100) + 1)}.00`

    this.state = {
      amountToPay,
      currencySymbol,
      cardType: null,
      cardInfo: '',
      ccv: '',
      exp: '',
      name: '',
      cardnumber: '',
      paymentState: 'pre', // 'pre', 'active', 'post'
      paymentAnimatedClasses: []
    }
  }

  componentDidMount () {
    this.setState({ paymentAnimatedClasses: ['animated', 'fadeInUp'] })
  }

  checkCardType = e => {
    this.setState({cardnumber: e.target.value})
    const cardType = creditCardType(e.target.value).length === 1 ? creditCardType(e.target.value)[0].niceType.toLowerCase() : ''
    const cardInfo = creditCardType(e.target.value)[0]
    this.setState({ cardType, cardInfo })
    console.log('card', cardType)
  }

  checkName = e => {
    this.setState({name: e.target.value})
  }

  validate () {
    let validity = this.state.cardType !== ''
    return validity
  }

  submit = e => {
    e.preventDefault()
    this.setState({ paymentState: 'active' })

    if (!this.validate()) {
      this.setState({ paymentState: 'failed' }) // You could set this to failed or something to trigger some visual feedback
      alert('payment Failed!')
      this.setState({cardnumber: '', ccv: '', exp: '', name: ''})
      return
    }

    // After arbitrary time, succeed payment , then fade out
    setTimeout(() => {
      this.setState({ paymentState: 'post' })

      setTimeout(() => {
        this.setState({ paymentAnimatedClasses: ['animated', 'fadeOutUp'] })
      }, 1000)
    }, 2000)
  }

  button = () => {
    let textContent
    if (this.state.paymentState === 'pre') textContent = `Pay ${this.state.currencySymbol}${this.state.amountToPay}`
    else if (this.state.paymentState === 'active') textContent = 'Payment in progress...'
    else if (this.state.paymentState === 'post') textContent = 'Payment successful!'
    else if (this.state.paymentState === 'failed') textContent = 'Payment failed!'

    return (
      <button className="btn" type="submit">{textContent}</button>
    )
  }

  render () {
    const paymentClasses = classNames('payment', this.state.paymentAnimatedClasses)
    const paymentStateClass = classNames({ 'payment-disabled': ['active', 'post'].includes(this.state.paymentState) })
    const cardTypeClass = classNames('input--card', { [`input--card--${this.state.cardType}`]: this.state.cardType })

    return (
      <div className="payment-wrapper">
        <form className={paymentClasses} onSubmit={this.submit}>
          <div className={paymentStateClass}>
            <input type="text" maxLength="30" value={this.state.name} placeholder="Card holders Name" required onChange={this.checkName} />
            <div className={cardTypeClass}>
              <input type="text" maxLength="16" value={this.state.cardnumber} placeholder="Credit card #" required onChange={this.checkCardType} />
            </div>
            <div className="split-inputs">
              <input type="text" maxLength="4" value={this.state.exp} placeholder="MMYY" required onChange={e => this.setState({exp: e.target.value})} />
              <input type="text" maxLength="3" value={this.state.ccv} placeholder="CVC" required onChange={e => this.setState({ccv: e.target.value})} />
            </div>
          </div>
          {this.button()}
        </form>
      </div>
    )
  }
}
