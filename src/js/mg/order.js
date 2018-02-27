
class Order {

  init(){
    this.showData()
  }

  showData(){

    let viewUnifiedorderInfo = $('.view-unifiedorder-info')
    if(viewUnifiedorderInfo.length <= 0){
      return
    }

    viewUnifiedorderInfo.on('click' , function () {  
      let orderId = $(this).attr('data-id')
      let text = $('#unifiedorder-info-' + orderId).text()
      // alert(text)
      let json = JSON.parse(text)
      // console.log(json)
      text = JSON.stringify(json , {} , 2)
      // console.log(text)
      $('#unifiedorder-info-text').val(text).show()
    })

    let viewPaymentInfo = $('.view-payment-info')
    if(viewPaymentInfo.length <= 0){
      return
    }

    viewPaymentInfo.on('click' , function () {  
      let orderId = $(this).attr('data-id')
      let text = $('#payment-info-' + orderId).text()
      // alert(text)
      let json = JSON.parse(text)
      // console.log(json)
      text = JSON.stringify(json , {} , 2)
      // console.log(text)
      $('#payment-info-text').val(text).show()
    })
  }
}

module.exports = new Order()