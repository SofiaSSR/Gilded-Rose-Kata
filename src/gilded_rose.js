class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    const normalDiscount= 1;
    this.items.map( (item) =>{
      noNegativePolicy(item);
      if(isSulfuras(item)) {return item}
      noOver50Policy(item);
      item = decrementSellIn(item);
      if(isBrie(item)){
        return brieQualityPolicy(item);
      }
      if(isBacktage(item)) {
        return backtageQualityPolicy(item);
      }
      if(isConjured(item)){
        return conjuredQualityPolicy(item,normalDiscount);
      }
      return normalQualityPolicy(item,normalDiscount);
    })
    return this.items;
  }
}
function decrementSellIn(item){
  item.sellIn = item.sellIn - 1;
  return item
}
function isSulfuras(item){
  return item.name == 'Sulfuras, Hand of Ragnaros';
}
function isBacktage(item){
  return item.name.search('Backstage') != -1;
}
function isBrie(item){
  return item.name == 'Aged Brie';
}
function isConjured(item){
  return item.name.search('Conjured') != -1;
}
function sellDateHasPassed(item){
  return item.sellIn < 0;
}
function noNegativePolicy(item){
  if(item.quality < 0){
    throw('the quality can not be negative');
  }
}
function noOver50Policy(item){
  if(item.quality > 50){
    throw('the quality can not be over 50');
  }
}
function addQuality(item, addedQuality){
  let newQuality = item.quality + addedQuality;
  item.quality = keepQualityUnder50(newQuality)
  return item
}
function discountQuality(item, discountedQuality){
  let newQuality = item.quality - discountedQuality;
  item.quality = keepQualityOver0(newQuality);
  return item
}

function keepQualityOver0(qualityOfItem){
  if(qualityOfItem >= 0) return qualityOfItem
  return 0
}
function keepQualityUnder50(qualityOfItem){
  if(qualityOfItem <= 50) return qualityOfItem
  return 50
}

function brieQualityPolicy(item) {
  if (sellDateHasPassed(item)) return addQuality(item, 2);
  return addQuality(item, 1);
}
function backtageQualityPolicy(item){
  let qualityAdded = 1;
  if (sellDateHasPassed(item)) return discountQuality(item,item.quality);
  if(item.sellIn < 11) qualityAdded = 2;
  if(item.sellIn < 6) qualityAdded = 3;
  return addQuality(item, qualityAdded);
}
function normalQualityPolicy(item,normalDiscount){
  if(sellDateHasPassed(item)) return discountQuality(item,normalDiscount*2);
  return discountQuality(item,normalDiscount);
}
function conjuredQualityPolicy(item,normalDiscount){
  if(sellDateHasPassed(item)) return discountQuality(item,normalDiscount*4);
  return discountQuality(item,normalDiscount*2);
}
module.exports = {
  Item,
  Shop
}