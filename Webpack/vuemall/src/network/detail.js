import {request} from './request'
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}


export class Goods {
  constructor(itemInfo,colums,services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPirce = itemInfo.oldPirce
    this.discount = itemInfo.discountDesc
    this.colums = colums
    this.services = services
    this.realPrice = itemInfo.lowNowPirce
  }
}

export class Shop {
  constructor (shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSelles;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cgoods
  }
}